'use client'

import { useState } from "react";
import './Home.css'
export default function Home() {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = ["Alphabets", "Numbers", "Highest Alphabet"];

    const handleSubmit = async () => {
        try {
            setError("");
            const parsedInput = JSON.parse(jsonInput);
            const res = await fetch("http://backend-bajaj-iota.vercel.app/bfhl", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsedInput),
            });

            const data = await res.json();
            if (res.ok) {
                setResponse(data);
            } else {
                setError(data.message || "Invalid response");
            }
        } catch (err) {
            setError("Invalid JSON format");
        }
    };

    return (
        <div className="container">
            <h1>ABCD123</h1>
            <textarea
                className="json-input"
                placeholder="Enter JSON input"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
            {error && <p className="error-message">{error}</p>}
            {response && (
                <>
                    <label>Select filters: Press Ctrl and select</label>
                    <select
                        className="filter-select"
                        multiple
                        onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}
                    >
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <div className="response-container">
                        {selectedOptions.includes("Alphabets") && response.alphabets.length > 0 && (
                            <p><strong>Alphabets:</strong> {JSON.stringify({ "Alphabets": response.alphabets })}</p>
                        )}
                        {selectedOptions.includes("Numbers") && response.numbers.length > 0 && (
                            <p><strong>Numbers:</strong> {JSON.stringify({ "Numbers": response.numbers })}</p>
                        )}
                        {selectedOptions.includes("Highest Alphabet") && response.highest_alphabet.length > 0 && (
                            <p><strong>Highest Alphabet:</strong> {JSON.stringify({ "Highest Alphabet": response.highest_alphabet })}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
