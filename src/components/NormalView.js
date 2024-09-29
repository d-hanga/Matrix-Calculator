import MatrixList from './MatrixList';
import MatricesHandling from './MatricesHandling';


function NormalView({ activateEditMode, matrices, handleMatrixCreation, handleMatrixReset }) {
    return (
        <div>
            <MatrixList activateEditMode={activateEditMode} matrices={matrices} />
            <MatricesHandling handleMatrixReset={handleMatrixReset} handleMatrixCreation={handleMatrixCreation} />
        </div>
    );
}

export default NormalView;



/*
newMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
*/