import "../style/MatrixDisplay.css";

function MatrixDisplay({ name, matrix, buttonFunctioning, buttonName, handleDelete }) {
    return (
        <div className="full-matrix">
            <button onClick={handleDelete} className="delete-button">X</button>
            <div className="matrix-header">
                <div className="matrix-name">{name}</div>
                <div className="matrix-w-dim">
                    <div className="matrix-dimension">
                        {matrix.length}x{matrix[0].length}
                    </div>
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
            </div>
            <button className="matrix-something-button" onClick={buttonFunctioning}>{buttonName}</button>
        </div>
    );
}




export default MatrixDisplay;