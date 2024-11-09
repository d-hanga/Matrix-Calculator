import "../style/MatrixList.css";


import mapmap from "../extras/map-handling";

import MatrixNormalDisplay from "./MatrixNormalDisplay";

function MatrixList({ activateEditMode, matrices }) {
    return (
        <div className="matrix-list">
            {mapmap(matrices, (name, matrix) => (
                <MatrixNormalDisplay activateEditMode={activateEditMode} name={name} matrix={matrix} key={name} />
            ))}
        </div>
    );
}

export default MatrixList;