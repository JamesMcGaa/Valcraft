from bs4 import BeautifulSoup
from requests import get
from csv import writer
import urllib.request
import urllib

url = 'https://www.ign.com/wikis/valheim/Items_List'

# r = get(url)
page = urllib.request.urlopen(url)
soup = BeautifulSoup(page, "html.parser")


# get all tables
tables = soup.find_all('table')
print(tables)
# loop over each table
for num, table in enumerate(tables, start=1):

    # create filename
    filename = 'table-%d.csv' % num

    # open file for writing
    with open(filename, 'w') as f:

        # store rows here
        data = []

        # create csv writer object
        csv_writer = writer(f)

        # go through each row
        rows = table.find_all('tr')
        for row in rows:

            # write headers if any
            headers = row.find_all('th')
            if headers:
                csv_writer.writerow([header.text.strip() for header in headers])

            # write column items
            columns = row.find_all('td')
            csv_writer.writerow([column.text.strip() for column in columns])