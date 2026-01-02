#!/usr/bin/env python3
"""
Create a spooky Halloween soundtrack using audio synthesis.
Requires: pip install numpy scipy
"""

import numpy as np
from scipy.io import wavfile
from pathlib import Path
import subprocess


def generate_spooky_soundtrack(duration=6, sample_rate=44100):
    """Generate a cinematic Halloween soundtrack."""

    t = np.linspace(0, duration, int(sample_rate * duration))

    # Deep ominous bass drone (50Hz)
    bass = 0.25 * np.sin(2 * np.pi * 50 * t)

    # Add subtle bass harmonic
    bass += 0.15 * np.sin(2 * np.pi * 100 * t)

    # Creepy minor chord progression (like a music box)
    # Start with quiet eerie melody
    melody = np.zeros_like(t)

    # Use notes from a minor scale: A, C, E (spooky intervals)
    notes = [220, 261.63, 329.63, 440, 523.25]  # A3, C4, E4, A4, C5
    note_duration = duration / 5

    for i, freq in enumerate(notes):
        start = int(i * note_duration * sample_rate)
        end = int((i + 1) * note_duration * sample_rate)
        note_t = t[start:end] - t[start]
        # Piano-like envelope: quick attack, slow decay
        envelope = np.exp(-note_t * 2)
        melody[start:end] = 0.2 * np.sin(2 * np.pi * freq * note_t) * envelope

    # Add subtle wind howling
    wind = (
        0.08
        * np.sin(2 * np.pi * 1500 * t)
        * (0.5 + 0.5 * np.sin(2 * np.pi * 0.5 * t))
    )

    # Very subtle atmospheric noise
    noise = 0.03 * np.random.randn(len(t))

    # Occasional "swoosh" sound (like something flying by)
    swoosh = np.zeros_like(t)
    swoosh_times = [1.5, 4.0]  # Two swooshes
    for swoosh_time in swoosh_times:
        swoosh_start = int(swoosh_time * sample_rate)
        swoosh_duration = int(0.3 * sample_rate)
        if swoosh_start + swoosh_duration < len(swoosh):
            swoosh_t = np.linspace(0, 0.3, swoosh_duration)
            # Descending frequency sweep
            sweep_freq = 2000 - 1500 * swoosh_t / 0.3
            swoosh_env = np.sin(np.pi * swoosh_t / 0.3)  # Bell-shaped envelope
            swoosh[swoosh_start : swoosh_start + swoosh_duration] = (
                0.15 * np.sin(2 * np.pi * sweep_freq * swoosh_t) * swoosh_env
            )

    # Combine all elements
    audio = bass + melody + wind + noise + swoosh

    # Apply gentle fade in/out for seamless looping
    fade_samples = int(1.0 * sample_rate)
    fade_in = np.linspace(0, 1, fade_samples) ** 2
    fade_out = np.linspace(1, 0, fade_samples) ** 2
    audio[:fade_samples] *= fade_in
    audio[-fade_samples:] *= fade_out

    # Normalize to prevent clipping
    audio = audio / np.max(np.abs(audio)) * 0.85

    # Convert to 16-bit PCM
    audio_int16 = (audio * 32767).astype(np.int16)

    return audio_int16, sample_rate


if __name__ == "__main__":
    print("Generating spooky soundtrack...")
    audio, sr = generate_spooky_soundtrack(duration=6)

    output_path = Path(__file__).parent / "spooky-soundtrack.wav"
    wavfile.write(output_path, sr, audio)

    print(f"✓ Soundtrack created: {output_path}")
    print(f"✓ Duration: 6 seconds")
    print(f"✓ Sample rate: {sr} Hz")

    # Now combine with SILENT video
    print("\nCombining with silent video...")
    video_input = Path.home() / "Desktop" / "halloween-policyengine-silent.mp4"
    video_output = (
        Path.home() / "Desktop" / "halloween-policyengine-spooky.mp4"
    )

    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-i",
        str(video_input),
        "-i",
        str(output_path),
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-shortest",
        str(video_output),
    ]

    result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
    if result.returncode == 0:
        size_mb = video_output.stat().st_size / 1024 / 1024
        print(f"✓ Video with spooky soundtrack: {video_output}")
        print(f"✓ File size: {size_mb:.1f} MB")
        print("\nOpening video...")
        subprocess.run(["open", "-a", "QuickTime Player", str(video_output)])
    else:
        print(f"Error: {result.stderr}")

    print("\nDone!")
