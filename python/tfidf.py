from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
from nltk.corpus import stopwords

# file = open('./chemclass11book1.txt')
# data = file.read
def tf(data):
    data = nltk.sent_tokenize(data)
    # print(data)
    vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))
    try:
        X = vectorizer.fit_transform(data)
    except:
        return [];
    featureNames = vectorizer.get_feature_names()

    max =0
    feature = ''
    for col in X.nonzero()[1]:
        # if X[0, col]!=0:
        #     print(featureNames[col], ' - ', X[0, col])
        if max < X[0, col]:
            max = X[0, col]
            feature = featureNames[col]
    return  feature