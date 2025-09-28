function FileUpload({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onUpload(file);
  };

  return (
    <label
      className="block w-full cursor-pointer border-2 border-dashed rounded-xl p-6 text-center bg-white
  hover:bg-indigo-50 hover:border-indigo-600 hover:shadow-2xl [box-shadow:0_18px_50px_rgba(15,23,42,0.45)] transform hover:-translate-y-0.5
        transition duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
    >
      <span className="text-gray-700">
        Click or drag a file here to upload (.csv, .xls, .xlsx)
      </span>
      <input
        type="file"
        accept=".csv,.xls,.xlsx"
        className="hidden"
        onChange={handleChange}
      />
    </label>
  );
}

export default FileUpload;
