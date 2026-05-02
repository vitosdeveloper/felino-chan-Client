'use server';

import { getCollectionAndConnection, processData } from '@/lib/mongoHelper';
import { IBoards } from '@/utils/boards';
import { Post } from '@/types/generalTypes';

export const searchPosts = async (board: IBoards, query: string): Promise<Post[]> => {
  if (!query || query.trim() === '') return [];
  
  try {
    const { collection, connection } = await getCollectionAndConnection('posts');
    let result;
    
    // Check if query is numeric (search by ID)
    if (!isNaN(Number(query))) {
      result = await collection.find({ board, randomIdGeneratedByMe: Number(query) }).toArray();
    } else {
      // Text search
      const regex = new RegExp(query, 'i');
      result = await collection.find({
        board,
        $or: [
          { assunto: regex },
          { postContent: regex }
        ]
      }).sort({ $natural: -1 }).limit(10).toArray();
    }
    
    await connection.close();
    
    if (!result || result.length === 0) return [];
    
    return processData(result) as Post[];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};
