#https://towardsdatascience.com/a-brief-introduction-to-intent-classification-96fda6b1f557
import pandas as pd
import re
from nltk.stem import PorterStemmer, WordNetLemmatizer
import nltk
import tensorflow as tf
from sklearn.model_selection import train_test_split
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import classification_report,confusion_matrix
from keras.utils import to_categorical
from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM, Bidirectional, Embedding, Dropout
from keras.callbacks import ModelCheckpoint
import numpy as np
import sys
import ner
import spacy
import datetime
data = pd.read_csv('/home/lavina/Desktop/educational-chatbot/python/intent.csv')
# print(data)
target = data['Type']
unique_intent = list(set(target))

#cleaning by removing punctuation and lemmatizing
lemmatizer = WordNetLemmatizer()
dataCleaned = []
for index, s in data.iterrows():
    clean = re.sub(r'[^a-z A-Z 0-9]', ' ', s['Sentence'])
    w = nltk.word_tokenize(clean)
    dataCleaned.append([lemmatizer.lemmatize(i.lower()) for i in w])
# print(dataCleaned)

#Tokenizing words
#To convert these words into indexes so that I can use them as input I use Tokenizer class of Keras.

#for input
token = Tokenizer(filters='!"#$%&()*+,-./:;<=>@[\]^_`{|}~')
token.fit_on_texts(dataCleaned)
dataCleanedVector = token.texts_to_sequences(dataCleaned)
#max no of words
vocab_size = len(token.word_index) + 1
# print(dataCleanedVector)

# pads and makes all of same length
def padding_doc(w):
  return(pad_sequences(w, maxlen=len(max(dataCleanedVector)), padding ="post"))

# for output
tokenOutput = Tokenizer(filters='!"#$%&()*+,-?./:;<=>?@[\]^_`{|}~')
tokenOutput.fit_on_texts(target)
targetVector = tokenOutput.texts_to_sequences(target)
# print(targetVector)

# 3 represented as 001 , 2 as 010 , so on..
def one_hot(encode):
  o = OneHotEncoder(sparse = False)
  return (o.fit_transform(encode))


# train_X, test_X, train_Y, test_Y = train_test_split(padding_doc(dataCleanedVector),
#                                                     one_hot(targetVector), shuffle=True, test_size=0.2)
train_X = padding_doc(dataCleanedVector)
train_Y = one_hot(targetVector)
# print(train_X)

def max_length(words):
  return(len(max(words)))


def create_model(vocab_size, max_length):
    model = Sequential()
    model.add(Embedding(vocab_size, 128, input_length=max_length, trainable=False))
    model.add(Bidirectional(LSTM(128)))
    #   model.add(LSTM(128))
    model.add(Dense(32, activation="relu"))
    model.add(Dropout(0.5))
    model.add(Dense(3, activation="softmax"))

    return model

model = create_model(vocab_size, max_length(dataCleanedVector))

model.compile(loss = "categorical_crossentropy", optimizer = "adam", metrics = ["accuracy"])
# model.summary()

hist = model.fit(train_X, train_Y, epochs =3, batch_size = 2)


def predictions(text):
    clean = re.sub(r'[^ a-z A-Z 0-9]', " ", text)
    test_word = nltk.word_tokenize(clean)
    test_word = [w.lower() for w in test_word]
    test_ls = token.texts_to_sequences(test_word)
    # print(test_word)
    # print('hello')
    # Check for unknown words
    # print(test_ls)
    if [] in test_ls:
        test_ls = list(filter(None, test_ls))
    # print(test_ls)
    test_ls = np.array(test_ls).reshape(1, len(test_ls))
    # print(test_ls)
    x = padding_doc(test_ls)
    # print(x)
    pred = model.predict_proba(x)

    return pred


def get_final_output(pred, classes):
    predictions = pred[0]

    classes = np.array(classes)
    ids = np.argsort(-predictions)
    classes = classes[ids]
    predictions = -np.sort(-predictions)

    # for i in range(pred.shape[1]):
    #     print("%s has confidence = %s" % (classes[i], (predictions[i])))
    return classes[0]



print(sys.argv)
pred =  predictions(sys.argv[1])
ans = get_final_output(pred, unique_intent)
if ans == 'Query':
    ner.test(sys.argv[1])
if ans == 'Reminder':
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(sys.argv[1])
    print('DOc is  ', doc)
    if 'today' in nltk.word_tokenize(sys.argv[1]):
        print(datetime.datetime.today())
    if 'tomorrow' in nltk.word_tokenize(sys.argv[1]):
        print(datetime.datetime.today() + datetime.timedelta(days=1))
    if 'yesterday' in nltk.word_tokenize(sys.argv[1]):
        print(datetime.datetime.today() - datetime.timedelta(days=1))
    print([(X.text, X.label_) for X in doc.ents])
print(ans)