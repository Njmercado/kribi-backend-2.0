const connectToDatabase = require("./db.js").connectToDatabase;

async function findListOfWordsByLetter({ db, items = "", limit = 1, page = 0 }) {

    const fieldsToFilterSearch = { 'palabra': { $regex: items } }
    const fieldsToSelect = { 'projection': { 'palabra': 1, 'popularidad': 1, 'definicion': 1, 'ejemplos': 1 }}

    return await db.collection('Palabra').find(fieldsToFilterSearch, fieldsToSelect)
      .skip(page)
      .limit(limit)
      .toArray();
};

exports.handler = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();

  const response = await findListOfWordsByLetter({db, items: "A", limit: 10, page: 0 })

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};