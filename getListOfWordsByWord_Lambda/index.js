const connectToDatabase = require('./db').connectToDatabase;

function getWordsAsRegex(words) {
  const filteredWords = words.filter(word => word.length >= 3)
  const wordsAsRegex = filteredWords.map(word => {
    const newWord = word
      .replace(/a|á/gi, "[aá]")
      .replace(/e|é/gi, "[eé]")
      .replace(/i|í/gi, "[ií]")
      .replace(/o|ó/gi, "[oó]")
      .replace(/u|ú|ü/gi, "[uúü]")
      .replace(/k|c/gi, "[ck]")
    return new RegExp(`^${newWord}$`, 'i')
  })
  return wordsAsRegex
}

async function findListOfWordsByWords({ db, words = [] }) {
  const fieldsToFilterSearch = {
    $or: [
      { 'palabra': { $in: words } },
      { "definicion": { $in: words } }
    ]
  }
  const fieldsToSelect = { 'projection': { 'palabra': 1, 'popularidad': 1, 'definicion': 1, 'ejemplos': 1 } }

  return await db.collection('Palabra').find(fieldsToFilterSearch, fieldsToSelect)
    .sort({ "palabra": 1 })
    .toArray();
}

exports.handler = async (event, context) => {
  const { words } = event.queryStringParameters;
  const splittedWords = words.split(',');
  const wordsAsArray = splittedWords.map(word => word.trim());
  const wordsAsRegex = getWordsAsRegex(wordsAsArray);

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();

  const response = await findListOfWordsByWords({ db, words: wordsAsRegex})

  return {
    isBase64Encoded: false,
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
}