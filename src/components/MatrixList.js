import "../style/MatrixList.css";


import mapmap from "../extras/map-handling";

import MatrixNormalDisplay from "./MatrixNormalDisplay";

function MatrixList({ activateEditMode, matrices, createHandleDelete }) {
    return (
        <div className="matrix-list">
            {mapmap(matrices, (name, matrix) => (
                <MatrixNormalDisplay handleDelete={createHandleDelete(name)} activateEditMode={activateEditMode} name={name} matrix={matrix} key={name} />
            ))}
        </div>
    );
}

export default MatrixList;