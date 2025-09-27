from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # allow frontend to call backend

def recommend_chart(df):
    """Simple rule-based chart recommendation"""
    chart = {}
    explanation = ""

    numeric_cols = df.select_dtypes(include='number').columns.tolist()
    categorical_cols = df.select_dtypes(include='object').columns.tolist()
    datetime_cols = df.select_dtypes(include='datetime64').columns.tolist()

    # Attempt to parse object columns as datetime
    for col in categorical_cols:
        try:
            df[col] = pd.to_datetime(df[col])
            datetime_cols.append(col)
        except:
            continue

    # 1. Time series → Line chart
    if datetime_cols and numeric_cols:
        chart = {
            "data": [
                {"x": df[datetime_cols[0]].tolist(), "y": df[numeric_cols[0]].tolist(), "type": "line"}
            ],
            "layout": {"title": f"Line Chart: {numeric_cols[0]} over {datetime_cols[0]}"}
        }
        explanation = "Line chart selected: datetime column vs numeric column."

    # 2. Categorical + numeric → Pie or Bar chart
    elif categorical_cols and numeric_cols:
        # If numeric column has only positive values, use Pie chart
        if df[numeric_cols[0]].min() >= 0:
            chart = {
                "data": [
                    {
                        "labels": df[categorical_cols[0]].tolist(),
                        "values": df[numeric_cols[0]].tolist(),
                        "type": "pie"
                    }
                ],
                "layout": {"title": f"Pie Chart: {numeric_cols[0]} by {categorical_cols[0]}"}
            }
            explanation = "Pie chart selected: showing proportion of numeric values across categories."
        else:
            chart = {
                "data": [
                    {"x": df[categorical_cols[0]].tolist(),
                     "y": df[numeric_cols[0]].tolist(),
                     "type": "bar"}
                ],
                "layout": {"title": f"Bar Chart: {numeric_cols[0]} by {categorical_cols[0]}"}
            }
            explanation = "Bar chart selected: categorical column vs numeric column."

    # 3. Single numeric → Histogram
    elif numeric_cols:
        chart = {
            "data": [
                {"x": df[numeric_cols[0]].tolist(), "type": "histogram"}
            ],
            "layout": {"title": f"Histogram of {numeric_cols[0]}"}
        }
        explanation = "Histogram selected: single numeric column."

    else:
        chart = {
            "data": [],
            "layout": {"title": "No suitable chart found"}
        }
        explanation = "Could not determine suitable chart type."

    return chart, explanation

@app.route("/api/upload", methods=["POST"])
def upload():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        # Detect file type
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file)
        else:
            return jsonify({"error": "Unsupported file type"}), 400
    except Exception as e:
        return jsonify({"error": f"Failed to read file: {str(e)}"}), 400

    chart, explanation = recommend_chart(df)
    return jsonify({"chart": chart, "explanation": explanation})

if __name__ == "__main__":
    app.run(debug=True)
