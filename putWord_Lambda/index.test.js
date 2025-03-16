const db = require('./db');
const { INTERNAL_SERVER_ERROR } = require('./general.constant');
const putWordLambda = require('./index').handler;
const DB_MOCK = require('./db.mock').DB_MOCK;
const WORD_UPDATED = require('./db.mock').WORD_UPDATED;

jest.mock('./db');

beforeEach(() => {
  jest.clearAllMocks();
  db.connectToDatabase.mockReset();
})

test('should call put word and get a 200 response', async () => {
  const EVENT = {
    body: JSON.stringify({
      word: 'word'
    })
  }

  const CONTEXT = {
    callbackWaitsForEmptyEventLoop: false
  }

  db.connectToDatabase.mockResolvedValue(DB_MOCK);

  const RESPONSE = await putWordLambda(EVENT, CONTEXT);

  expect(RESPONSE).toEqual({
    isBase64Encoded: false,
    statusCode: 200,
    body: JSON.stringify(WORD_UPDATED),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
});