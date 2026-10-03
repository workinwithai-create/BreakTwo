/* BreakTwo — two-bar live drum-break desk.
   Samples pinned to PreEight commit SHA. Branch tips are not used. */
const SHA = "d58301e4a494555f411a2afbc448b724136eee76";
const CDN = "https://cdn.jsdelivr.net/gh/workinwithai-create/PreEight@" + SHA + "/public/samples";
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.12;
const SR = 48000;
const TAIL = 1.2;

const FILES = [
  ["kick", "drums/kick.mp3", "kick"],
  ["snare", "drums/snare.mp3", "snare"],
  ["hat", "drums/hihat.mp3", "hi-hat"],
  ["crash", "drums/crash.mp3", "crash"],
  ["tom1", "drums/tom1.mp3", "high tom"],
  ["tom2", "drums/tom2.mp3", "mid tom"],
  ["tom3", "drums/tom3.mp3", "floor tom"],
  ["pC2", "piano/C2.mp3", "piano"], ["pE2", "piano/E2.mp3", "piano"], ["pG2", "piano/G2.mp3", "piano"],
  ["pA2", "piano/A2.mp3", "piano"], ["pBb2", "piano/Bb2.mp3", "piano"], ["pC3", "piano/C3.mp3", "piano"],
  ["pDb3", "piano/Db3.mp3", "piano"], ["pE3", "piano/E3.mp3", "piano"], ["pG3", "piano/G3.mp3", "piano"],
  ["pAb3", "piano/Ab3.mp3", "piano"], ["pA3", "piano/A3.mp3", "piano"], ["pBb3", "piano/Bb3.mp3", "piano"],
  ["pC4", "piano/C4.mp3", "piano"], ["pDb4", "piano/Db4.mp3", "piano"], ["pE4", "piano/E4.mp3", "piano"],
  ["pGb4", "piano/Gb4.mp3", "piano"], ["pG4", "piano/G4.mp3", "piano"], ["pA4", "piano/A4.mp3", "piano"],
  ["pBb4", "piano/Bb4.mp3", "piano"], ["pC5", "piano/C5.mp3", "piano"], ["pE5", "piano/E5.mp3", "piano"],
  ["pG5", "piano/G5.mp3", "piano"], ["pC6", "piano/C6.mp3", "piano"],
  ["bE1", "bass/E1.mp3", "upright bass"], ["bG1", "bass/G1.mp3", "upright bass"], ["bA1", "bass/A1.mp3", "upright bass"],
  ["bBb1", "bass/Bb1.mp3", "upright bass"], ["bC2", "bass/C2.mp3", "upright bass"], ["bE2", "bass/E2.mp3", "upright bass"],
  ["bG2", "bass/G2.mp3", "upright bass"], ["bA2", "bass/A2.mp3", "upright bass"], ["bBb2", "bass/Bb2.mp3", "upright bass"],
  ["bC3", "bass/C3.mp3", "upright bass"], ["bE3", "bass/E3.mp3", "upright bass"], ["bG3", "bass/G3.mp3", "upright bass"],
  ["gE2", "guitar/E2.mp3", "nylon guitar"], ["gA2", "guitar/A2.mp3", "nylon guitar"], ["gB2", "guitar/B2.mp3", "nylon guitar"],
  ["gD3", "guitar/D3.mp3", "nylon guitar"], ["gE3", "guitar/E3.mp3", "nylon guitar"], ["gG3", "guitar/G3.mp3", "nylon guitar"],
  ["gA3", "guitar/A3.mp3", "nylon guitar"], ["gB3", "guitar/B3.mp3", "nylon guitar"], ["gD4", "guitar/D4.mp3", "nylon guitar"],
  ["gE4", "guitar/E4.mp3", "nylon guitar"], ["gG4", "guitar/G4.mp3", "nylon guitar"], ["gA4", "guitar/A4.mp3", "nylon guitar"],
  ["gB4", "guitar/B4.mp3", "nylon guitar"], ["gE5", "guitar/E5.mp3", "nylon guitar"],
  ["tG3", "trumpet/G3.mp3", "trumpet"], ["tA3", "trumpet/A3.mp3", "trumpet"], ["tC4", "trumpet/C4.mp3", "trumpet"],
  ["tE4", "trumpet/E4.mp3", "trumpet"], ["tG4", "trumpet/G4.mp3", "trumpet"], ["tA4", "trumpet/A4.mp3", "trumpet"],
  ["tC5", "trumpet/C5.mp3", "trumpet"], ["tE5", "trumpet/E5.mp3", "trumpet"], ["tG5", "trumpet/G5.mp3", "trumpet"],
  ["vG3", "violin/G3.mp3", "violin"], ["vA3", "violin/A3.mp3", "violin"], ["vC4", "violin/C4.mp3", "violin"],
  ["vE4", "violin/E4.mp3", "violin"], ["vA4", "violin/A4.mp3", "violin"], ["vC5", "violin/C5.mp3", "violin"],
  ["vE5", "violin/E5.mp3", "violin"]
];

