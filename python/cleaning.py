import nltk
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.corpus import wordnet
from nltk.corpus import stopwords
import re
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd

file = open('chem2.txt')
data = file.read()
#1. sentence tokenize and punctuation remove
sentences = nltk.sent_tokenize(data)
pattern = r"[^\w]"
punctuationRemove = []
for w in sentences:
    punctuationRemove.append(re.sub(pattern, " ", w))
sentences = punctuationRemove

#2. word tokenize
words = []
for s in sentences:
    words.append(nltk.word_tokenize(s))

print(words)
#3, pos(part of speech tagging)
tagged= []
for w in words:
    tagged.append(nltk.pos_tag(w))

# for t in tagged:
#     print(t)

#4. stemming .. redundant
stemmedWords = []
stemmer = PorterStemmer()


def stem(arr):
    stemOfOneSentence = []
    for x in arr:
        stemOfOneSentence.append(stemmer.stem(x))
    return stemOfOneSentence


for w in words:
    stemmedWords.append(stem(w))

# print(stemmedWords)

# 5. lemmatization

# tree net pos tag to wordnet compatible
def get_wordnet_pos(treebank_tag):

    if treebank_tag.startswith('J'):
        return wordnet.ADJ
    elif treebank_tag.startswith('V'):
        return wordnet.VERB
    elif treebank_tag.startswith('N'):
        return wordnet.NOUN
    elif treebank_tag.startswith('R'):
        return wordnet.ADV
    else:
        return  wordnet.NOUN
lemmaWords = []
lemmatizer = WordNetLemmatizer()


def lemma(arr):
    lemmaOfOneSentence = []
    for x in arr:
        lemmaOfOneSentence.append(lemmatizer.lemmatize(x[0], get_wordnet_pos(x[1])))
    return lemmaOfOneSentence


for w in tagged:
    lemmaWords.append(lemma(w))

print(lemmaWords)

#6. eliminating stop words
stop_words = set(stopwords.words("english"))
without_stop_words = []
def removeStopWords(words):
    withoutStopWordsInASentence = []
    for word in words:
        if word not in stop_words:
           withoutStopWordsInASentence.append(word)
    return withoutStopWordsInASentence


for x in lemmaWords:
    without_stop_words.append(removeStopWords(x))

print(without_stop_words)
