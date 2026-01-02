#!/usr/bin/env python3
"""
Create a cinematic, genuinely spooky Halloween soundtrack.
More sophisticated sound design with layered atmospheric elements.
"""

import numpy as np
from scipy.io import wavfile
from pathlib import Path
import subprocess


def envelope(t, attack=0.1, decay=0.2, sustain_level=0.7, release=0.3):
    """Create an ADSR envelope for more natural sounds."""
    total = len(t)
    a_samples = int(attack * total)
    d_samples = int(decay * total)
    r_samples = int(release * total)
    s_samples = total - a_samples - d_samples - r_samples

    env = np.zeros(total)
    # Attack
    env[:a_samples] = np.linspace(0, 1, a_samples)
    # Decay
    env[a_samples : a_samples + d_samples] = np.linspace(
        1, sustain_level, d_samples
    )
    # Sustain
    env[a_samples + d_samples : a_samples + d_samples + s_samples] = (
        sustain_level
    )
    # Release
    env[-r_samples:] = np.linspace(sustain_level, 0, r_samples)

    return env


def generate_cinematic_spooky_soundtrack(duration=12, sample_rate=44100):
    """Generate a layered, cinematic Halloween soundtrack."""

    t = np.linspace(0, duration, int(sample_rate * duration))
    audio = np.zeros_like(t)

    # ===== LAYER 1: Sub-bass drone (tension builder) =====
    # Very low frequency that you feel more than hear
    sub_bass = 0.2 * np.sin(2 * np.pi * 45 * t)
    sub_bass += 0.15 * np.sin(
        2 * np.pi * 47 * t
    )  # Slight detuning for eeriness
    # Slow modulation for breathing effect
    sub_bass *= 0.7 + 0.3 * np.sin(2 * np.pi * 0.15 * t)
    audio += sub_bass

    # ===== LAYER 2: Distant church bell tolls =====
    bell_times = [1.0, 5.0, 9.0]  # Three bell tolls
    for bell_time in bell_times:
        bell_start = int(bell_time * sample_rate)
        bell_duration = int(2.5 * sample_rate)
        if bell_start + bell_duration < len(audio):
            bell_t = np.linspace(0, 2.5, bell_duration)
            # Bell has multiple harmonics
            bell_fundamental = 220  # Low A
            bell_sound = (
                0.3 * np.sin(2 * np.pi * bell_fundamental * bell_t)
                + 0.2 * np.sin(2 * np.pi * bell_fundamental * 2 * bell_t)
                + 0.15 * np.sin(2 * np.pi * bell_fundamental * 3 * bell_t)
                + 0.1
                * np.sin(
                    2 * np.pi * bell_fundamental * 4.2 * bell_t
                )  # Dissonant partial
            )
            # Long decay envelope
            bell_env = np.exp(-bell_t * 1.5)
            audio[bell_start : bell_start + bell_duration] += (
                bell_sound * bell_env * 0.4
            )

    # ===== LAYER 3: Creaking wood / door sounds =====
    creak_times = [2.5, 7.0]
    for creak_time in creak_times:
        creak_start = int(creak_time * sample_rate)
        creak_duration = int(0.8 * sample_rate)
        if creak_start + creak_duration < len(audio):
            creak_t = np.linspace(0, 0.8, creak_duration)
            # Creaking is a frequency sweep with noise
            creak_freq = 150 + 80 * np.sin(2 * np.pi * 3 * creak_t)
            creak_sound = 0.15 * np.sin(2 * np.pi * creak_freq * creak_t)
            # Add noise for wood texture
            creak_noise = 0.08 * np.random.randn(len(creak_t))
            creak_env = np.sin(np.pi * creak_t / 0.8)  # Bell curve
            audio[creak_start : creak_start + creak_duration] += (
                creak_sound + creak_noise
            ) * creak_env

    # ===== LAYER 4: Howling wind (constant, undulating) =====
    wind_low = (
        0.08
        * np.sin(2 * np.pi * 150 * t)
        * (0.5 + 0.5 * np.sin(2 * np.pi * 0.3 * t))
    )
    wind_high = (
        0.06
        * np.sin(2 * np.pi * 2500 * t)
        * (0.5 + 0.5 * np.sin(2 * np.pi * 0.4 * t))
    )
    wind_noise = 0.04 * np.random.randn(len(t))
    # Low-pass filter the wind noise (remove high frequencies)
    from scipy import signal

    b, a = signal.butter(4, 0.1)
    wind_noise_filtered = signal.filtfilt(b, a, wind_noise)
    audio += wind_low + wind_high + wind_noise_filtered

    # ===== LAYER 5: Ghostly choir (dissonant sustained notes) =====
    choir_times = [(3, 4), (8, 10)]  # (start, end) times
    for start_time, end_time in choir_times:
        choir_start = int(start_time * sample_rate)
        choir_duration = int((end_time - start_time) * sample_rate)
        if choir_start + choir_duration < len(audio):
            choir_t = np.linspace(0, end_time - start_time, choir_duration)
            # Minor chord with dissonant intervals
            choir_sound = (
                0.12 * np.sin(2 * np.pi * 220 * choir_t)  # A
                + 0.10 * np.sin(2 * np.pi * 261.63 * choir_t)  # C
                + 0.11 * np.sin(2 * np.pi * 329.63 * choir_t)  # E
                + 0.09 * np.sin(2 * np.pi * 415 * choir_t)  # G# (dissonant)
            )
            choir_env = envelope(
                choir_t, attack=0.3, decay=0.2, sustain_level=0.6, release=0.3
            )
            audio[choir_start : choir_start + choir_duration] += (
                choir_sound * choir_env
            )

    # ===== LAYER 6: Bat wing flaps (swooshing sounds) =====
    bat_times = [1.5, 4.2, 6.8, 10.5]
    for bat_time in bat_times:
        bat_start = int(bat_time * sample_rate)
        bat_duration = int(0.2 * sample_rate)
        if bat_start + bat_duration < len(audio):
            bat_t = np.linspace(0, 0.2, bat_duration)
            # Quick frequency sweep down
            bat_freq = 3000 - 2500 * (bat_t / 0.2) ** 2
            bat_env = np.sin(np.pi * bat_t / 0.2)
            bat_sound = 0.12 * np.sin(2 * np.pi * bat_freq * bat_t) * bat_env
            audio[bat_start : bat_start + bat_duration] += bat_sound

    # ===== LAYER 7: Footsteps approaching =====
    footstep_times = [0.5, 1.5, 2.5, 3.5]
    for step_time in footstep_times:
        step_start = int(step_time * sample_rate)
        step_duration = int(0.05 * sample_rate)
        if step_start + step_duration < len(audio):
            step_t = np.linspace(0, 0.05, step_duration)
            # Footstep is a quick low thud
            step_sound = 0.2 * np.sin(2 * np.pi * 80 * step_t)
            step_env = np.exp(-step_t * 30)
            audio[step_start : step_start + step_duration] += (
                step_sound * step_env
            )

    # ===== LAYER 8: Chains rattling =====
    chain_time = 6.5
    chain_start = int(chain_time * sample_rate)
    chain_duration = int(0.6 * sample_rate)
    if chain_start + chain_duration < len(audio):
        chain_t = np.linspace(0, 0.6, chain_duration)
        # Multiple high frequency impacts
        chain_sound = np.zeros_like(chain_t)
        for i in range(8):
            impact_pos = int(i * len(chain_t) / 8)
            impact_len = int(0.02 * sample_rate)
            if impact_pos + impact_len < len(chain_t):
                impact_t = np.linspace(0, 0.02, impact_len)
                impact = (
                    0.15
                    * np.sin(2 * np.pi * 2000 * impact_t)
                    * np.exp(-impact_t * 50)
                )
                chain_sound[impact_pos : impact_pos + impact_len] += impact
        audio[chain_start : chain_start + chain_duration] += chain_sound

    # ===== LAYER 9: Thunder rumble =====
    thunder_time = 10.5
    thunder_start = int(thunder_time * sample_rate)
    thunder_duration = int(1.2 * sample_rate)
    if thunder_start + thunder_duration < len(audio):
        thunder_t = np.linspace(0, 1.2, thunder_duration)
        # Thunder is low frequency with complex envelope
        thunder_sound = (
            0.3 * np.sin(2 * np.pi * 35 * thunder_t)
            + 0.2 * np.sin(2 * np.pi * 45 * thunder_t)
            + 0.15 * np.sin(2 * np.pi * 55 * thunder_t)
        )
        # Rumbling envelope
        thunder_env = np.exp(-((thunder_t - 0.4) ** 2) / 0.3)
        thunder_sound += 0.2 * np.random.randn(len(thunder_t)) * thunder_env
        audio[thunder_start : thunder_start + thunder_duration] += (
            thunder_sound * thunder_env
        )

    # Apply master fade in/out for looping
    fade_samples = int(1.5 * sample_rate)
    fade_in = (np.linspace(0, 1, fade_samples)) ** 1.5
    fade_out = (np.linspace(1, 0, fade_samples)) ** 1.5
    audio[:fade_samples] *= fade_in
    audio[-fade_samples:] *= fade_out

    # Normalize to prevent clipping
    audio = audio / np.max(np.abs(audio)) * 0.82

    # Convert to 16-bit PCM
    audio_int16 = (audio * 32767).astype(np.int16)

    return audio_int16, sample_rate


