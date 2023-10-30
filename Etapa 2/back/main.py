import pandas as pd
from fastapi import FastAPI
from joblib import load
from onuModelo import DataModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse, FileResponse


model = load("../../Etapa 1/model.joblib")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

predictions_csv = "data/predictions.csv"
predictions_xlsx = "data/predictions.xlsx"

@app.get("/")
def read_root():
   return {"Hello": "World"}

@app.post("/predict")
def make_predictions(dataModel: DataModel, ):
   df = pd.DataFrame(dataModel.dict(), columns=dataModel.dict().keys(), index=[0])
   df.columns = dataModel.columns()
   result = model.predict(df)
   return {
      "Textos_espanol": dataModel.dict()['Textos_espanol'],
      "sdg": int(result),
   }

@app.post("/predict_file")
async def make_predictions_file(file: UploadFile=File(...)):
   try:
      if not file.filename.endswith((".xlsx", ".csv")):
         return JSONResponse(status_code=400, content={"message": "El archivo debe ser un excel o un csv"})
      
      if file.filename.endswith(".xlsx"):
         df = pd.read_excel(file.file)
      else:
         df = pd.read_csv(file.file)
      
      if not "Textos_espanol" in df.columns:
         return JSONResponse(status_code=400, content={"message": "El archivo no tiene la columna Textos_espanol"})
      
      result = model.predict(df)
      df['sdg'] = result

      data_list = df.to_dict(orient="records")

      df.to_csv(predictions_csv, index=False)
      df.to_excel(predictions_xlsx, index=False)

      return data_list
   
   except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/download_predictions_csv")
def download_predictions():
   try:
      return FileResponse(predictions_csv, filename="predictions.csv")
   except Exception as e:
      print(e)
      return JSONResponse(status_code=500, content={"message": "Hubo un error descargando el archivo"})

@app.get("/download_predictions_xlsx")
def download_predictions():
   try:
      return FileResponse(predictions_xlsx, filename="predictions.xlsx")
   except Exception as e:
      print(e)
      return JSONResponse(status_code=500, content={"message": "Hubo un error descargando el archivo"})