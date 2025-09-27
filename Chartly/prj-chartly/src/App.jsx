import { useState } from "react";
import FileUpload from "./components/FileUpload";
import ChartDisplay from "./components/ChartDisplay";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleUpload(file) {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // backend API — adjust if deployed
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Chartly</h1>

      <FileUpload onUpload={handleUpload} />

      {loading && <p className="text-blue-600 mt-4">Analyzing data...</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {analysis && (
        <ChartDisplay
          chartData={analysis.chart}
          explanation={analysis.explanation}
        />
      )}
    </div>
  );
}

export default App;
