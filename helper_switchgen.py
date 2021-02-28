import json
from urllib.parse import quote
import os.path
from scrape_wiki_images import attempt_wiki_targeted_parse
# https://csvjson.com/csv2json
with open('data.json') as f:
  data = json.load(f)
result = ''


for row in data:
    print(row['name'])
    filename = row['name'].lower().replace(' ', '_').capitalize() + '.png' 
    attempt_wiki_targeted_parse(quote(filename))
    if not os.path.exists('./assets/scraped/{}'.format(quote(filename))):
        filename = "redsquare.png"
    result += '\tcase \"{}\":\n\t\treturn require(\'./assets/scraped/{}\');\n'.format(row['name'], quote(filename) )
final_result = '''export default function image_importer(name) {{
  switch (name) {{
{}
    default:
      return require('./assets/scraped/redsquare.png');
  }};
}}'''.format(result)
f = open("helper_switchgen.js", "w")
f.write(final_result)
f.close()