function FileUpload({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Allowed MIME types for CSV and Excel
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
    ];

    // Check if the file type is among allowed types
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a CSV or Excel file (.csv, .xls, .xlsx)");
      return;
    }

    onUpload(file);
  };

  return (
    <div className="border-2 border-dashed rounded-xl p-6 text-center">
      <p className="mb-2 text-gray-700">Upload a CSV or Excel file to generate charts</p>
      <input
        type="file"
        accept=".csv,.xls,.xlsx"
        onChange={handleChange}
      />
    </div>
  );
}

export default FileUpload;