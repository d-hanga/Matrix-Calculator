import exportasjson from "../extras/imexport";
import "../style/ImExport.css";
import { useState } from 'react';

function ImExport({ importMatrices, matrices }) {
    const [file, setFile] = useState(null);
    const handleUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                importMatrices(e.target.result);
                setFile(null); // Deselect the file using useState
            };
            reader.onerror = (error) => alert("Error reading file: " + error);
            reader.readAsText(uploadedFile);
        }
    };

    return (
        <div className="imexport-container">
            <div className="export-group">
                <button className="export-btn" onClick={(e) => {exportasjson(matrices)}}>
                    Export
                </button>
            </div>
            <div className="import-group">
                <input
                    id="file"
                    type="file"
                    onChange={handleUpload}
                    value={file || ''}
                    className="file-input"
                />
                <label htmlFor="file" className="import-btn">
                    Import
                </label>
            </div>
        </div>
    );
}

export default ImExport;