if __name__ == "__main__":
    print("Generating cinematic spooky soundtrack with multiple layers...")
    print("Layers: Sub-bass drone, church bells, creaking wood, howling wind,")
    print("        ghostly choir, bat swooshes, footsteps, chains, thunder")

    audio, sr = generate_cinematic_spooky_soundtrack(duration=12)

    output_path = Path(__file__).parent / "spooky-soundtrack-12s.wav"
    wavfile.write(output_path, sr, audio)

    print(f"\n✓ Soundtrack created: {output_path}")
    print(f"✓ Duration: 12 seconds")
    print(f"✓ Sample rate: {sr} Hz")

    # Combine with silent looped video
    print("\nCombining with silent looped video...")
    video_input = (
        Path.home() / "Desktop" / "halloween-policyengine-silent-looped.mp4"
    )
    video_output = (
        Path.home() / "Desktop" / "halloween-policyengine-spooky-looped.mp4"
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
        "256k",  # Higher quality audio
        "-shortest",
        str(video_output),
    ]

    result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
    if result.returncode == 0:
        size_mb = video_output.stat().st_size / 1024 / 1024
        print(f"\n✓ Video with cinematic spooky soundtrack: {video_output}")
        print(f"✓ File size: {size_mb:.1f} MB")
        print("\nOpening video...")
        subprocess.run(["open", "-a", "QuickTime Player", str(video_output)])
    else:
        print(f"Error: {result.stderr}")

    print("\nDone! Turn up the volume for full spooky effect! 🎃👻")
