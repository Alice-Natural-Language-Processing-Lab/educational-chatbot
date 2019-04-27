import networkx as nx
import numpy as np
from nltk.tokenize.punkt import PunktSentenceTokenizer
from sklearn.feature_extraction.text import TfidfTransformer, CountVectorizer

from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance

document = 'French President Emmanuel Macron vowed to rebuild Notre Dame with help from the international community after a devastating fire gutted the famous Catholic cathedral last night.'

document +='Speaking just hours after the roof of the 850-year-old building caved in, Macron said a national fundraising campaign to restore the historic building would be launched today, and he called on the worlds greatest talents to help.'

document +='The French leader credited the \'courage\' and \'great professionalism\' of firefighters with sparing Notre Dame\'s spectacular Gothic facade and two landmark towers from being destroyed, saying the worst has been avoided'

document +='But much of the UNESCO World Heritage landmark building was devastated. The 300ft-tall Gothic spire collapsed into the embers early in the blaze to pained cries of \'Oh my God\' from locals transfixed by the unfolding scene'

document +='We have been dealt a knockout blow,\' a grief-stricken Paris Archbishop Michel Aupetit said at the scene.'

def read_article(doc):
    article = doc.split('.')
    sentences = []

    for sentence in article:
        # print(sentence)
        sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))
    sentences.pop()

    return sentences


def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = []

    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]

    all_words = list(set(sent1 + sent2))

    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)

    # build the vector for the first sentence
    for w in sent1:
        if w in stopwords:
            continue
        vector1[all_words.index(w)] += 1

    # build the vector for the second sentence
    for w in sent2:
        if w in stopwords:
            continue
        vector2[all_words.index(w)] += 1

    return 1 - cosine_distance(vector1, vector2)


def build_similarity_matrix(sentences, stop_words):
    # Create an empty similarity matrix
    similarity_matrix = np.zeros((len(sentences), len(sentences)))

    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if idx1 == idx2:  # ignore if both are same sentences
                continue
            similarity_matrix[idx1][idx2] = sentence_similarity(sentences[idx1], sentences[idx2], stop_words)

    return similarity_matrix


def generate_summary(doc, top_n=5):
    stop_words = stopwords.words('english')
    summarize_text = []

    # Step 1 - Read text anc split it
    sentences = read_article(doc)

    # Step 2 - Generate Similary Martix across sentences
    sentence_similarity_martix = build_similarity_matrix(sentences, stop_words)

    # Step 3 - Rank sentences in similarity martix
    sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
    try:
        scores = nx.pagerank(sentence_similarity_graph)
    except:
        print('Cant do it')
        return []

    # Step 4 - Sort the rank and pick top sentences
    ranked_sentence = sorted(((scores[i], s) for i, s in enumerate(sentences)), reverse=True)
    # print("Indexes of top ranked_sentence order are ", ranked_sentence)
    if len(ranked_sentence) <2:
        return []
    for i in range(top_n):
        summarize_text.append(" ".join(ranked_sentence[i][1]))

    # Step 5 - Offcourse, output the summarize texr
    return summarize_text

# let's begin
text = generate_summary(document, 2)
for d in text:
    print(d)