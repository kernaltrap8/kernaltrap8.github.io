import requests
import os

# Base URL pattern
base_url = 'https://wallpaperaccess.com/download/wheres-waldo-{pattern}'

# Directory to save images
save_dir = 'images'
os.makedirs(save_dir, exist_ok=True)

# Custom User Agent
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# Function to download an image
def download_image(img_url, file_name):
    try:
        response = requests.get(img_url, headers=headers, stream=True)
        response.raise_for_status()
        file_path = os.path.join(save_dir, file_name)
        with open(file_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    file.write(chunk)
        print(f'Downloaded: {file_path}')
    except Exception as e:
        print(f'Failed to download {img_url}. Error: {e}')

# Function to generate URLs and download images
def scrape_images(start, end):
    for i in range(start, end + 1):
        pattern = f'{i:07}'  # Format number as 7 digits
        url = base_url.format(pattern=pattern)
        file_name = f'{pattern}.jpg'
        file_path = os.path.join(save_dir, file_name)

        # Check if the file already exists
        if not os.path.exists(file_path):
            try:
                response = requests.get(url, headers=headers, stream=True)
                response.raise_for_status()
                
                # Check content-disposition for filename or use default
                content_disposition = response.headers.get('content-disposition', '')
                if 'filename=' in content_disposition:
                    file_name = content_disposition.split('filename=')[1].strip('"')
                else:
                    file_name = f'{pattern}.jpg'
                
                # Download the image
                download_image(url, file_name)
            except requests.RequestException as e:
                print(f'Error during request: {e}')
        else:
            print(f'File already exists: {file_path}')

if __name__ == '__main__':
    scrape_images(2687204, 2687274)  # Download images in the specified range
