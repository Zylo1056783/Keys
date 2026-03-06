from fastapi import FastAPI
from fastapi.responses import FileResponse
import os
import zipfile
import io

app = FastAPI()
DATA_DIR = "data"

@app.get("/GET_TABLES")
def get_tables():
    # List JSON files to serve
    files = ["table1.json", "table2.json", "table3.json", "table4.json"]

    # Create in-memory ZIP
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w") as zf:
        for fname in files:
            path = os.path.join(DATA_DIR, fname)
            if os.path.exists(path):
                zf.write(path, arcname=fname)
    buffer.seek(0)
    
    return FileResponse(
        path_or_file=buffer,
        media_type="application/zip",
        filename="tables.zip"
    )
