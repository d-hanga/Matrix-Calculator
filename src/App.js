import "./style/App.css";

import str2num from "./extras/convert2numifpossiple";

import NormalView from "./components/NormalView";
import { useEffect, useState } from 'react';
import MatrixEditMode from "./components/MatrixEditMode";

// const DEFAULT_MATRICES = new Map([]);
const DEFAULT_MATRICES = new Map([
    ["A", [
            [1],
            [4]
        ]
    ],
    ["B", [
            [1, 4]
        ]
    ],
    ["C", [
            [1, 4],
            [2, 5],
            [3, 6]
        ]
    ],
    ["D", [
            [1, 4],
            [2, 5],
            [3, 6],
            [1, 4],
            [2, 5],
            [3, 6],
            [1, 4],
            [2, 5],
            [3, 6]
        ]
    ]
]);



function App() {
    const [edit, setEdit] = useState(null);
    const [matrices, setMatrices] = useState(DEFAULT_MATRICES);

    const useEditMode = (name) => {
        useEffect(() => {
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    resetEditMode();
                }
            };

            if (name) { // Only add the listener and class if in edit mode
                document.addEventListener('keydown', handleKeyDown);
                document.body.classList.add('unscrollable');
            }
    
            // Cleanup function
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.body.classList.remove('unscrollable');
            };
        }, [name]);
    };
    

    const deactivateEditMode = (changedmatrix) => {
        document.body.classList.remove('unscrollable');
        const integerized = Array.from({ length: changedmatrix.length }, () => Array(changedmatrix[0].length).fill(0));
        for (let i = 0; i < integerized.length; i++) {
            for (let j = 0; j < integerized[0].length; j++) {
                integerized[i][j] = str2num(changedmatrix[i][j]);
            }
        }
        setEdit(null);
        setMatrices(new Map([...matrices, [edit, integerized]]));
    };

    const resetEditMode = () => {
        document.body.classList.remove('unscrollable');
        setEdit(null);
    };

    const handleMatrixReset = () => {
        if (matrices.size !== 0 && window.confirm("All matrices will be deleted.")) {
            setMatrices(DEFAULT_MATRICES);
        }
    }

    const handleMatrixCreation = (name, matrix) => {
        console.log(matrix)
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

    const createHandleDelete = (name) => {
        return () => {setMatrices(new Map([...matrices].filter(([key]) => key !== name)))}
    }

    useEditMode(edit);

    return (
        <div className="application">
            <div className={edit ? "inactive" : "active"}>
                <NormalView
                    createHandleDelete={createHandleDelete}
                    activateEditMode={setEdit} 
                    matrices={matrices} 
                    handleMatrixCreation={handleMatrixCreation} 
                    handleMatrixReset={handleMatrixReset} 
                />
            </div>
            {edit && <MatrixEditMode deactivateEditMode={deactivateEditMode} name={edit} matrix={matrices.get(edit)} />}
        </div>
    );
}

export default App;




/*
newMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
*/