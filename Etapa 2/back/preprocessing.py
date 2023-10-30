from sklearn.base import BaseEstimator, TransformerMixin
import re
import ftfy

class Preprocessing (BaseEstimator, TransformerMixin):
  def fit(self, X, y=None):
      return self

  def remove_punctuation(self, text):
      # Use ftfy to fix text and remove punctuation points using regular expression
      cleaned_text = ftfy.fix_text(text)
      cleaned_text = re.sub(r'[^\w\s]', '', cleaned_text)
      return cleaned_text

  def transform (self, X):
      X['Textos_espanol'] = X['Textos_espanol'].apply(ftfy.fix_text)
      X['Textos_espanol'] = X['Textos_espanol'].apply(lambda x: x.lower())
      # Apply remove_punctuation function to 'Textos_espanol' column
      X['Textos_espanol'] = X['Textos_espanol'].apply(self.remove_punctuation)
      X["Textos_espanol"] = X["Textos_espanol"].astype(str)

      return X["Textos_espanol"]



      