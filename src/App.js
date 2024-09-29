import "./style/App.css";
import NormalView from "./components/NormalView";
import { useEffect, useState } from 'react';
import MatrixEditMode from "./components/MatrixEditMode";

const DEFAULT_MATRICES = new Map([]);



function App() {
    const [edit, setEdit] = useState(null);
    const [matrices, setMatrices] = useState(DEFAULT_MATRICES);


    const useEditMode = (name) => {
        useEffect(() => {
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    deactivateEditMode(setEdit);
                }
            };
    
            document.addEventListener('keydown', handleKeyDown);
            document.body.classList.add('unscrollable');
            setEdit(name);
    
            // Cleanup function
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.body.classList.remove('unscrollable');
                setEdit(null);
            };
        }, [name]);
    };
    
    const deactivateEditMode = () => {
        document.body.classList.remove('unscrollable');
        setEdit(null);
    };

    const handleMatrixReset = () => {
        setMatrices(DEFAULT_MATRICES);
    }

    const handleMatrixCreation = (name, matrix) => {
        if (matrices.has(name)) {
            alert("Matrix already exists");
            return;
        }

        if (name === "") {
            alert("Matrix name cannot be empty");
            return;
        }

        setMatrices(new Map([...matrices, [name, matrix]]));
    }

    // Activate edit mode whenever the name changes
    useEditMode(edit, setEdit);

    return (
        <div className="application">
            <div className={edit ? "inactive" : "active"}>
                <NormalView 
                    activateEditMode={setEdit} 
                    matrices={matrices} 
                    handleMatrixCreation={handleMatrixCreation} 
                    handleMatrixReset={handleMatrixReset} 
                />
            </div>
            {edit && <MatrixEditMode deactivateEditMode={deactivateEditMode} name={edit} matrices={matrices} />}
        </div>
    );
}

export default App;




/*
newMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
*/