import pandas as pd
from typing import Optional
from fastapi import FastAPI
from joblib import load
from onuModelo import DataModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse, FileResponse
import json


model = load("../../Etapa 1/model.joblib")
app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
   return {"Hello": "World"}



# Se puede recivir un archivo excel o un Json con los datos a predecir.
# Si se recive un Json se debe hacer la petición con el siguiente formato:
# {
#     "Textos_espanol": "Texto a predecir"
# }
# Si se recive un archivo excel se debe hacer la petición con el siguiente formato:
# {
#     "file": "Archivo excel"
# }
# En ambos casos se retorna un Json con el siguiente formato:
# {
#     "Textos_espanol": "Texto a predecir",
#     "sdg": "Etiqueta predicha"
# }




@app.post("/predict")
def make_predictions(dataModel: DataModel, ):
   # texto = dataModel.dict()['Textos_espanol']
   # df = pd.DataFrame([texto], columns=['Textos_espanol'])
   # predict = model.predict(df)[0]
   df = pd.DataFrame(dataModel.dict(), columns=dataModel.dict().keys(), index=[0])
   df.columns = dataModel.columns()
   result = model.predict(df)


   texto = dataModel.dict()['Textos_espanol']
   response = {
      "Textos_espanol": texto,
      "sdg": int(result),
   }
   return response

@app.post("/predict_file")
def make_predictions_file(excel_file: UploadFile):
   try:
      #Si no termina en .xlsx  o .csv no se procesa 
      if not excel_file.filename.endswith((".xlsx", ".csv")):
         return JSONResponse(status_code=400, content={"message": "El archivo debe ser un excel o un csv"})
      
      #Se lee el archivo si es un excel
      if excel_file.filename.endswith(".xlsx"):
         df = pd.read_excel(excel_file.file)
      else:
         df = pd.read_csv(excel_file.file)
      
      #Se verifica que el archivo tenga la columna Textos_espanol
      if not "Textos_espanol" in df.columns:
         return JSONResponse(status_code=400, content={"message": "El archivo no tiene la columna Textos_espanol"})
      
      result = model.predict(df)
      df['sdg'] = result

      # predictions_list = result.tolist()
      # return JSONResponse(content={"predictions": predictions_list}, status_code=200)


      first_10_rows = df.head(2)
      # Crear una lista de diccionarios a partir del DataFrame
      data_list = first_10_rows.to_dict(orient="records")

      # Crear el diccionario final
      json_data = {"data": data_list}

      # Convertir el diccionario a una cadena JSON
      json_string = json.dumps(json_data, ensure_ascii=False)
      print(data_list)
      return data_list
   except Exception as e:
      print(e)
      return JSONResponse(status_code=500, content={"message": "Hubo un error procesando el archivo"})