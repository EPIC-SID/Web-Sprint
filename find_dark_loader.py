import urllib.request
import re

url = 'https://www.cohortpccoe.in/assets/index-Dh28JLP6.js'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    content = resp.read().decode('utf-8')

# Search for all .mp4
mp4s = re.findall(r'https://res\.cloudinary\.com/[^"\']*\.mp4', content)
print("MP4s:", set(mp4s))

# Search for all references with "loader"
loaders = re.findall(r'https://res\.cloudinary\.com/[^"\']*loader[^"\']*', content)
print("Loaders:", set(loaders))
