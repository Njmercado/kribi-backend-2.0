const RESPONSE_WORD = {
  palabra: 'palabra',
  definicion: ['definicion'],
  ejemplos: ['ejemplos'],
  traducciones: ['traducciones'],
  popularidad: 1,
}

const DB_MOCK = {
  collection: jest.fn().mockReturnValue({
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([
      RESPONSE_WORD,
    ])
  })
}

exports.DB_MOCK = DB_MOCK;
exports.RESPONSE_WORD = RESPONSE_WORD;