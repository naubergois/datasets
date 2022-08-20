import sys
import os
import shutil
import time
import traceback

from flask import Flask, request, jsonify
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier


app = Flask(__name__)


clf=RandomForestClassifier()


include = ['Age', 'Sex',  'Survived']


@app.route('/predict/<string:idade>/<string:sexo>/')
def get_predict(idade,sexo):

  predicao=clf.predict([[int(idade),int(sexo)]])

  return jsonify ({'predicao': str(predicao)})

@app.route('/train', methods=['GET'])
def train():


    from sklearn.model_selection import train_test_split

    df = pd.read_csv('titanic.csv')


    df = df[include]

    from sklearn.preprocessing import LabelEncoder

    df['Sex']=LabelEncoder().fit_transform(df['Sex'])
    df=df.dropna()

    X=df.drop(['Survived'],axis=1)
    y=df['Survived']




    print(df)


    X_train,X_test,y_train,y_test=train_test_split(X,y)

    clf.fit(X_train,y_train)

    #pickle.dump(clf, 'classificador.pkl')

    message1 = 'Model training score: %s' % clf.score(X_test, y_test)

    return_message = 'Success. \n{0}. '.format(message1)

    return return_message


app.run(host='0.0.0.0', port=5000, debug=True)
