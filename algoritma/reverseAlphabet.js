function reverseAlphabet(str) {
  const letters = str.match(/[A-Za-z]+/g).join("");
  const numbers = str.match(/\d+/g).join("");
  const reversedLetters = letters.split("").reverse().join("");
  return reversedLetters + numbers;
}

const result = reverseAlphabet("NEGIE1");
console.log(result);
