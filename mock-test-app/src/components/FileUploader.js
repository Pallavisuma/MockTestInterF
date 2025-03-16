import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // "idle", "uploading", "success", "error"
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedText, setExtractedText] = useState(""); // To store the extracted text
  const [timer, setTimer] = useState(0); // Timer for mock test
  const navigate = useNavigate(); // For navigation to the mock test page

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) return;

    setStatus("uploading");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      setStatus("success");
      setUploadProgress(100);
      setExtractedText(response.data.extracted_text); // Get extracted text

    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("error");
      setUploadProgress(0);
    }
  }

  function handleStartTest() {
    // Navigate to mock test page and pass extracted data and timer as state
    navigate("/mock-test", { state: { extractedText, timer } });
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFileChange} accept=".pdf" />

      {file && (
        <div className="mb-4 text-sm">
          <p>File name: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: {file.type}</p>
        </div>
      )}

      {status === "uploading" && (
        <div className="space-y-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
        </div>
      )}

      {file && status !== "uploading" && (
        <button onClick={handleFileUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      )}

      {status === "success" && (
        <div>
          <p className="text-sm text-green-600">File uploaded successfully!</p>
          <div>
            <h3 className="font-bold text-lg">Extracted Text:</h3>
            <p>{extractedText}</p>
            {/* Set timer for mock test */}
            <div className="mt-4">
              <label htmlFor="timer" className="block text-sm font-medium">Set Timer (seconds):</label>
              <input
                id="timer"
                type="number"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                placeholder="Enter time in seconds"
                className="border p-2 mt-2"
              />
            </div>
            <button
              onClick={handleStartTest}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Start Mock Test
            </button>
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-red-600">Upload failed. Please try again.</p>
      )}
    </div>
  );
}
