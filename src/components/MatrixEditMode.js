import { useState } from "react";
import "../style/MatrixEditMode.css";
import { cloneMatrix, extendMatrix } from "../extras/matrix-handling";
import { InvalidNumber } from "../errors/formating";

function MatrixEditMode({ deactivateEditMode, matrix, name }) {
    const [changed, setChanged] = useState(cloneMatrix(matrix));
    const [dimensions, setDimensions] = useState([matrix.length, matrix[0].length]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const parsedMatrix = (() => {
            try {
                return extendMatrix(changed, dimensions[0], dimensions[1]).map(row => row.map(cell => {
                    if (typeof cell === "number") {
                        return cell;
                    }
                    if (cell === "") {
                        return 0;
                    } else if (/^-?\d+$/.test(cell.slice(1)) && cell[0] === ",") {
                        return parseFloat(".".concat(cell.slice(1)));
                    } else if (/^-?\d+$/.test(cell.slice(2)) && cell[0] === "-" && cell[1] === ",") {
                        return parseFloat("-.".concat(cell.slice(2)));
                    } else if  (!(/^-?(\d+([.,]\d*)?|.[\d]+|[.,]\d+)$/).test(cell)) {
                        throw new InvalidNumber(cell);
                    }
                    return parseFloat(cell);
                }));
            } catch (err) {
                return err;
            }
        })();
        if (parsedMatrix instanceof Error) {
            alert(`${parsedMatrix}`);
            return;
        }
        deactivateEditMode(parsedMatrix);
    };

    const handleChangeDimension0 = (event) => {
        if (event.target.value === "") {
            setDimensions([0, dimensions[1]]);
        } else if (!isNaN(parseInt(event.target.value))) {
            setDimensions([parseInt(event.target.value), dimensions[1]]);
        }
    };

    const handleChangeDimension1 = (event) => {
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