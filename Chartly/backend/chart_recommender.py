# Decision logic
import plotly.express as px
import polars as pl
import configparser

def recommend_charts(row_types, col_types):
    """Return ranked list of suitable chart types"""
    if (col_types.count('numerical') == 2):
        return ['scatter', 'Scatterplots are ideal for showing relationships between two numerical variables.']
    elif (col_types.count('numerical') == 1 and col_types.count('categorical') == 1):
        return ['bar', 'Bar charts are perfect for comparing quantities across categories.']
    elif (col_types.count('datetime') == 1 and col_types.count('numerical') >= 1):
        return ['time series', 'Time series charts are great for showing trends of at least one numerical variable over time.']
    elif (col_types.count('numerical') == 1):
        return ['histogram', 'Histograms are useful for visualizing the distribution of a single numerical variable.']
    elif (col_types.count('geospatial') == 2):
        return ['map', 'When latitude and longitude data can be extracted, maps are an effective way to dynamically visualize geospatial data.']
    return ['No suitable chart found']

def create_plotly_chart(df, chart_type, config):
    """Generate actual chart JSON"""
    if chart_type == 'scatter':
        fig = px.scatter(df.to_pandas(), x=config['x'], y=config['y'], color=config.get('color'))