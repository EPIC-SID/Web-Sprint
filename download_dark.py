import urllib.request
import os

base_url = 'https://www.cohortpccoe.in/assets/'
dest_dir = r'e:\Siddhant\VS Code\Projects\Web Sprint\cohot_mine\public\assets'

dark_map = {
    'dark1.svg': 'dark1-BZ1HA7yb.svg',
    'dark2.png': 'dark2-BYC7ZlfK.png',
    'dark3.svg': 'dark3-QsL2CcWP.svg',
    'dark4.svg': 'dark4-DqvLaxtE.svg',
    'dark5.png': 'dark5-DxY4dtIz.png',
    'dark6.png': 'dark6-D8XR4DWk.png',
}

headers = {'User-Agent': 'Mozilla/5.0'}

for local_name, remote_name in dark_map.items():
    url = base_url + remote_name
    dest = os.path.join(dest_dir, local_name)
    print(f"Downloading {url} -> {dest}")
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = resp.read()
        with open(dest, 'wb') as f:
            f.write(data)
    print(f"Saved {local_name} ({len(data)} bytes)")

print("All dark assets downloaded successfully!")
