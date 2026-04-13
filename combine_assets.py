import os
import re

def combine():
    dist_dir = 'dist'
    assets_dir = os.path.join(dist_dir, 'assets')
    
    # Find CSS and JS files
    css_file = [f for f in os.listdir(assets_dir) if f.endswith('.css')][0]
    js_file = [f for f in os.listdir(assets_dir) if f.endswith('.js')][0]
    
    with open(os.path.join(dist_dir, 'index.html'), 'r') as f:
        html = f.read()
        
    with open(os.path.join(assets_dir, css_file), 'r') as f:
        css = f.read()
        
    with open(os.path.join(assets_dir, js_file), 'r') as f:
        js = f.read()
        
    # Replace links with inline content
    # Remove existing link and script tags
    html = re.sub(r'<link rel="stylesheet".*?>', f'<style>{css}</style>', html)
    html = re.sub(r'<script type="module".*?></script>', f'<script type="module">{js}</script>', html)
    
    with open('Standalone_Platform.html', 'w') as f:
        f.write(html)
    
    print("Standalone_Platform.html created successfully.")

if __name__ == "__main__":
    combine()
