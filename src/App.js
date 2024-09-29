import "./style/App.css";

import NormalView from "./components/NormalView";
import { useState } from 'react';
import MatrixEditMode from "./components/MatrixEditMode";

const DEFAULT_MATRICES = new Map([]);

function App() {
    const [edit, setEdit] = useState(null);
    const [matrices, setMatrices] = useState(DEFAULT_MATRICES);



    const handleMatrixReset = () => {
        setMatrices(DEFAULT_MATRICES);
    }

    const activateEditMode = (name) => {
        document.body.classList.add('unscrollable');
        setEdit(name);
    }

    const deactivateEditMode = () => {
        document.body.classList.remove('unscrollable');
        setEdit(null);
    }

    const handleMatrixCreation = (name, matrix) => {
        if (matrices.has(name)) {
            alert("already exists");
            return;
        }

        if (name === "") {
            alert("empty matrix");
            return;
        }

        setMatrices(new Map([...matrices, [name, matrix]]));
    }



    return (
        <div className="application">
            <div  className={edit ? "inactive" : "active"}>
                <NormalView activateEditMode={activateEditMode} matrices={matrices} handleMatrixCreation={handleMatrixCreation} handleMatrixReset={handleMatrixReset} />
            </div>
            {edit ? <MatrixEditMode deactivateEditMode={deactivateEditMode} name={edit} matrices={matrices} /> : null}
        </div>
    );
}

export default App;



/*
newMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
*/