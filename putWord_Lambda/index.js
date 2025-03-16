const { connectToDatabase } = require('./db');
const { WRONG_ENDPOINT_EMPTY_ID } = require("./general.constant");

async function putWord({ db, id, word }) {
  return await db
    .collection('Palabra')
    .updateOne(
      { _id: id },
      { $set: { ...word } },
      { upsert: false}
    );
}

exports.handler = async (event, context) => {
  try {

    if(!event._id || event._id == -1) {
      throw new Error(WRONG_ENDPOINT_EMPTY_ID.message);
    }

    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase()

    const id = event._id;
    delete event._id;

    const response = await putWord({ db, id, word: event });
    console.log('RESPONSE: ', response)

    return {
      isBase64Encoded: false,
      statusCode: 200,
      body: 'Word updated correctly',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }

  } catch (error) {
    console.error(error);
    return {
      isBase64Encoded: false,
      statusCode: 500,
      body: JSON.stringify(error),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
}