const connectToDatabase = require('./db').connectToDatabase;

async function findListOfWordsByWords({ db, words = [] }) {
  const fieldsToFilterSearch = { 'palabra': { $in: words } }
  const fieldsToSelect = { 'projection': { 'palabra': 1, 'popularidad': 1, 'definicion': 1, 'ejemplos': 1 } }

  return await db.collection('Palabra').find(fieldsToFilterSearch, fieldsToSelect)
    .sort("palabra")
    .toArray();
}

exports.handler = async (event, context) => {
  const { wordsString } = event.queryStringParameters;
  const splittedWords = wordsString.split(',');
  const wordsAsArray = splittedWords.map(word => word.trim());

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();

  const response = await findListOfWordsByWords({ db, words: wordsAsArray })

  return {
    status: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
}