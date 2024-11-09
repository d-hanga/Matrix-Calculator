import { useState } from "react";
import "../style/MatrixEditMode.css";

import {cloneMatrix, extendMatrix} from "../extras/matrix-handling"

function MatrixEditMode({ deactivateEditMode, matrix, name}) {
    const [changed, setChanged] = useState(cloneMatrix(matrix)); // changed isn't the result, because it only changes, when a value is changed, if only a dimension is changed, it remains the same, only when displaying the array, it shows the corect dimension, because if you wanted to change the dimension from 3 to 12, you would do this normally:
    // [1,2,3] => [1] => [1,0,0,...]
    // with this method this happens:
    // displayed: [1,2,3] => [1] => [1,2,3,0,0,...]
    // iternally: [1,2,3] => [1,2,3] => [1,2,3,0,0,...]
    // changed only changes when: a value is modified or the array is made LONGER, NOT SHORTER
    const [dimensions, setDimensions] = useState([matrix.length, matrix[0].length]);

    const handleSubmit = (event) => {
        deactivateEditMode(changed);
    }

    // const onChangeDimensions = (event) => {
    //     setChanged(extendMatrix(changed, ...dimensions));
    // }

    const handleChangeDimension0 = (event) => {
        if (event.target.value === "") {
            setDimensions([0, dimensions[1]]);
        } else if (!isNaN(parseInt(event.target.value))) {
            setDimensions([parseInt(event.target.value), dimensions[1]]);
            if (event.target.value > dimensions[0]) {
                setChanged(extendMatrix(changed, parseInt(event.target.value), dimensions[1]));
            }
        }
    }

    const handleChangeDimension1 = (event) => {
        if (event.target.value === "") {
            setDimensions([dimensions[0], 0]);
        } else if (!isNaN(parseInt(event.target.value))) {
            setDimensions([dimensions[0], parseInt(event.target.value)]);
            if (event.target.value > dimensions[1]) {
                setChanged(extendMatrix(changed, dimensions[0], parseInt(event.target.value)));
            }
        }
    }

    const handleValueChangeCreator = (i, j) => {
        return event => {
            console.log(
                    changed.map((row, rowIndex) => 
                        rowIndex === i ? 
                        row.map((cell, colIndex) => colIndex === j ? parseInt(event.target.value) : cell) : 
                        row
                    ))
            setChanged(
                extendMatrix(
                    changed.map((row, rowIndex) => 
                        rowIndex === i ? 
                        row.map((cell, colIndex) => colIndex === j ? parseInt(event.target.value) : cell) : 
                        row
                    ),
                    ...dimensions
                )
            );
        };
    }

    // console.log(changed.length, changed[0].length, dimensions[0], dimensions[1]);

    return (
        <form className="matrix-edit-mode" onSubmit={handleSubmit}>
            <div className="matrix-edit-header">
                <div className="matrix-edit-name">{name}</div>
                <div className="matrix-edit-w-dim">
                    <div className="matrix-edit-dimension">
                        <input onBlur={handleChangeDimension0} onChange={handleChangeDimension0} value={dimensions[0]}/>
                        x
                        <input onBlur={handleChangeDimension1} onChange={handleChangeDimension1} value={dimensions[1]}/>
                    </div>
                    <table className="matrix-edit">
                        <tbody>
                        {changed.map((row, i) => (
                            i < dimensions[0] && (
                                <tr key={i}>
                                {row.map((cell, j) => (
                                    j < dimensions[1] && <td key={j}><input value={changed[i][j]} onChange={handleValueChangeCreator(i, j)}/></td>
                                ))}
                                </tr>
                            )
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