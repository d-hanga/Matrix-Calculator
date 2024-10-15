import MatrixList from './MatrixList';
import MatricesHandling from './MatricesHandling';
import MatrixOperations from './MatrixOperations';


function NormalView({ activateEditMode, matrices, handleMatrixCreation, handleMatrixReset, saveMatrix }) {
    return (
        <div>
            <MatrixList activateEditMode={activateEditMode} matrices={matrices} />
            <MatricesHandling handleMatrixReset={handleMatrixReset} handleMatrixCreation={handleMatrixCreation} />
            <MatrixOperations saveMatrix={saveMatrix} handleMatrixCreation={handleMatrixCreation} matrices={matrices} />
        </div>
    );
}

export default NormalView;



/*
newMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
*/