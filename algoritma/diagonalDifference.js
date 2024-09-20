function diagonalDifference(matrix) {
  let diagonal1 = 0,
    diagonal2 = 0;
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    diagonal1 += matrix[i][i];
    diagonal2 += matrix[i][n - 1 - i];
  }

  return Math.abs(diagonal1 - diagonal2);
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const result = diagonalDifference(matrix);
console.log(result);
