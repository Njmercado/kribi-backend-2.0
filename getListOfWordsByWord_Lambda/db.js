const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CODE}/test?retryWrites=true&w=majority`

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(MONGODB_URI);

  const db = client.db("Kribi");

  cachedDb = db;
  return db;
}

exports.connectToDatabase = connectToDatabase;