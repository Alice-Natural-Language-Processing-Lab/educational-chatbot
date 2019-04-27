# https://www.commonlounge.com/discussion/2662a77ddcde4102a16d5eb6fa2eff1e
# https://medium.com/district-data-labs/named-entity-recognition-and-classification-for-entity-extraction-6f23342aa7c5
# using crf conditional random field
import nltk
import sklearn_crfsuite
from nltk.corpus import stopwords
import sys
import re


def doc2features(doc, i):
    word = doc[i][0]

    # Features from current word
    features = {
        'word.word': word,
    }
    # Features from previous word
    if i > 0:
        prevword = doc[i - 1][0]
        features['word.prevword'] = prevword
    else:
        features['BOS'] = True  # Special "Beginning of Sequence" tag

    # Features from next word
    if i < len(doc) - 1:
        nextword = doc[i + 1][0]
        features['word.nextword'] = nextword
    else:
        features['EOS'] = True  # Special "End of Sequence" tag
    return features


def extract_features(doc):
    return [doc2features(doc, i) for i in range(len(doc))]




def get_labels(doc):
    return [tag for (token,tag) in doc]

# data = sys.argv[1]
def test(sentence):
    file = open('/home/lavina/Desktop/educational-chatbot/python/nercorpus.txt')
    data = file.read()
    data = nltk.sent_tokenize(data)
    processedSet = []
    i = 0
    # print(stopwords.words('english'))
    while i < len(data) - 1:
        element = (data[i].split('.')[0], data[i + 1].split('.')[0])
        processedSet.append(element)
        i += 2
    corpus = []

    for (doc, tags) in processedSet:
        docTag = []
        word = doc.split(' ')
        tag = tags.split(' ')
        for i in range(0, len(word)):
            el = (word[i], tag[i])
            docTag.append(el)
        corpus.append(docTag)
    X = [extract_features(doc) for doc in corpus]
    # print(X)
    y = [get_labels(doc) for doc in corpus]
    # print(y)

    crf = sklearn_crfsuite.CRF(
        algorithm='lbfgs',
        c1=0.1,
        c2=0.1,
        max_iterations=20,
        all_possible_transitions=False
    )
    crf.fit(X, y)
    # sen = 'What is  photosynthesis'
    sentence = re.sub(r'[^ a-z A-Z 0-9]', " ", sentence)
    data = sentence.split()
    test =[]
    stoppingWords = stopwords.words('english')
    stoppingWords.append('explain')
    for x in data:
        if x not in stoppingWords:
            test.append(x)
    print(test)
    X_test = extract_features(test)
    # print(X_test)
    w = crf.predict_single(X_test)
    print(w)
