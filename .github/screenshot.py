import re
import asyncio
import subprocess

# Sample PR_BODY with URLs
PR_BODY = """
This is a sample PR body containing URLs.
Please check the following policy engines:
https://policyengine.org/
https://policyengine.org/uk/policy
"""

# Regular expression to match URLs
url_pattern = re.compile(r"https://policyengine.org/[\w/]*")

# Find all URLs matching the pattern in PR_BODY
urls = url_pattern.findall(PR_BODY)

# Replace the base URL with localhost:3000
local_urls = [
    url.replace("https://policyengine.org/", "http://localhost:3000/")
    for url in urls
]


async def take_screenshot(url, output_filename):
    # Invoke the Puppeteer script to take a screenshot, e.g.
    # node -e "const puppeteer = require('puppeteer'); (async () => { const browser = await puppeteer.launch(); const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 720 }); await page.goto('$url', {waitUntil: 'networkidle2'}); await page.screenshot({path: '$FILENAME'}); await browser.close(); })()"

    puppeteer_script = f"""
    const puppeteer = require('puppeteer');
    (async () => {{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({{ width: 1280, height: 720 }});
        await page.goto('{url}', {{waitUntil: 'networkidle2'}});
        await page.screenshot({{path: '{output_filename}'}});
        await browser.close();
    }})()
    """
    subprocess.run(
        ["node", "-e", puppeteer_script],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

filenames = []
# Take screenshots and save them as PNG files
for url in local_urls:
    # /uk/policy?a=b -> uk_policy_a_b.png
    output_filename = (
        url.replace("http://localhost:3000/", "")
        .replace("/", "_")
        .replace("?", "_")
        .replace("&", "_")
        + ".png"
    )
    filenames.append(output_filename)
    asyncio.run(take_screenshot(url, output_filename))

# On GitHub, set the step output {paths: filenames}

print(f"::set-output name=paths::{filenames}")