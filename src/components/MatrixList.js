import mapmap from "../extras/map-handling";

import MatrixNormalDisplay from "./MatrixNormalDisplay";

function MatrixList({ activateEditMode, matrices }) {
    return (
        <div>
            {mapmap(matrices, (name, matrix) => (
                <MatrixNormalDisplay activateEditMode={activateEditMode} name={name} matrix={matrix} key={name} />
            ))}
        </div>
    );
}

export default MatrixList;