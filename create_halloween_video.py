#!/usr/bin/env python3
"""
Create a high-quality MP4 video from the Halloween graphic HTML.
Requires: pip install pillow playwright
Then: playwright install chromium
"""

import asyncio
import os
import subprocess
from pathlib import Path
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

        # Capture frames for 8 seconds at 30 fps for smooth video
        duration = 8  # seconds
        fps = 30
        num_frames = duration * fps

        print(f"Capturing {num_frames} frames at {fps} fps...")
        for i in range(num_frames):
            screenshot_path = output_dir / f"frame_{i:04d}.png"
            await page.screenshot(path=screenshot_path)
            await page.wait_for_timeout(int(1000 / fps))
            if i % 30 == 0:
                print(f"Progress: {i}/{num_frames}")

        await browser.close()

        print("Creating MP4 video with ffmpeg...")
        output_video = Path(__file__).parent / "halloween-policyengine.mp4"

        # Use ffmpeg to create high-quality video
        ffmpeg_cmd = [
            'ffmpeg', '-y',
            '-framerate', str(fps),
            '-i', str(output_dir / 'frame_%04d.png'),
            '-c:v', 'libx264',
            '-preset', 'slow',
            '-crf', '18',
            '-pix_fmt', 'yuv420p',
            '-vf', 'loop=-1:1:240',  # Loop the video
            str(output_video)
        ]

        subprocess.run(ffmpeg_cmd, check=True)

        print(f"Video created: {output_video}")

        # Clean up frames
        print("Cleaning up frames...")
        for frame in output_dir.glob("*.png"):
            frame.unlink()
        output_dir.rmdir()

        print("Done!")

if __name__ == "__main__":
    asyncio.run(capture_frames())
