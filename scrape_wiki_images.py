import urllib.request
from csv import writer

import requests
from bs4 import BeautifulSoup
from requests import get


def attempt_image_scrape(image_expected_name):
    for i in range(0,10):
        for j in 'abcdefghijklmnopqrstuvwxyz0123456789':
            for k in 'abcdefghijklmnopqrstuvwxyz0123456789':
                print('https://static.wikia.nocookie.net/valheim/images/{}/{}{}/{}'.format(i,j,k,image_expected_name))
                response = requests.get('https://static.wikia.nocookie.net/valheim/images/{}/{}{}/{}'.format(i,j,k,image_expected_name))
                if response.status_code == 200:
                    with open('./assets/scraped/{}'.format(image_expected_name), 'wb') as handler:
                        handler.write(response.content)
                        return 
# attempt_image_scrape('Cape_of_Odin.png')

def attempt_wiki_targeted_parse(image_expected_name):
    try:
        page = urllib.request.urlopen('https://valheim.fandom.com/wiki/{}'.format(image_expected_name[:-4]))
        soup = BeautifulSoup(page, "html.parser")
        imgs = soup.find_all('img', {"class": "pi-image-thumbnail"})
        for img in imgs:
            src = img.get('src')
            with open('./assets/scraped/{}'.format(image_expected_name), 'wb') as handler:
                response = requests.get(src)
                if response.status_code == 200:
                    handler.write(response.content)
                    return 
    except:
        print("Did not find a page for {}".format(image_expected_name))
