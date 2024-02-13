'use server';

import { getCollectionAndConnection } from '@/lib/mongoHelper';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

export const handleDelete = async (
  formData: FormData,
  id: string,
  postNumber: string
) => {
  try {
    const password = formData.get('delete');
    if (!password || !String(password).trim()) {
      throw new Error('Password not found.');
    }
    const { collection, connection } = await getCollectionAndConnection(
      'posts'
    );
    const post = await collection.findOne({ _id: new ObjectId(id) });
    if (!post) {
      throw new Error('Post not found.');
    }
    if (post.password !== password) {
      await connection.close();
      throw new Error('Wrong password!');
    }
    await collection.deleteMany({
      $or: [{ _id: new ObjectId(id) }, { reply: Number(postNumber) }],
    });
    await connection.close();
    // revalidatePath('/hw/[pageNumber]', 'page');
    // revalidatePath('/hw/catalog', 'page');
    // revalidatePath('/res/[threadId]', 'page');
  } catch (error) {
    console.log(error);
  }
};
