const WORD_UPDATED = 'word updated correctly';

const DB_MOCK = {
  collection: jest.fn(() => {
    return {
      aggregate: jest.fn(() => {
        return {
          toArray: jest.fn(() => {
            return Promise.resolve(RECORDS)
          })
        }
      })
    }
  }),
}

exports.DB_MOCK = DB_MOCK;
exports.RECORDS = RECORDS;