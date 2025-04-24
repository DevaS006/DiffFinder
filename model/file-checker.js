// A function to handle file selection, read the file content, and set the JSON values.
// It reads the selected file, parses it as a JSON object, and handles any errors during the process.

function handleFileSelection({ event, setJson, setError }) {
    setError(null);
    const file = event.target.files[0];

    if (!file) {
        setError('No file selected. Please choose a file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        try {
            
            setJson(reader.result);
        } catch (err) {
            console.error('JSON parsing error:', err.message);
        }
    };

    reader.onerror = () => {
        setError('Error reading the file. Please try again.');
        console.error('File read error:', reader.error);
    };

    reader.readAsText(file);
}

export { handleFileSelection };