const BANKS = {
  piano: [["pC2", 36], ["pE2", 40], ["pG2", 43], ["pA2", 45], ["pBb2", 46], ["pC3", 48], ["pDb3", 49], ["pE3", 52], ["pG3", 55], ["pAb3", 56], ["pA3", 57], ["pBb3", 58], ["pC4", 60], ["pDb4", 61], ["pE4", 64], ["pGb4", 66], ["pG4", 67], ["pA4", 69], ["pBb4", 70], ["pC5", 72], ["pE5", 76], ["pG5", 79], ["pC6", 84]],
  bass: [["bE1", 28], ["bG1", 31], ["bA1", 33], ["bBb1", 34], ["bC2", 36], ["bE2", 40], ["bG2", 43], ["bA2", 45], ["bBb2", 46], ["bC3", 48], ["bE3", 52], ["bG3", 55]],
  nylon: [["gE2", 40], ["gA2", 45], ["gB2", 47], ["gD3", 50], ["gE3", 52], ["gG3", 55], ["gA3", 57], ["gB3", 59], ["gD4", 62], ["gE4", 64], ["gG4", 67], ["gA4", 69], ["gB4", 71], ["gE5", 76]],
  trumpet: [["tG3", 55], ["tA3", 57], ["tC4", 60], ["tE4", 64], ["tG4", 67], ["tA4", 69], ["tC5", 72], ["tE5", 76], ["tG5", 79]],
  violin: [["vG3", 55], ["vA3", 57], ["vC4", 60], ["vE4", 64], ["vA4", 69], ["vC5", 72], ["vE5", 76]]
};

const KEYS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const NOTE = { C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11 };
const NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const RECIPES = [
  { id: "tom-run", name: "Tom run", blurb: "Floor tom to high tom across the two bars. Snare on the last eighth. No crash on the return." },
  { id: "snare-press", name: "Snare press", blurb: "Sixteenth snare from bar 7 beat 3. Hats die. Kick only on the pickup." },
  { id: "stop-hit", name: "Stop hit", blurb: "One hit, then air. Three kicks into bar 9." },
  { id: "hat-choke", name: "Hat choke", blurb: "Open hat on the and, closed on the beat. Kit stays, bass walks." },
  { id: "bass-walk", name: "Bass walk", blurb: "Upright walks 5–6–7 into the return root. Kit is quarters only." },
  { id: "nylon-pick", name: "Nylon pick", blurb: "Nylon answers the last chord. Drums stop after beat 1." },
  { id: "brass-stab", name: "Brass stab", blurb: "Trumpet on the and of 4 in bar 8. Kit is a stop." },
  { id: "violin-hold", name: "Violin hold", blurb: "Violin holds the fifth for both bars. That is the sustain check." },
  { id: "kick-pickup", name: "Kick pickup", blurb: "Silence, then three kicks. The chorus earns the downbeat." },
  { id: "crash-cut", name: "Crash cut", blurb: "Crash on bar 7 beat 1 only. Toms finish. No second crash." }
];

const CHAIRS = ["kick", "snare", "hat", "toms", "piano", "bass", "nylon", "trumpet", "violin"];

const state = {
  bpm: 96,
  key: "A",
  chords: ["Am", "F", "C", "G"],
  recipe: "tom-run",
  mutes: { kick: false, snare: false, hat: false, toms: false, piano: false, bass: false, nylon: false, trumpet: false, violin: false },
  mode: "B",
  playing: false
};

let ctx = null;
let master = null;
let chairGain = {};
let raw = {};
let decoded = {};
let missing = [];
let active = [];
let midiNotes = [];
let nextStepTime = 0;
let step = 0;
let origin = 0;
let timerId = 0;
let rafId = 0;
let ready = false;

function $(id) { return document.getElementById(id); }

