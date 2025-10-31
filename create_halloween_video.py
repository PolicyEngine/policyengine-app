#!/usr/bin/env python3
"""
Create a high-quality MP4 video from the Halloween graphic HTML.
Captures at native 30fps to match real-time animation speed.
"""

import asyncio
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

        # Capture at 30fps for smooth video that matches real-time
        fps = 30
        duration = 12  # seconds - one full animation cycle
        frame_time_ms = 1000 / fps  # ~33ms per frame
        num_frames = int(fps * duration)

        print(f"Capturing {num_frames} frames at {fps}fps over {duration} seconds...")
        print(f"Each frame captured every {frame_time_ms:.1f}ms to match real-time")

        for i in range(num_frames):
            screenshot_path = output_dir / f"frame_{i:04d}.png"
            await page.screenshot(path=screenshot_path, type='png')
            await page.wait_for_timeout(int(frame_time_ms))

            if i % 30 == 0:
                elapsed = i / fps
                print(f"Progress: {i}/{num_frames} ({elapsed:.1f}s)")

        await browser.close()

        print("\nCreating MP4 video with ffmpeg...")
        output_video = Path(__file__).parent / "halloween-policyengine.mp4"

        # No framerate conversion needed - input and output both 30fps
        ffmpeg_cmd = [
            'ffmpeg', '-y', '-loglevel', 'warning', '-stats',
            '-framerate', str(fps),
            '-i', str(output_dir / 'frame_%04d.png'),
            '-c:v', 'libx264',
            '-profile:v', 'high',
            '-level', '4.0',
            '-pix_fmt', 'yuv420p',
            '-crf', '10',  # Maximum quality
            '-preset', 'slower',
            '-movflags', '+faststart',
            str(output_video)
        ]

        result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"FFmpeg error: {result.stderr}")
            raise Exception("FFmpeg failed")

        print(f"\n✓ Video created: {output_video}")

        # Get file size
        size_mb = output_video.stat().st_size / 1024 / 1024
        print(f"✓ File size: {size_mb:.1f} MB")
        print(f"✓ Duration: {duration}s at {fps}fps")

        # Clean up frames
        print("Cleaning up frames...")
        for frame in output_dir.glob("*.png"):
            frame.unlink()
        output_dir.rmdir()

        print("Done!")

if __name__ == "__main__":
    asyncio.run(capture_frames())
