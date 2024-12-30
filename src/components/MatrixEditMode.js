import { useState } from "react";
import "../style/MatrixEditMode.css";
import { cloneMatrix, extendMatrix } from "../extras/matrix-handling";

const WARNING_SIZE = 500;

function MatrixEditMode({ deactivateEditMode, matrix, name }) {
    const [changed, setChanged] = useState(cloneMatrix(matrix));
    const [dimensions, setDimensions] = useState([matrix.length, matrix[0].length]);

    const handleSubmit = (event) => {
        deactivateEditMode(changed, dimensions);
        event.preventDefault();
    };

    const handleChangeDimension0 = (event) => {
        if (parseInt(event.target.value) * dimensions[1] > WARNING_SIZE && !window.confirm(`This matrix is very large (${event.target.value}x${dimensions[1]}). Are you sure you want to continue?`)) {
            return;
        }
        if (event.target.value === "") {
            setDimensions([0, dimensions[1]]);
        } else if (!isNaN(parseInt(event.target.value))) {
            setDimensions([parseInt(event.target.value), dimensions[1]]);
        }
    };

    const handleChangeDimension1 = (event) => {
        if (dimensions[0] * parseInt(event.target.value) > WARNING_SIZE && !window.confirm(`This matrix is very large (${dimensions[0]}x${event.target.value}). Are you sure you want to continue?`)) {
            return;
        }
        if (event.target.value === "") {
            setDimensions([dimensions[0], 0]);
        } else if (!isNaN(parseInt(event.target.value))) {
            setDimensions([dimensions[0], parseInt(event.target.value)]);
        }
    };

    const handleValueChangeCreator = (i, j) => {
        return (event) => {
            const newmatrix = extendMatrix(changed, dimensions[0], dimensions[1]);
            setChanged(
                newmatrix.map((row, rowIndex) =>
                    rowIndex === i
                        ? row.map((cell, colIndex) => (colIndex === j ? event.target.value : cell))
                        : row
                ),
                ...dimensions
            );
        };
    };

    return (
        <form className="matrix-edit-mode" onSubmit={handleSubmit}>
            <div className="scrollable-content">
                <div className="matrix-edit-header">
                    <div className="matrix-edit-name">{name}</div>
                    <div className="matrix-edit-w-dim">
                        <div className="matrix-edit-dimension">
                            <input className="matrix-edit-dimension-1" onChange={handleChangeDimension0} value={dimensions[0]} />
                            x
                            <input className="matrix-edit-dimension-2" onChange={handleChangeDimension1} value={dimensions[1]} />
                        </div>
                        <table className="matrix-edit">
                            <tbody>
                                {extendMatrix(changed, dimensions[0], dimensions[1]).map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => 
                                            <td key={j}><input value={cell} onChange={handleValueChangeCreator(i, j)} /></td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className="done-button">Done</button>
            </div>
        </form>
    );
}

export default MatrixEditMode;