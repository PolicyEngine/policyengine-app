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

        # Wait for page to be ready and animations to start
        await page.wait_for_timeout(1000)

        # Capture one full animation cycle
        # Wait 100ms between frames to match real-time animation speed
        capture_duration = 12  # seconds (longest animation is ~11s)
        frame_interval_ms = 100  # ms between frames
        num_frames = int(capture_duration * 1000 / frame_interval_ms)

        print(f"Capturing {num_frames} frames over {capture_duration} seconds (one frame every {frame_interval_ms}ms)...")
        for i in range(num_frames):
            screenshot_path = output_dir / f"frame_{i:04d}.png"
            await page.screenshot(path=screenshot_path)
            await page.wait_for_timeout(frame_interval_ms)
            if i % 10 == 0:
                elapsed = i * frame_interval_ms / 1000
                print(f"Progress: {i}/{num_frames} ({elapsed:.1f}s)")

        await browser.close()

        print("Creating MP4 video with ffmpeg...")
        output_video = Path(__file__).parent / "halloween-policyengine.mp4"

        # Input is 10 fps (100ms per frame), output smooth 30fps
        input_fps = 1000 / frame_interval_ms  # 10 fps
        output_fps = 30

        ffmpeg_cmd = [
            'ffmpeg', '-y',
            '-framerate', str(input_fps),
            '-i', str(output_dir / 'frame_%04d.png'),
            '-c:v', 'libx264',
            '-profile:v', 'high',
            '-level', '4.0',
            '-pix_fmt', 'yuv420p',
            '-crf', '12',  # Very high quality
            '-preset', 'slow',
            '-movflags', '+faststart',
            '-r', str(output_fps),
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
