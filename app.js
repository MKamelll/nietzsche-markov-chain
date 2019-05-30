const tokens = require('./nietzsche.json');

setInterval(() => {
  generateSentence();
}, 2000);

function generateSentence() {
  let result = [],
    words = Object.keys(tokens),
    pick,
    next,
    afterThat,
    endSen;

  pick = words[Math.floor(Math.random() * words.length)];
  next =
    tokens[pick]['nextWord'][
      Math.floor(Math.random() * tokens[pick]['nextWord'].length)
    ];
  result.push(pick + ' ' + next);

  if (tokens[next]) {
    afterThat =
      tokens[next]['nextWord'][
        Math.floor(Math.random() * tokens[next]['nextWord'].length)
      ];
    result.push(' ' + afterThat);
  }

  if (afterThat && tokens[afterThat]) {
    endSen =
      tokens[afterThat]['nextWord'][
        Math.floor(Math.random() * tokens[afterThat]['nextWord'].length)
      ];
    result.push(' ' + endSen);
  }

  result = result
    .join(' ')
    .toLocaleLowerCase()
    .replace(/[-\.*\‘\“\”\"\)\(\[\]\)]/g, ' ')
    .replace(/\s\s+/g, ' ');

  console.log(result);
}
