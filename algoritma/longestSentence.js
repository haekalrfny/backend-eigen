function longest(sentence) {
  const words = sentence.split(" ");
  let longestWord = words[0];

  words.forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });

  return `${longestWord}: ${longestWord.length} characters`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const result = longest(sentence);
console.log(result);
