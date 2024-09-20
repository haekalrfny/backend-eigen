function queryCount(INPUT, QUERY) {
  return QUERY.map(
    (queryWord) => INPUT.filter((inputWord) => inputWord === queryWord).length
  );
}

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];
const result = queryCount(INPUT, QUERY);
console.log(result);
