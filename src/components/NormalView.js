import MatrixList from "./MatrixList";
import MatricesHandling from "./MatricesHandling";
import MatrixOperations from "./MatrixOperations";
import ImExport from "./ImExport";


function NormalView({ importMatrices, activateEditMode, matrices, handleMatrixCreation, handleMatrixReset, createHandleDelete }) {
    return (
        <div>
            <ImExport matrices={matrices} importMatrices={importMatrices} />
            <MatrixList createHandleDelete={createHandleDelete} activateEditMode={activateEditMode} matrices={matrices} />
            <MatricesHandling handleMatrixReset={handleMatrixReset} handleMatrixCreation={handleMatrixCreation} />
            <MatrixOperations handleMatrixCreation={handleMatrixCreation} matrices={matrices} />
        </div>
    );
}

export default NormalView;



/*
newMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
*/