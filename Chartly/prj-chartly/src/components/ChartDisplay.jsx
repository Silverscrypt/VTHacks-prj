import Plot from "react-plotly.js";

function ChartDisplay({ chartData, explanation }) {
  if (!chartData || !chartData.data || chartData.data.length === 0) {
    return <p className="mt-4 text-gray-600">No chart to display yet.</p>;
  }

  return (
    <div className="mt-6">
      <Plot
        data={chartData.data}
        layout={{
          ...chartData.layout,
          autosize: true,
          margin: { t: 40, r: 20, l: 40, b: 40 },
        }}
        style={{ width: "100%", height: "400px" }} // fixed height
      />

      {explanation && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-gray-700 text-sm">
          <strong>Why this chart?</strong> {explanation}
        </div>
      )}
    </div>
  );
}

export default ChartDisplay;
