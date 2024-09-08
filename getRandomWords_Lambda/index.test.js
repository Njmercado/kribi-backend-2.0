const db = require('./db');
const randomWordsLambda = require('./index').handler;
const DB_MOCK = require('./db.mock').DB_MOCK;
const RECORDS = require('./db.mock').RECORDS;

jest.mock('./db');

beforeEach(() => {
  jest.clearAllMocks();
  db.connectToDatabase.mockReset();
})

test('should call random words handler and get a 200 response', async () => {
  const EVENT = {
    queryStringParameters: {
      cuantity: 10
    }
  }

  const CONTEXT = {
    callbackWaitsForEmptyEventLoop: false
  }

  db.connectToDatabase.mockResolvedValue(DB_MOCK);

  const RESPONSE = await randomWordsLambda(EVENT, CONTEXT);

  expect(RESPONSE).toEqual({
    isBase64Encoded: false,
    status: 200,
    body: JSON.stringify(RECORDS),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
})

test('should call random words handler and get a 500 response', async () => {
  const EVENT = {
    queryStringParameters: {
      cuantity: 10
    }
  }

  const CONTEXT = {
    callbackWaitsForEmptyEventLoop: false
  }

  db.connectToDatabase = null;

  const RESPONSE = await randomWordsLambda(EVENT, CONTEXT);

  expect(RESPONSE).toEqual({
    isBase64Encoded: false,
    status: 500,
    body: JSON.stringify({ message: 'Internal server error' }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
})