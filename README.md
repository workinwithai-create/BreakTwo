# BreakTwo

Two-bar live drum-break desk for bedroom producers and AI-music finishers.

Suno and loop DAWs restart the chorus on the same kick. The song never finishes because the return is not earned. Session players write two bars — tom run, snare press, stop hit, bass walk, nylon pick, brass stab, violin hold — then the hook is allowed back on bar 9.

Live samples only: FluidR3 acoustic grand, upright bass, nylon guitar, trumpet, violin, and an acoustic kit (kick, snare, hi-hat, crash, high tom, mid tom, floor tom). CDN URLs are pinned to PreEight commit `d58301e4a494555f411a2afbc448b724136eee76`. No branch-tip sample URLs. No oscillators.

This desk is free.

## Distinct from the line

| Tool | Job |
| --- | --- |
| LandFour | Cadence so a loop can sit down (yesterday) |
| TagFour | Four-bar last-line tag after the money chorus |
| LiftTwo | Two bars of production lift |
| PreEight | Eight-bar musical climb into the hook |
| AfterHook | Eight bars after the hook |
| EndEight | Last eight bars of the record |
| LastHook | Last chorus is not a photocopy |
| HalfFour | Four-bar half-time chorus |
| BreathFour | Four-bar exhale between chorus and verse |
| ShakeFour | Shaker lift, not a break |
| **BreakTwo** | Two bars that earn the chorus return |

## Pricing recommendation

One-time **$19** on Lemon Squeezy. Mirror on Gumroad. Do not subscribe. Forge Pass stays the meter for cloud tools (AuraMix, MixForge, ReleaseForge). A finite desk is a tool, not a seat.

The shipped app is free. No license gate.

## Loop

1. Type BPM (60–180), key, and four chords. They persist in localStorage and drive playback and export.
2. Hear A: the cold chorus. It loops.
3. Stamp a break.
4. Hear B: six bars of chorus, two of break, then stop. The hook would start on bar 9.
5. Export WAV (48 kHz, 24-bit, folded tail, peak at or below −1 dBFS) and matching MIDI, one track per chair.

Space is not bound. Dock buttons play.

## Engine

Lookahead scheduler on the AudioContext clock (`LOOKAHEAD_MS = 25`, `SCHEDULE_AHEAD = 0.12`). Live recipe, mutes, tempo, and key apply on the next step. Stop kills active sources. Hidden tab stops cleanly.
