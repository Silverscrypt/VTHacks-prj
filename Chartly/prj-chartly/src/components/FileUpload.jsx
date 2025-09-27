function FileUpload({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      alert("Please upload a CSV file");
      return;
    }

    onUpload(file);
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center">
      <p className="mb-2 text-gray-700">Upload a CSV file to generate charts</p>
      <input type="file" accept=".csv" onChange={handleChange} />
    </div>
  );
}

export default FileUpload;
