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
        <form className="matrix-edit-mode" onSubmit={handleSubmit}>
            <div className="matrix-edit-header">
                <div className="matrix-edit-name">{name}</div>
                <div className="matrix-edit-w-dim">
                    <div className="matrix-edit-dimension">
                            {matrix.length}x{matrix[0].length}
                    </div>
                    <table className="matrix-edit">
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
            </div>
            <button className="done-button">Done</button>
        </form>
    );
}

export default MatrixEditMode;