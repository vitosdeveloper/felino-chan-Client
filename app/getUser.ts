import { MongoClient } from 'mongodb';

export const getUser = async () => {
  const client = new MongoClient(
    'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0'
  );
  await client.connect();
  const db = client.db('signup-next');
  const collection = db.collection('accounts');
  const user = await collection.findOne();
  return user!.email;
};
