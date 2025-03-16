const DB_MOCK = {
  collection: jest.fn(() => {
    return {
      updateOne: jest.fn(() => {
        return Promise.resolve({ result: { nModified: 1 } })
      })
    }
  }),
}

exports.DB_MOCK = DB_MOCK;