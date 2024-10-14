import { useState } from "react";
import "../style/MatrixEditMode.css";

function MatrixEditMode({ deactivateEditMode, matrix, name}) {
    const [changed, setChanged] = useState(matrix);


    const handleChange = (value, i, j) => {
        setChanged(
            changed.map((row, rowIndex) => 
                rowIndex === i ? 
                row.map((cell, colIndex) => colIndex === j ? value : cell) : 
                row
            )
        );
    }

    const handleSubmit = (event) => {
        deactivateEditMode(changed);
    }


    return (
        <div className="matrix-edit-mode">
            <form onSubmit={handleSubmit}>
                <div className="matrix-header">
                    <div className="matrix-name">{name}</div>
                    <table className="matrix">
                        <tbody>
                        {matrix.map((row, i) => (
                            <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j}><input value={changed[i][j]} onChange={(event => {handleChange(event.target.value, i, j)})}/></td>
                            ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <button className="done-button">Done</button>
            </form>
        </div>
    );
}

export default MatrixEditMode;