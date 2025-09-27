import polars as pl

def detect_column_types(df):
    """Identify numerical, categorical, geospatial, datetime columns"""
    column_types = {}
    df = pl.DataFrame(df)
    for col in df.columns: 
        dtype = df[col].dtype
        if dtype in [pl.Int8, pl.Int16, pl.Int32, pl.Int64, pl.Float32, pl.Float64]:
            column_types[col] = 'numerical'
        elif dtype == pl.Utf8:
            unique_count = df[col].n_unique()
            total_count = df.height
            if unique_count != total_count:
                column_types[col] = 'categorical'
            else:
                column_types[col] = 'text'
        elif dtype == pl.Date or dtype == pl.Datetime:
            column_types[col] = 'datetime'
        elif df.columns[col].name.lower() in ['latitude', 'longitude', 'lat', 'lon', 'geolocation']:
            column_types[col] = 'geospatial'
        else:
            column_types[col] = 'other'
    return column_types


# idea: implement functionality to make a dashboard with multiple charts 