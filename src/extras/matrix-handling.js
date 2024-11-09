function extendMatrix(matrix, dim1, dim2) {
    // return new Array(dim1).map(
    //     (row, i) =>
    //         new Array(dim2).map(
    //             (cell, j) => 
    //                 matrix[i][j] != undefined ?
    //                     matrix[i][j] :
    //                     0
    //         )
    // );
    const extended = new Array(dim1);
    for (let i = 0; i < dim1; i++) {
        extended[i] = new Array(dim2)
        for (let j = 0; j < dim2; j++) {
            if (i < matrix.length && j < matrix[0].length) {
                extended[i][j] = matrix[i][j];
            } else {
                extended[i][j] = 0;
            }
        }
    }
    return extended
}


function cloneMatrix(matrix) {
    return matrix.map(row => [...row]);
}

export { extendMatrix, cloneMatrix }