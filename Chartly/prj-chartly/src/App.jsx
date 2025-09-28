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

    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a CSV or Excel file (.csv, .xls, .xlsx).");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-950 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-slate-300">
          Chartly
        </h1>

        <FileUpload onUpload={handleUpload} />

        {loading && (
          <p className="text-blue-600 mt-4 text-center font-medium animate-pulse">
            Analyzing data...
          </p>
        )}
        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}

        {analysis && (
          <ChartDisplay
            chartData={analysis.chart}
            explanation={analysis.explanation}
          />
        )}
      </div>
    </div>
  );
}

export default App;
