const { connectToDatabase } = require("./db");

async function getRandomWords({ db, cuantity = 1 }) {
  return await db.collection('Palabra').aggregate([{ $sample: { size: parseInt(cuantity) } }]).toArray();
}

exports.handler = async (event, context) => {
  try {
    const { cuantity } = event.queryStringParameters;

    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase()

    const response = await getRandomWords({ db, cuantity });

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
      body: JSON.stringify({ message: 'Internal server error' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
}