import "./style/App.css";

import NormalView from "./components/NormalView";
import { useEffect, useState } from 'react';
import MatrixEditMode from "./components/MatrixEditMode";
import { equalMatrices, extendMatrix } from "./extras/matrix-handling";
import { ZeroDimension } from "./errors/matrix";

const DEFAULT_MATRICES = new Map([]);



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

            if (name) {
                document.addEventListener('keydown', handleKeyDown);
                document.body.classList.add('unscrollable');
            }
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                document.body.classList.remove('unscrollable');
            };
        }, [name]);
    };
    

    const deactivateEditMode = (changedMatrix, dimensions) => {
        const parsedMatrix = (() => {
            try {
                return extendMatrix(changedMatrix, ...dimensions).map(row => row.map(cell => {
                    if (typeof cell === "number") {
                        return cell;
                    }
                    if (cell === "") {
                        return 0;
                    } else if (/^-?\d+$/.test(cell.slice(1)) && cell[0] === ",") {
                        return parseFloat(".".concat(cell.slice(1)));
                    } else if (/^-?\d+$/.test(cell.slice(2)) && cell[0] === "-" && cell[1] === ",") {
                        return parseFloat("-.".concat(cell.slice(2)));
                    } else if (!(/^-?(\d+([.,]\d*)?|.[\d]+|[.,]\d+)$/).test(cell)) {
                        throw new Error(`Invalid number: ${cell}`);
                    }
                    return parseFloat(cell);
                }));
            } catch (err) {
                alert(err.message);
                return;
            }
        })();

        if (parsedMatrix.length === 0 || parsedMatrix[0].length === 0) {
            alert(new ZeroDimension(parsedMatrix, dimensions[0], dimensions[1]));
            return;
        }

        setMatrices(new Map([...matrices, [edit, parsedMatrix]]));
        document.body.classList.remove('unscrollable');
        setEdit(null);
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

    const importMatrices = (string) => {
        let result = new Map(matrices);
        const json = (
            () => {
                try {
                    return JSON.parse(string);
                } catch (e) {
                    alert("Invalid JSON");
                    return;
                }
            }
        )();
        if (json === undefined) {
            return;
        }
        const same = [];
        for (let [key, value] of Object.entries(json)) {
            if (equalMatrices(value, matrices.get(key))) {
                same.push(key);
            }
            if ((!matrices.has(key)) || (!equalMatrices(value, matrices.get(key)) && window.confirm(`Matrix "${key}" already exists. \n Replace?`))) {
                result.set(key, value);
            }
        }
        if (same.length > 0) {
            alert(`Matrices ${same.join(", ")} are the same matrix as already created.`);
        }
        setMatrices(result);
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
                    importMatrices={importMatrices}
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