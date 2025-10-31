#!/usr/bin/env python3
"""
Create an animated GIF from the Halloween graphic HTML.
Requires: pip install pillow playwright
Then: playwright install chromium
"""

import asyncio
import os
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright

async def capture_frames():
    html_path = Path(__file__).parent / "halloween-graphic.html"
    output_dir = Path(__file__).parent / "halloween_frames"
    output_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1200, "height": 630})

        # Load the HTML file
        await page.goto(f"file://{html_path.absolute()}")

        # Wait for page to be ready
        await page.wait_for_timeout(1000)

        # Capture frames for 8 seconds at ~15 fps
        frames = []
        duration = 8  # seconds
        fps = 15
        num_frames = duration * fps

        print(f"Capturing {num_frames} frames...")
        for i in range(num_frames):
            screenshot_path = output_dir / f"frame_{i:03d}.png"
            await page.screenshot(path=screenshot_path)
            frames.append(screenshot_path)
            await page.wait_for_timeout(int(1000 / fps))
            if i % 15 == 0:
                print(f"Progress: {i}/{num_frames}")

        await browser.close()

        print("Creating GIF...")
        # Load all frames
        images = [Image.open(f) for f in frames]

        # Save as GIF
        output_gif = Path(__file__).parent / "halloween-policyengine.gif"
        images[0].save(
            output_gif,
            save_all=True,
            append_images=images[1:],
            duration=int(1000 / fps),
            loop=0,
            optimize=True
        )

        print(f"GIF created: {output_gif}")

        # Clean up frames
        for frame in frames:
            frame.unlink()
        output_dir.rmdir()

        print("Done!")

if __name__ == "__main__":
    asyncio.run(capture_frames())
