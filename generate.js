const fs = require('fs');

let ws = fs.createWriteStream('nietzsche.json');
let txt = fs.readFileSync('./nietzsche.csv', 'utf8');

let tokens = {};

generateTokens(txt);

function generateTokens(txt) {
  txt = txt
    .replace(/\d/g, ' ')
    .replace(/\u000b/g, ' ')
    .replace(/\n/g, ' ')
    .split(' ');
  for (let i = 0; i < txt.length; i++) {
    let word = txt[i] + ' ' + txt[i + 1];
    let nextWord = txt[i + 2] + ' ' + txt[i + 3];
    word = word.trim();
    nextWord = nextWord.trim();
    if (
      !word.includes('undefined') &&
      !nextWord.includes('undefined') &&
      word != '' &&
      nextWord != ''
    ) {
      if (!tokens[word]) {
        tokens[word] = {
          'nextWord': new Array(nextWord)
        };
      } else {
        tokens[word].nextWord.push(nextWord);
      }
    }
  }

  ws.write(JSON.stringify(tokens));
}
