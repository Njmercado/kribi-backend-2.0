const { connectToDatabase } = require('./db');
const { API_ERRORS } = require("./general.constant");
const ObjectId = require('mongodb').ObjectId;

async function putWord({ db, id, word }) {
  return await db
    .collection('Palabra')
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...word } },
      { upsert: false}
    );
}

exports.handler = async (event, context) => {
  try {

    const word = JSON.parse(event.body);

    if(!word._id || word._id == -1) {
      throw new Error(API_ERRORS.WRONG_ENDPOINT_EMPTY_ID);
    }

    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase()

    const id = word._id;
    delete word._id;

    await putWord({ db, id, word });

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
      statusCode: error.code ?? API_ERRORS.INTERNAL_SERVER_ERROR.code,
      body: JSON.stringify(error.message ?? API_ERRORS.INTERNAL_SERVER_ERROR),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
}