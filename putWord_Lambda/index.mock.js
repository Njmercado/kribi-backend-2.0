const WORD_UPDATED = 'Word updated correctly';
const EVENT_PUT_WORD = {
  body: JSON.stringify({
    _id: 1,
    word: 'word'
  })
}

exports.WORD_UPDATED = WORD_UPDATED;
exports.EVENT_PUT_WORD = EVENT_PUT_WORD;