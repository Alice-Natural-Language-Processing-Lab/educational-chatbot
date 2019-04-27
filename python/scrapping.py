# import libraries
from bs4 import BeautifulSoup
import requests

urlchemistry = 'https://en.wikipedia.org/wiki/Glossary_of_chemistry_terms'
urlphysics = 'https://en.wikipedia.org/wiki/Glossary_of_physics'
urlmaths = 'https://en.wikipedia.org/wiki/Category:Mathematical_terminology'
file = open('./stanford-ner-tagger/train/corpus.tsv', "a")

def scrape(url, content):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    # print(soup.prettify())
    x = soup.find_all('dfn')
    for temp in x:
        # print(temp)
        x = temp.find('a')
        #remove the null ones
        if x :
            arr = temp.find('a').contents[len(temp.find('a').contents)-1].split()
            print(arr)
            for a in arr:
                str = a + ' ' + content
                print(str)
                file.write(str + '\n')

def scrapeMath(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    # print(soup.prettify())
    x = soup.find_all('div', attrs={'class':'mw-category-group'})
    for temp in x:
        words = temp.find('a').contents[0].split()
        for w in words:
            str =  w + ' ' + 'MATHS'
            print(str)
            file.write(str+'\n')


scrape(urlchemistry, 'CHEMISTRY')
scrape(urlphysics, 'PHYSICS')
scrapeMath(urlmaths)


