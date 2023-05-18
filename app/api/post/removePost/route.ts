import { getCollectionAndConnection } from '@/lib/mongoHelper';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const { password, id, postNumber } = await request.json();
    if (!password || !password.trim('')) {
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
    return NextResponse.json({
      message: 'Successfully deleted the post #' + id,
    });
  } catch (error) {
    throw new Error((error as Error).message || 'Something went wrong.');
  }
};
