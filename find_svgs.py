import urllib.request
import re

url = 'https://www.cohortpccoe.in/assets/index-Dh28JLP6.js'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    content = resp.read().decode('utf-8')

# Search for all strings matching dark
dark_refs = re.findall(r'\"[^\"]*dark[^\"]*\"', content)
print("Dark refs:", set(dark_refs[:30]))

# Search for all .svg or .png
all_assets = re.findall(r'\"[^\"]*\.(?:svg|png|jpg|webp)\"', content)
print("All assets:", set(all_assets))
