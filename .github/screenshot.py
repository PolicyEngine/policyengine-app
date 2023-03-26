import asyncio
import re
from pyppeteer import launch

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
    print(f"Taking screenshot of {url} and saving it as {output_filename}...")
    browser = await launch()
    print("Browser launched")
    page = await browser.newPage()
    print("New page created")
    await page.setViewport({"width": 1920, "height": 1080})
    print("Viewport set")
    await page.goto(url)
    print("Page loaded")
    await page.screenshot({"path": output_filename})
    print("Screenshot taken")
    await page.close()
    print("Page closed")


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
    asyncio.get_event_loop().run_until_complete(
        take_screenshot(url, output_filename)
    )
