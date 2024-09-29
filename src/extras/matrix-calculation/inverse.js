// calculates Matrix to the power of -1
function inverse(matrix) {
    const determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    const inverseDeterminant = 1 / determinant;
    const inverseMatrix = [
        [matrix[1][1], -matrix[0][1]],
        [-matrix[1][0], matrix[0][0]]
    ];
    const result = inverseMatrix.map(row => row.map(cell => cell * inverseDeterminant));
    return result;
}