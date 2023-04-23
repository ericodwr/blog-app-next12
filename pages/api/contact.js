// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const { email, name, message } = body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() == '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input' });
      return;
    }

    // store it in database
    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.nd8etd7.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database' });
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Failed storing message' });
    }
    client.close();
    res.status(201).json({ message: 'success', newMessage });
  }
}
