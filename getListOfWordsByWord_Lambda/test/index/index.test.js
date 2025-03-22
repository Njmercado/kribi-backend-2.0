const db = require('../../db');
const getListOfWordsByWord = require('../../index').handler;
const DB_MOCK = require('../db.mock').DB_MOCK;
const RESPONSE_WORD = require('../db.mock').RESPONSE_WORD;
const EVENT_GET_LIST_OF_WORDS_BY_WORD = require('./index.mock').EVENT_GET_LIST_OF_WORDS_BY_WORD;

jest.mock('../../db');

describe('getListOfWordsByWord', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    db.connectToDatabase.mockReset();
  });

  test('should call get list of words by word and get a 200 response', async () => {
    const CONTEXT = {
      callbackWaitsForEmptyEventLoop: false
    }

    db.connectToDatabase.mockResolvedValue(DB_MOCK);

    const RESPONSE = await getListOfWordsByWord(EVENT_GET_LIST_OF_WORDS_BY_WORD, CONTEXT);

    expect(RESPONSE).toEqual({
      isBase64Encoded: false,
      statusCode: 200,
      body: JSON.stringify([RESPONSE_WORD]),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  });
})