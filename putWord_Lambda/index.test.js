const db = require('./db');
const { WRONG_ENDPOINT_EMPTY_ID } = require('./general.constant');
const putWordLambda = require('./index').handler;
const DB_MOCK = require('./db.mock').DB_MOCK;
const WORD_UPDATED = require('./index.mock').WORD_UPDATED;
const EVENT_PUT_WORD = require('./index.mock').EVENT_PUT_WORD;

jest.mock('./db');

beforeEach(() => {
  jest.clearAllMocks();
  db.connectToDatabase.mockReset();
})

test('should call put word and get a 200 response', async () => {
  const CONTEXT = {
    callbackWaitsForEmptyEventLoop: false
  }

  db.connectToDatabase.mockResolvedValue(DB_MOCK);

  const RESPONSE = await putWordLambda(EVENT_PUT_WORD, CONTEXT);

  expect(RESPONSE).toEqual({
    isBase64Encoded: false,
    statusCode: 200,
    body: WORD_UPDATED,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
});