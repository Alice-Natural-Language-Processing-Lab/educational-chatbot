import re
import summarization
import tfidf
import pymongo


client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['minorProject']
collection = db['key-values']
def parts(doc):
    data = re.split('SUMMARY', doc)
    content = data[0]
    data = re.split('EXERCISES', data[1])
    summary = data[0]
    exercise = data[1]
    return (content, summary, exercise)

def chapterSummary(chap):
    unitSummary = []
    for unit in chap:
        summarizedText = summarization.generate_summary(unit, 2)
        if summarizedText ==  []:
            continue
        tfidfText = tfidf.tf(unit)
        sentence = ''
        for x in summarizedText:
            sentence +=x
        print(tfidfText, '------> ', sentence)
        entry = {"query":tfidfText , "ans": sentence}
        insert = collection.insert_one(entry)
        print(insert.inserted_id)
        unitSummary.append(summarizedText)
    return unitSummary
file = open('chemclass11book1.txt')
data = file.read()
#splitting chap wise
data = data.split('Answer to Some Selected Problems')
chapter = re.split('UNIT [0-9]+', data[0])
part = []
chapSummaryUnitWise =[]
for i in range(1, len(chapter)):
    part.append(parts(chapter[i]))
units = []
for (content, summary, exercise) in part:
    content = re.sub('Fig. [0-9]+.[0.9]+', ' ',content)
    content = re.sub('Problem [0-9]+.[0.9]+', ' ',content)
    content = re.sub('Table [0-9]+.[0-9]+', ' ', content)
    d1 = re.split(r'\d.\d+', content)
    units.append(d1)

for chap in units:
    print('New CHapter')
    unitSummary = chapterSummary(chap)
    chapSummaryUnitWise.append(unitSummary)
# print(chapSummaryUnitWise)
# for x in chapSummaryUnitWise:
#     for d in x:
#          print(d)