import "../style/MatrixDisplay.css";

function MatrixDisplay({ name, matrix, activateEditMode }) {
    const handleClick = (event) => {
        activateEditMode(name);
    }
    return (
        <div className="full-matrix">
            <div className="matrix-header">
                <div className="matrix-name">{name}</div>
                <table className="matrix">
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
            <button className="matrix-edit-button" onClick={handleClick}>Edit</button>
        </div>
    );
}



// explain what is happening here
// table is a HTML element that is used to display data in a tabular format.
// tbody is a HTML element that is used to group the body content in a table.
// tr is a HTML element that defines a row in a table.
// td is a HTML element that defines a cell in a table.

export default MatrixDisplay;