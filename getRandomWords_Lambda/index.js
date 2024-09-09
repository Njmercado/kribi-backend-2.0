const { connectToDatabase } = require("./db");
const { INTERNAL_SERVER_ERROR } = require("./general.constant");

async function getRandomWords({ db, quantity = 10 }) {
  return await db.collection('Palabra').aggregate([{ $sample: { size: parseInt(quantity) } }]).toArray();
}

exports.handler = async (event, context) => {
  try {
    const { quantity } = event.queryStringParameters;
    console.log('QUANTITY', quantity);

    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase()

    const response = await getRandomWords({ db, quantity });
    console.log('RESPONSE: ', response)

    return {
      isBase64Encoded: false,
      status: 200,
      body: JSON.stringify(response),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (error) {
    console.error(error);
    return {
      isBase64Encoded: false,
      status: 500,
      body: JSON.stringify(INTERNAL_SERVER_ERROR),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
}