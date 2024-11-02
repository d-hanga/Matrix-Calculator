import "../style/MatrixResult.css";

function MatrixResult({ matrix, saveMatrix }) {
    const handleClick = (e) => {
        saveMatrix(prompt("Enter the name of the matrix: "), matrix);
    }
    return (
        <div className="full-result-matrix">
            <div className="result-matrix-header">
                <div className="result-matrix-name">{"result"}</div>
                <table className="result-matrix">
                    <tbody>
                    {matrix.map((row, i) => (
                        <tr key={i}>
                        {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button className="result-matrix-save-button" onClick={handleClick}>Save</button>
        </div>
    );
}



// explain what is happening here
// table is a HTML element that is used to display data in a tabular format.
// tbody is a HTML element that is used to group the body content in a table.
// tr is a HTML element that defines a row in a table.
// td is a HTML element that defines a cell in a table.

export default MatrixResult;