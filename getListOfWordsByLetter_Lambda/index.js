const connectToDatabase = require("./db.js").connectToDatabase;

async function findListOfWordsByLetter({ db, letter = "", limit = 1, page = 0 }) {

  const fieldsToFilterSearch = { 'palabra': { $regex: letter } }
  const fieldsToSelect = { 'projection': { 'palabra': 1, 'popularidad': 1, 'definicion': 1, 'ejemplos': 1 } }

  return await db.collection('Palabra').find(fieldsToFilterSearch, fieldsToSelect)
    .sort({"palabra": 1})
    .skip(page*limit)
    .limit(limit)
    .toArray();
};

exports.handler = async (event, context) => {

  const { letter, page } = event.queryStringParameters;

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();

  const response = await findListOfWordsByLetter({ db, letter, limit: 10, page: parseInt(page) })

  return {
    isBase64Encoded: false,
    status: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
};