function loadStore() {
  try {
    const s = JSON.parse(localStorage.getItem("breaktwo-v1") || "{}");
    if (s.bpm) state.bpm = clamp(s.bpm, 60, 180);
    if (s.key) state.key = s.key;
    if (Array.isArray(s.chords) && s.chords.length === 4) state.chords = s.chords;
    if (s.recipe) state.recipe = s.recipe;
    if (s.mutes) state.mutes = Object.assign(state.mutes, s.mutes);
  } catch (e) { /* keep defaults */ }
}
function saveStore() {
  localStorage.setItem("breaktwo-v1", JSON.stringify({
    bpm: state.bpm, key: state.key, chords: state.chords, recipe: state.recipe, mutes: state.mutes
  }));
}
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function parseChord(sym) {
  const m = String(sym).trim().match(/^([A-G](?:#|b)?)(.*)$/i);
  if (!m) return { root: 0, minor: false, dim: false, symbol: "C" };
  const name = m[1][0].toUpperCase() + m[1].slice(1).replace("B", "b");
  const root = NOTE[name] != null ? NOTE[name] : NOTE[m[1][0].toUpperCase()];
  const rest = m[2];
  const minor = /^m(?!aj)/i.test(rest);
  const dim = /dim|°/.test(rest);
  return { root, minor, dim, symbol: sym.trim() };
}
function transposeSemis() {
  const k = NOTE[state.key] != null ? NOTE[state.key] : 9;
  return k - 9; /* presets written in A */
}
function tones(ch, add) {
  const r = (ch.root + add + 120) % 12;
  const third = ch.minor || ch.dim ? 3 : 4;
  const fifth = ch.dim ? 6 : 7;
  return [r, (r + third) % 12, (r + fifth) % 12];
}
function midiNear(pc, center) {
  let best = center;
  let d = 99;
  for (let o = -2; o <= 2; o++) {
    const m = pc + 12 * o + Math.round((center - pc) / 12) * 12;
    const cand = pc + 12 * (Math.round((center - pc) / 12) + o);
    const dist = Math.abs(cand - center);
    if (dist < d) { d = dist; best = cand; }
  }
  return best;
}
function pick(bank, midi, lo, hi) {
  let m = midi;
  while (m < lo) m += 12;
  while (m > hi) m -= 12;
  let best = bank[0];
  let bd = 99;
  for (const pair of bank) {
    const dist = Math.abs(pair[1] - m);
    if (dist < bd) { bd = dist; best = pair; }
  }
  if (bd > 4) {
    const shift = m > best[1] ? -12 : 12;
    m += shift;
    bd = 99;
    for (const pair of bank) {
      const dist = Math.abs(pair[1] - m);
      if (dist < bd) { bd = dist; best = pair; }
    }
  }
  const rate = Math.pow(2, (m - best[1]) / 12);
  return { key: best[0], rate: clamp(rate, Math.pow(2, -4 / 12), Math.pow(2, 4 / 12)), midi: m };
}

function chordAt(bar) {
  const list = state.chords.length === 4 ? state.chords : ["Am", "F", "C", "G"];
  return parseChord(list[bar % 4]);
}
function inBreak(bar, mode) {
  if (mode === "break") return true;
  if (mode === "B") return bar >= 6;
  return false;
}
function formBars(mode) { return mode === "break" ? 2 : 8; }

function recipeHits(recipe, bar, six, mode) {
  const brk = inBreak(bar, mode);
  const local = mode === "break" ? bar : bar - 6;
  const hits = [];
  const add = (chair, when16, extra) => hits.push(Object.assign({ chair, when16 }, extra || {}));
  if (!brk) {
    if (six % 4 === 0) add("kick", 0);
    if (six === 4 || six === 12) add("snare", 0);
    if (six % 2 === 0) add("hat", 0, { gain: six % 4 === 0 ? 0.22 : 0.14 });
    if (six % 4 === 0) add("bass", 0, { role: "root" });
    if (six === 0 || six === 8) add("piano", 0, { role: "chord", dur: 1.6 });
    if (six === 0) add("nylon", 0, { role: "chord", dur: 1.4, gain: 0.28 });
    if (six === 0 && bar % 4 === 0) add("violin", 0, { role: "fifth", dur: 3.2, gain: 0.16 });
    return hits;
  }
  if (recipe === "tom-run") {
    const map = [0, 2, 4, 6, 8, 10, 12, 14];
    if (map.indexOf(six) >= 0) add("toms", 0, { tom: local === 0 ? (six < 8 ? "tom3" : "tom2") : (six < 8 ? "tom2" : "tom1") });
    if (local === 1 && six === 14) add("snare", 0);
    if (six % 4 === 0) add("bass", 0, { role: "walk" });
    if (six === 0) add("piano", 0, { role: "shell", dur: 3.5 });
    if (six === 0) add("violin", 0, { role: "fifth", dur: 7.2, gain: 0.2 });
  } else if (recipe === "snare-press") {
    if (local === 1 || (local === 0 && six >= 8)) add("snare", 0, { gain: 0.18 + six * 0.02 });
    if (local === 1 && (six === 12 || six === 14)) add("kick", 0);
    if (six === 0) add("bass", 0, { role: "root", dur: 3 });
    if (six === 0) add("piano", 0, { role: "shell", dur: 6 });
  } else if (recipe === "stop-hit") {
    if (local === 0 && six === 0) add("snare", 0, { gain: 0.7 });
    if (local === 0 && six === 0) add("kick", 0);
    if (local === 1 && (six === 10 || six === 12 || six === 14)) add("kick", 0);
    if (six === 0) add("piano", 0, { role: "shell", dur: 5.5 });
    if (six === 0) add("violin", 0, { role: "fifth", dur: 7.5, gain: 0.22 });
  } else if (recipe === "hat-choke") {
    if (six % 2 === 0) add("hat", 0, { gain: 0.2 });
    if (six % 4 === 2) add("hat", 0, { open: true, gain: 0.16 });
    if (six % 4 === 0) add("kick", 0);
    if (six === 4 || six === 12) add("snare", 0, { gain: 0.35 });
    if (six % 4 === 0) add("bass", 0, { role: "walk" });
    if (six === 0) add("piano", 0, { role: "chord", dur: 3.2 });
  } else if (recipe === "bass-walk") {
    if (six % 4 === 0) add("kick", 0, { gain: 0.4 });
    if (six % 2 === 0) add("bass", 0, { role: "walk" });
    if (six === 0) add("piano", 0, { role: "shell", dur: 6.5 });
    if (six === 0) add("nylon", 0, { role: "fifth", dur: 3, gain: 0.22 });
    if (six === 0) add("violin", 0, { role: "fifth", dur: 7.5, gain: 0.18 });
  } else if (recipe === "nylon-pick") {
    if (local === 0 && six === 0) add("kick", 0);
    if (local === 0 && six === 0) add("snare", 0);
    if (six % 2 === 0) add("nylon", 0, { role: six % 4 === 0 ? "root" : "third", gain: 0.4 });
    if (six === 0) add("piano", 0, { role: "shell", dur: 6 });
    if (six === 0) add("violin", 0, { role: "fifth", dur: 7.2, gain: 0.18 });
  } else if (recipe === "brass-stab") {
    if (local === 0 && six === 0) add("kick", 0);
    if (local === 0 && six === 0) add("crash", 0, { gain: 0.35 });
    if (local === 1 && six === 14) add("trumpet", 0, { role: "root", dur: 0.35, gain: 0.45 });
    if (local === 1 && six === 12) add("kick", 0);
    if (six === 0) add("piano", 0, { role: "shell", dur: 5 });
    if (six === 0) add("violin", 0, { role: "fifth", dur: 7, gain: 0.16 });
  } else if (recipe === "violin-hold") {
    if (six === 0 && local === 0) add("violin", 0, { role: "fifth", dur: 7.8, gain: 0.34, swell: true });
    if (six === 0) add("piano", 0, { role: "shell", dur: 7.4, gain: 0.28 });
    if (local === 0 && six === 0) add("bass", 0, { role: "root", dur: 3.5 });
    if (local === 1 && six === 12) add("kick", 0, { gain: 0.35 });
  } else if (recipe === "kick-pickup") {
    if (local === 1 && (six === 8 || six === 12 || six === 14)) add("kick", 0);
    if (six === 0) add("piano", 0, { role: "shell", dur: 6.5 });
    if (six === 0) add("violin", 0, { role: "fifth", dur: 7.4, gain: 0.2 });
    if (six === 0) add("bass", 0, { role: "root", dur: 2 });
  } else if (recipe === "crash-cut") {
    if (local === 0 && six === 0) add("crash", 0, { gain: 0.4 });
    if (local === 0 && six === 0) add("kick", 0);
    const seq = ["tom3", "tom3", "tom2", "tom2", "tom1", "tom1"];
    if (local === 1 && six % 2 === 0 && six < 12) add("toms", 0, { tom: seq[six / 2] });
    if (six === 0) add("piano", 0, { role: "shell", dur: 4 });
    if (six === 0) add("violin", 0, { role: "fifth", dur: 6.5, gain: 0.18 });
  }
  return hits;
}

function degreeMidi(ch, role, add) {
  const t = tones(ch, add);
  if (role === "third") return t[1];
  if (role === "fifth") return t[2];
  if (role === "walk") return t[0];
  return t[0];
}

function scheduleStep(stepIndex, when, ac, bag, notes, mode) {
  const use = mode || state.mode;
  const bars = formBars(use);
  const bar = Math.floor(stepIndex / 16);
  if (bar >= bars) return;
  const six = stepIndex % 16;
  const ch = chordAt(use === "break" ? bar : bar % 4);
  const add = transposeSemis();
  const recipe = state.recipe;
  const stepDur = 60 / state.bpm / 4;
  const hits = recipeHits(recipe, bar, six, use);
  hits.forEach((h) => {
    if (state.mutes[h.chair]) return;
    const t = when + (h.when16 || 0) * 0;
    if (h.chair === "kick") voiceDrum(ac, bag, "kick", t, h.gain || 0.72, notes, 36);
    else if (h.chair === "snare") voiceDrum(ac, bag, "snare", t, h.gain || 0.55, notes, 38);
    else if (h.chair === "hat") voiceDrum(ac, bag, "hat", t, h.gain || 0.18, notes, h.open ? 46 : 42);
    else if (h.chair === "crash") voiceDrum(ac, bag, "crash", t, h.gain || 0.4, notes, 49);
    else if (h.chair === "toms") voiceDrum(ac, bag, h.tom || "tom2", t, h.gain || 0.5, notes, h.tom === "tom1" ? 48 : h.tom === "tom3" ? 41 : 45);
    else if (h.chair === "bass") voiceMel(ac, bag, "bass", degreeMidi(ch, h.role === "walk" ? walkPc(bar, six, ch, add) : "root", add), t, h.dur || 0.32, h.gain || 0.5, notes, "bass", 40, 28, 55);
    else if (h.chair === "piano") voiceChord(ac, bag, ch, add, t, h.dur || 1.4, h.gain || 0.32, notes, h.role === "shell");
    else if (h.chair === "nylon") voiceMel(ac, bag, "nylon", degreeMidi(ch, h.role || "root", add), t, h.dur || 0.45, h.gain || 0.32, notes, "nylon", 64, 40, 76);
    else if (h.chair === "trumpet") voiceMel(ac, bag, "trumpet", degreeMidi(ch, h.role || "root", add), t, h.dur || 0.4, h.gain || 0.36, notes, "trumpet", 67, 55, 79);
    else if (h.chair === "violin") voiceHold(ac, bag, "violin", degreeMidi(ch, "fifth", add), t, h.dur || 3, h.gain || 0.22, notes, !!h.swell);
  });
}

function walkPc(bar, six, ch, add) {
  const root = (ch.root + add + 120) % 12;
  const seq = [0, 2, 4, 5, 7, 9, 10, 11];
  const idx = Math.floor(six / 2) % seq.length;
  return { root: (root + seq[idx]) % 12, minor: false, dim: false };
}
function degreeMidi(ch, role, add) {
  if (role && typeof role === "object") return role.root;
  const t = tones(ch, add);
  if (role === "third") return t[1];
  if (role === "fifth") return t[2];
  return t[0];
}

function voiceDrum(ac, bag, key, when, gain, notes, midi) {
  const buf = bag[key];
  if (!buf) return;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const g = ac.createGain();
  g.gain.setValueAtTime(gain, when);
  g.gain.linearRampToValueAtTime(0.0001, when + Math.min(buf.duration, 0.8));
  src.connect(g);
  g.connect(chairGainFor(ac, key.startsWith("tom") ? "toms" : key === "crash" ? "snare" : key));
  src.start(when);
  src.stop(when + buf.duration + 0.02);
  track(src);
  if (notes) notes.push({ chair: key.startsWith("tom") ? "toms" : key, midi, when, dur: 0.1, vel: Math.round(gain * 100) });
}
function chairGainFor(ac, chair) {
  if (ac.__chairs && ac.__chairs[chair]) return ac.__chairs[chair];
  return chairGain[chair] || master;
}
function voiceMel(ac, bag, bank, pc, when, dur, gain, notes, chair, center, lo, hi) {
  const m = midiNear(pc, center);
  const p = pick(BANKS[bank], m, lo, hi);
  playSample(ac, bag, p.key, when, dur, gain, p.rate, chair, false);
  if (notes) notes.push({ chair, midi: p.midi, when, dur, vel: Math.round(gain * 110) });
}
function voiceChord(ac, bag, ch, add, when, dur, gain, notes, shell) {
  const t = tones(ch, add);
  const pcs = shell ? [t[0], t[2]] : t;
  pcs.forEach((pc, i) => {
    const center = 60 + i * 3;
    const p = pick(BANKS.piano, midiNear(pc, center), 36, 84);
    playSample(ac, bag, p.key, when, dur, gain * (shell ? 0.7 : 0.55), p.rate, "piano", false);
    if (notes) notes.push({ chair: "piano", midi: p.midi, when, dur, vel: 70 });
  });
}
function voiceHold(ac, bag, bank, pc, when, dur, gain, notes, swell) {
  const p = pick(BANKS[bank], midiNear(pc, 64), 55, 76);
  playSample(ac, bag, p.key, when, dur, gain, p.rate, "violin", swell);
  if (notes) notes.push({ chair: "violin", midi: p.midi, when, dur, vel: Math.round(gain * 100) });
}
function playSample(ac, bag, key, when, dur, gain, rate, chair, swell) {
  const buf = bag[key];
  if (!buf) return;
  const slice = 0.28;
  const n = Math.max(1, Math.ceil(dur / slice));
  for (let i = 0; i < n; i++) {
    const t0 = when + i * slice;
    if (t0 >= when + dur) break;
    const src = ac.createBufferSource();
    src.buffer = buf;
    src.playbackRate.setValueAtTime(rate, t0);
    const g = ac.createGain();
    const peak = swell ? gain * (0.25 + 0.75 * ((t0 - when) / dur)) : gain;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + 0.02);
    const end = Math.min(t0 + slice, when + dur);
    g.gain.setValueAtTime(peak, Math.max(t0 + 0.03, end - 0.02));
    g.gain.linearRampToValueAtTime(0.0001, end + 0.012);
    src.connect(g);
    g.connect(chairGainFor(ac, chair));
    src.start(t0);
    src.stop(end + 0.03);
    track(src);
  }
}
function track(src) {
  active.push(src);
  src.onended = () => { active = active.filter((s) => s !== src); };
}

function ensureGraph(ac) {
  const bus = ac.createGain();
  bus.gain.value = 0.9;
  const comp = ac.createDynamicsCompressor();
  comp.threshold.value = -8;
  comp.knee.value = 6;
  comp.ratio.value = 4;
  comp.attack.value = 0.003;
  comp.release.value = 0.2;
  bus.connect(comp);
  comp.connect(ac.destination);
  const chairs = {};
  CHAIRS.forEach((c) => {
    const g = ac.createGain();
    g.gain.value = c === "hat" ? 0.7 : 0.85;
    g.connect(bus);
    chairs[c] = g;
  });
  ac.__chairs = chairs;
  return chairs;
}

async function boot() {
  if (ctx) return;
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0.9;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -8;
  comp.knee.value = 6;
  comp.ratio.value = 4;
  comp.attack.value = 0.003;
  comp.release.value = 0.2;
  master.connect(comp);
  comp.connect(ctx.destination);
  CHAIRS.forEach((c) => {
    const g = ctx.createGain();
    g.gain.value = 0.85;
    g.connect(master);
    chairGain[c] = g;
  });
  missing = [];
  let n = 0;
  for (const row of FILES) {
    n++;
    $("status").textContent = "Seating chairs " + n + "/" + FILES.length;
    try {
      const res = await fetch(CDN + "/" + row[1]);
      if (!res.ok) throw new Error(String(res.status));
      const ab = await res.arrayBuffer();
      raw[row[0]] = ab;
      decoded[row[0]] = await ctx.decodeAudioData(ab.slice(0));
    } catch (e) {
      missing.push(row[2] + " (" + row[0] + ")");
    }
  }
  if (missing.length) {
    ready = false;
    $("status").textContent = "Missing instruments: " + Array.from(new Set(missing)).join(", ");
    return;
  }
  ready = true;
  $("status").textContent = "Chairs seated · FluidR3 pinned " + SHA.slice(0, 7);
}

function scheduler() {
  if (!ctx || !state.playing) return;
  while (nextStepTime < ctx.currentTime + SCHEDULE_AHEAD) {
    scheduleStep(step, nextStepTime, ctx, decoded, null, state.mode);
    const stepDur = 60 / state.bpm / 4;
    nextStepTime += stepDur;
    step += 1;
    const total = formBars(state.mode) * 16;
    if (step >= total) {
      if (state.mode === "A") step = 0;
      else {
        clearInterval(timerId);
        timerId = 0;
        state.playing = false;
        break;
      }
    }
  }
}
function start(mode) {
  if (!ready) {
    $("status").textContent = missing.length ? "Missing instruments: " + Array.from(new Set(missing)).join(", ") : "Tap to start audio";
    return;
  }
  stopSources();
  state.mode = mode;
  state.playing = true;
  nextStepTime = ctx.currentTime + 0.1;
  origin = nextStepTime;
  step = 0;
  if (timerId) clearInterval(timerId);
  timerId = setInterval(scheduler, LOOKAHEAD_MS);
  if (!rafId) rafId = requestAnimationFrame(paint);
  $("status").textContent = mode === "A" ? "Looping the cold chorus" : mode === "B" ? "Chorus, then the break" : "Break only";
}
function stopSources() {
  active.forEach((s) => { try { s.stop(); } catch (e) { /* already ended */ } });
  active = [];
}
function stop() {
  state.playing = false;
  if (timerId) clearInterval(timerId);
  timerId = 0;
  stopSources();
  $("status").textContent = ready ? "Stopped" : $("status").textContent;
}
function paint() {
  rafId = requestAnimationFrame(paint);
  if (!ctx || !state.playing) {
    $("playhead").style.width = "0%";
    return;
  }
  const bars = formBars(state.mode);
  const elapsed = ctx.currentTime - origin;
  const barDur = 60 / state.bpm;
  const pos = state.mode === "A" ? (elapsed / barDur) % bars : Math.min(bars, elapsed / barDur);
  $("playhead").style.width = (pos / bars) * 100 + "%";
  document.querySelectorAll(".bar").forEach((el, i) => {
    el.classList.toggle("now", Math.floor(pos) === i);
  });
}

function decodeAll(ac) {
  const jobs = Object.keys(raw).map(async (k) => {
    decodedOffline[k] = await ac.decodeAudioData(raw[k].slice(0));
  });
  return Promise.all(jobs);
}
const decodedOffline = {};

async function exportWav(withTail) {
  if (!ready) return;
  stop();
  const mode = state.mode === "break" ? "break" : "B";
  const bars = 8;
  const length = Math.round(bars * 4 * 60 / state.bpm * SR);
  const tailSamples = Math.round(TAIL * SR);
  const off = new OfflineAudioContext(2, length + tailSamples, SR);
  ensureGraph(off);
  await decodeAll(off);
  const notes = [];
  for (let s = 0; s < bars * 16; s++) {
    const t = s * (60 / state.bpm / 4);
    scheduleStep(s, t, off, decodedOffline, notes, mode);
  }
  midiNotes = notes;
  const rendered = await off.startRendering();
  const folded = mixFold(rendered, length, tailSamples);
  const peak = peakOf(folded);
  const scale = peak > 0 ? Math.min(1, Math.pow(10, -1 / 20) / peak) : 1;
  const name = fileBase();
  download(name + ".wav", wav24(folded, scale, length));
  if (withTail) download(name + "-with-tail.wav", wav24(rendered, scale, length + tailSamples));
  $("status").textContent = "WAV " + length + " samples · peak scaled to -1 dBFS";
}
function mixFold(buf, length, tail) {
  const L = new Float32Array(length);
  const R = new Float32Array(length);
  const l = buf.getChannelData(0);
  const r = buf.getChannelData(1);
  for (let i = 0; i < length; i++) { L[i] = l[i]; R[i] = r[i]; }
  for (let i = 0; i < tail && i < length; i++) {
    L[i] += l[length + i] || 0;
    R[i] += r[length + i] || 0;
  }
  return { L, R, sampleRate: buf.sampleRate };
}
function peakOf(fold) {
  let p = 0;
  for (let i = 0; i < fold.L.length; i++) {
    p = Math.max(p, Math.abs(fold.L[i]), Math.abs(fold.R[i]));
  }
  return p;
}
function wav24(foldOrBuf, scale, frames) {
  const L = foldOrBuf.L || foldOrBuf.getChannelData(0);
  const R = foldOrBuf.R || foldOrBuf.getChannelData(1);
  const block = 6;
  const dataSize = frames * block;
  const ab = new ArrayBuffer(44 + dataSize);
  const v = new DataView(ab);
  writeStr(v, 0, "RIFF");
  v.setUint32(4, 36 + dataSize, true);
  writeStr(v, 8, "WAVE");
  writeStr(v, 12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 2, true);
  v.setUint32(24, SR, true);
  v.setUint32(28, SR * block, true);
  v.setUint16(32, block, true);
  v.setUint16(34, 24, true);
  writeStr(v, 36, "data");
  v.setUint32(40, dataSize, true);
  let o = 44;
  for (let i = 0; i < frames; i++) {
    write24(v, o, (L[i] || 0) * scale); o += 3;
    write24(v, o, (R[i] || 0) * scale); o += 3;
  }
  return new Blob([ab], { type: "audio/wav" });
}
function writeStr(v, o, s) { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); }
function write24(v, o, x) {
  const n = Math.max(-1, Math.min(1, x));
  let s = Math.round(n * 8388607);
  if (s < 0) s += 16777216;
  v.setUint8(o, s & 255);
  v.setUint8(o + 1, (s >> 8) & 255);
  v.setUint8(o + 2, (s >> 16) & 255);
}
function fileBase() {
  const rec = state.recipe;
  const key = state.key.replace("#", "sharp");
  return "breaktwo-" + rec + "-" + state.bpm + "bpm-" + key;
}
function download(name, blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

function exportMidi() {
  if (!midiNotes.length) {
    midiNotes = collectMidi();
  }
  const bpm = state.bpm;
  const tpq = 480;
  const tracks = {};
  CHAIRS.forEach((c) => { tracks[c] = []; });
  midiNotes.forEach((n) => {
    const chair = n.chair === "crash" ? "snare" : n.chair;
    if (!tracks[chair]) tracks[chair] = [];
    tracks[chair].push(n);
  });
  const bytes = [77, 84, 104, 100, 0, 0, 0, 6, 0, 1];
  const ids = Object.keys(tracks);
  write16(bytes, ids.length + 1);
  write16(bytes, tpq);
  bytes.push.apply(bytes, track(tempoTrack(bpm)));
  ids.forEach((id) => {
    const ev = [meta(0, 255, 3, strBytes(id))];
    const list = tracks[id].slice().sort((a, b) => a.when - b.when);
    list.forEach((n) => {
      const tick = Math.round(n.when * (bpm / 60) * tpq);
      const end = Math.round((n.when + n.dur) * (bpm / 60) * tpq);
      ev.push({ t: tick, d: [0x90, n.midi & 127, clamp(n.vel, 1, 127)] });
      ev.push({ t: end, d: [0x80, n.midi & 127, 0] });
    });
    ev.sort((a, b) => a.t - b.t);
    let last = 0;
    const out = [];
    ev.forEach((e) => {
      const delta = e.d ? e.t - last : 0;
      if (e.d) last = e.t;
      writeVar(out, delta);
      e.d.forEach((b) => out.push(b));
    });
    writeVar(out, 0);
    out.push(255, 47, 0);
    bytes.push.apply(bytes, track(out));
  });
  download(fileBase() + ".mid", new Blob([new Uint8Array(bytes)], { type: "audio/midi" }));
}
function collectMidi() {
  const notes = [];
  const mode = state.mode === "break" ? "break" : "B";
  for (let s = 0; s < 8 * 16; s++) scheduleStep(s, s * (60 / state.bpm / 4), fakeAc(), {}, notes, mode);
  return notes;
}
function fakeAc() {
  return {
    createBufferSource: () => ({ connect() {}, start() {}, stop() {}, playbackRate: { setValueAtTime() {} }, buffer: null }),
    createGain: () => ({ connect() {}, gain: { setValueAtTime() {}, linearRampToValueAtTime() {}, value: 1 } }),
    createDynamicsCompressor: () => ({ connect() {} }),
    destination: {},
    __chairs: {}
  };
}
function tempoBytes(bpm) {
  const us = Math.round(60000000 / bpm);
  return [(us >> 16) & 255, (us >> 8) & 255, us & 255];
}
function tempoTrack(bpm) {
  const out = [];
  const ev = [
    { t: 0, d: [255, 88, 4, 4, 2, 24, 8] },
    { t: 0, d: [255, 81, 3].concat(tempoBytes(bpm)) },
    { t: 0, d: [255, 47, 0] }
  ];
  ev.forEach((e) => { writeVar(out, 0); e.d.forEach((b) => out.push(b)); });
  return out;
}
function meta(t, a, b, data) { return { t, d: [a, b, data.length].concat(data) }; }
function strBytes(s) { return s.split("").map((c) => c.charCodeAt(0)); }
function write16(arr, n) { arr.push((n >> 8) & 255, n & 255); }
function writeVar(arr, n) {
  let v = n & 0x7f;
  const stack = [v];
  n >>= 7;
  while (n) { stack.push((n & 0x7f) | 0x80); n >>= 7; }
  stack.reverse().forEach((b) => arr.push(b));
}
function track(data) {
  const out = [77, 84, 114, 107];
  const len = data.length;
  out.push((len >> 24) & 255, (len >> 16) & 255, (len >> 8) & 255, len & 255);
  return out.concat(data);
}

function punch() {
  const r = RECIPES.find((x) => x.id === state.recipe);
  const lines = [
    "BreakTwo · " + r.name,
    r.blurb,
    "BPM " + state.bpm + " · key " + state.key + " · chords " + state.chords.join(" "),
    "Bars 1–6: chorus as written. Do not add a fill.",
    "Bars 7–8: " + r.name + ". The hook returns on bar 9, beat 1.",
    "No crash on the return unless the recipe is crash-cut, and that crash is only on bar 7.",
    "Export drops on bar 1 of a " + state.bpm + " session."
  ];
  return lines.join("\n");
}
function renderBars() {
  const host = $("bars");
  host.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const el = document.createElement("div");
    el.className = "bar" + (i >= 6 ? " brk" : "");
    const ch = state.chords[i % 4];
    el.innerHTML = "<strong>" + (i + 1) + "</strong><br>" + (i >= 6 ? "break" : ch);
    host.appendChild(el);
  }
}
function renderUi() {
  const keys = $("key");
  keys.innerHTML = KEYS.map((k) => "<option" + (k === state.key ? " selected" : "") + ">" + k + "</option>").join("");
  $("bpm").value = state.bpm;
  $("chords").value = state.chords.join(" ");
  $("recipes").innerHTML = RECIPES.map((r) => "<button class='chip" + (r.id === state.recipe ? " on" : "") + "' data-r='" + r.id + "'>" + r.name + "</button>").join("");
  $("mutes").innerHTML = CHAIRS.map((c) => "<button class='chip" + (state.mutes[c] ? "" : " on") + "' data-m='" + c + "'>" + c + "</button>").join("");
  $("punch").textContent = punch();
  renderBars();
}

function bind() {
  $("bpm").addEventListener("change", () => { state.bpm = clamp(Number($("bpm").value) || 96, 60, 180); $("bpm").value = state.bpm; saveStore(); $("punch").textContent = punch(); });
  $("key").addEventListener("change", () => { state.key = $("key").value; saveStore(); $("punch").textContent = punch(); });
  $("chords").addEventListener("change", () => {
    const parts = $("chords").value.split(/\s+/).filter(Boolean).slice(0, 4);
    while (parts.length < 4) parts.push("C");
    state.chords = parts;
    saveStore();
    renderBars();
    $("punch").textContent = punch();
  });
  $("recipes").addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-r");
    if (!id) return;
    state.recipe = id;
    saveStore();
    renderUi();
  });
  $("mutes").addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-m");
    if (!id) return;
    state.mutes[id] = !state.mutes[id];
    saveStore();
    renderUi();
  });
  async function arm(mode) {
    if (!ctx) await boot();
    if (ctx.state === "suspended") await ctx.resume();
    start(mode);
  }
  $("playA").onclick = () => arm("A");
  $("playB").onclick = () => arm("B");
  $("play2").onclick = () => arm("break");
  $("stop").onclick = () => stop();
  $("wav").onclick = () => exportWav(false);
  $("wavTail").onclick = () => exportWav(true);
  $("mid").onclick = () => exportMidi();
  $("copy").onclick = () => navigator.clipboard.writeText(punch());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") stop();
  });
}

loadStore();
renderUi();
bind();
