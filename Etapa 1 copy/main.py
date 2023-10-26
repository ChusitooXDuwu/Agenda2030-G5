from typing import Optional

from fastapi import FastAPI

from onuModelo import Model

import pandas as pd

from joblib import load

# from preprocessing import Preprocessing

from sklearn.base import BaseEstimator, TransformerMixin
import re
import ftfy

# app = FastAPI()





# @app.get("/")
# def read_root():
#    return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Optional[str] = None):
#    return {"item_id": item_id, "q": q}


# @app.post("/predict")
# def make_predictions(dataModel: Model):
#     df = pd.DataFrame(dataModel.dict(), columns=dataModel.dict().keys(), index=[0])
#     df.columns = dataModel.columns()
#     model = load("model.joblib")
#     result = model.predict(df)
#     return result
# class Preprocessing  (BaseEstimator, TransformerMixin):
#         def fit(self, X, y=None):
#             return self

#         def remove_punctuation(self, text):
#             # Use ftfy to fix text and remove punctuation points using regular expression
#             cleaned_text = ftfy.fix_text(text)
#             cleaned_text = re.sub(r'[^\w\s]', '', cleaned_text)
#             return cleaned_text

#         def transform (self, X):
#             X['Textos_espanol'] = X['Textos_espanol'].apply(ftfy.fix_text)
#             X['Textos_espanol'] = X['Textos_espanol'].apply(lambda x: x.lower())
          
#             X['Textos_espanol'] = X['Textos_espanol'].apply(self.remove_punctuation)
#             X["Textos_espanol"] = X["Textos_espanol"].astype(str)

#             return X["Textos_espanol"]

from typing import Optional

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
   return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
   return {"item_id": item_id, "q": q}

@app.post("/predict")
def make_predictions(dataModel: Model):
    

    
    df = pd.DataFrame(dataModel.dict(), columns=dataModel.dict().keys(), index=[0])
    

    df['Textos_espanol'] = df['Textos_espanol'].apply(ftfy.fix_text)

    def remove_punctuation(text):
        # Use ftfy to fix text and remove punctuation points using regular expression
        cleaned_text = ftfy.fix_text(text)
        cleaned_text = re.sub(r'[^\w\s]', '', cleaned_text)
        return cleaned_text
    df['Textos_espanol'] = df['Textos_espanol'].apply(lambda x: x.lower())

    # Apply remove_punctuation function to 'Textos_espanol' column
    df['Textos_espanol'] = df['Textos_espanol'].apply(remove_punctuation)








   
   #  filename = 'model.joblib'
   #  df.columns = dataModel.columns()
   #  # print(df.columns)
   #  model = load(filename)
   #  result = model.predict(df)

   #  df["sdg"] = result
   #  #df.to_csv("/content/sample_data/resultado_prediccion.csv", index=False)
   #  print(df)
    return "df"

