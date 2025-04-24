import React, { useState } from 'react';
import { handleFileSelection } from '../FileChecker';
import DiffViewer from '../UiView/DiffViewer';
import '../Styles/InputText.css';
import { Button, Textarea, Field, FileUpload, Code } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"

// A component that allows users to input, upload, and compare two JSON objects.
// It includes text areas for manual JSON input, file upload buttons to load JSON files,
// and a diff viewer to display the differences between the two JSON objects in split or unified views.

function InputText() {
    // Manages the state for the two JSON inputs, error messages, and view mode (split or unified)
    const [JsonOne, setJsonOne] = useState('');
    const [JsonTwo, setJsonTwo] = useState('');
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('split');

// Updates the view mode (split or unified) based on user selection
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    return (
        
        
        <div className="diff-analyzer-container">
            <h1 className="app-title">JSON Diff Analyzer</h1>
            <div className="input-container">
                <div className="json-column">
                    <Field.Root>
                        <Field.Label className="json-label">JSON A</Field.Label>
                        <Textarea
                            size='xl'
                            value={JsonOne}
                            onChange={(e) => setJsonOne(e.target.value)}
                            className="json-input"
                            placeholder="Paste your first JSON here..."
                            spellCheck="false"
                        ></Textarea>
                    </Field.Root>
                </div>
                <div className="json-column">
                    <Field.Root>
                        <Field.Label className="json-label">JSON B</Field.Label>
                        <Textarea
                            size='xl'
                            value={JsonTwo}
                            onChange={(e) => setJsonTwo(e.target.value)}
                            className="json-input"
                            placeholder="Paste your second JSON here..."
                            spellCheck="false"
                        ></Textarea>
                    </Field.Root>

                </div>
            </div>

            <div className="file-input-container">

                <FileUpload.Root accept={[".json"]} onChange={(event) => handleFileSelection({ event, setJson: setJsonOne, setError })}>
                    <FileUpload.HiddenInput />
                    <FileUpload.Trigger asChild>
                        <Button variant="outline" size="sm" colorPalette="blue" padding='10px'>
                            <HiUpload /> Upload JsonA
                        </Button>
                    </FileUpload.Trigger>
                </FileUpload.Root>

                <FileUpload.Root accept={[".json"]} onChange={(event) => handleFileSelection({ event, setJson: setJsonTwo, setError })}>
                    <FileUpload.HiddenInput />
                    <FileUpload.Trigger asChild>
                        <Button variant="outline" size="sm" colorPalette="blue" padding="10px">
                            <HiUpload /> Upload JsonB
                        </Button>
                    </FileUpload.Trigger>
                </FileUpload.Root>
                <Code colorPalette="red" className="error-message">{error}</Code>

            </div>

            <div className="diff-viewer-container">
                <DiffViewer oldValue={JsonOne} newValue={JsonTwo} viewMode={viewMode} handleViewModeChange={handleViewModeChange}/>
            </div>
        </div>
        //Passes the two JSON objects (oldValue and newValue), the current view mode, 
        // and the handler to switch view modes to the DiffViewer component for comparison
    );
}

export { InputText };