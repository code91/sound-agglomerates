import { AGGLOMERATI, NOTE_NAMES, NOTE_NAMES_FLAT, INTERVAL_NAMES } from './agglomerati.js';

// State
let currentAgglomerato = AGGLOMERATI[0];
let currentRoot = 0; // C
let currentBass = 'none'; // none, root, fifth, fourth
let bassRoot = 0; // Bass root note (0-11), independent from agglomerate root
let currentOctave = 4;
let synth = null;

// DOM Elements
const agglomeratoSelect = document.getElementById('agglomerato-select');
const rootSelect = document.getElementById('root-select');
const octaveSelect = document.getElementById('octave-select');
const bassRadios = document.querySelectorAll('input[name="bass"]');
const bassRootSelect = document.getElementById('bass-root-select');
const keyboard = document.getElementById('keyboard');
const playBtn = document.getElementById('play-btn');
const arpeggiateBtn = document.getElementById('arpeggiate-btn');

// Info display elements
const formulaDisplay = document.getElementById('formula');
const intervalsDisplay = document.getElementById('intervals');
const spanDisplay = document.getElementById('span');
const pitchesDisplay = document.getElementById('pitches');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Theme functions
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (!prefersDark) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '🌙';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '☀️';
  }
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

// Initialize
function init() {
  initTheme();
  populateAgglomeratoSelect();
  createKeyboard();
  setupEventListeners();
  updateDisplay();
}

// Populate agglomerato dropdown grouped by span
function populateAgglomeratoSelect() {
  const spans = [...new Set(AGGLOMERATI.map(a => a.span))].sort((a, b) => a - b);
  
  spans.forEach(span => {
    const group = document.createElement('optgroup');
    group.label = `Span ${span}`;
    
    AGGLOMERATI.filter(a => a.span === span).forEach(agg => {
      const option = document.createElement('option');
      option.value = agg.id;
      option.textContent = `${agg.id}. ${agg.name}`;
      group.appendChild(option);
    });
    
    agglomeratoSelect.appendChild(group);
  });
}

// Create piano keyboard (5 octaves)
function createKeyboard() {
  keyboard.innerHTML = '';

  // Create 5 octaves starting from 2 octaves below selected
  const startNote = (currentOctave - 2) * 12; // Two octaves below for more range
  const numKeys = 61; // About 5 octaves

  const whiteKeyPattern = [0, 2, 4, 5, 7, 9, 11]; // C, D, E, F, G, A, B
  const blackKeyPattern = [1, 3, 6, 8, 10]; // C#, D#, F#, G#, A#

  for (let octave = 0; octave < 5; octave++) {
    // White keys
    whiteKeyPattern.forEach((noteInOctave, index) => {
      const midiNote = startNote + (octave * 12) + noteInOctave;
      if (midiNote > startNote + numKeys) return;
      
      const key = document.createElement('div');
      key.className = 'key key-white';
      key.dataset.note = midiNote;
      
      // Add label for C notes
      if (noteInOctave === 0) {
        const label = document.createElement('span');
        label.className = 'key-label';
        label.textContent = `C${Math.floor(midiNote / 12) - 1}`;
        key.appendChild(label);
      }
      
      keyboard.appendChild(key);
    });
  }
  
  // Black keys (positioned absolutely via CSS)
  // We need to insert them in the right positions
  keyboard.innerHTML = ''; // Reset and do it properly
  
  for (let i = 0; i < numKeys; i++) {
    const midiNote = startNote + i;
    const noteInOctave = midiNote % 12;
    const isBlack = blackKeyPattern.includes(noteInOctave);
    
    const key = document.createElement('div');
    key.className = `key ${isBlack ? 'key-black' : 'key-white'}`;
    key.dataset.note = midiNote;
    
    // Add label for C notes (white keys)
    if (noteInOctave === 0) {
      const label = document.createElement('span');
      label.className = 'key-label';
      label.textContent = `C${Math.floor(midiNote / 12) - 1}`;
      key.appendChild(label);
    }
    
    keyboard.appendChild(key);
  }
}

// Setup event listeners
function setupEventListeners() {
  themeToggle.addEventListener('click', toggleTheme);

  agglomeratoSelect.addEventListener('change', (e) => {
    currentAgglomerato = AGGLOMERATI.find(a => a.id === parseInt(e.target.value));
    updateDisplay();
  });
  
  rootSelect.addEventListener('change', (e) => {
    currentRoot = parseInt(e.target.value);
    updateDisplay();
  });
  
  octaveSelect.addEventListener('change', (e) => {
    currentOctave = parseInt(e.target.value);
    createKeyboard();
    updateDisplay();
  });

  bassRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentBass = e.target.value;
      updateDisplay();
    });
  });

  bassRootSelect.addEventListener('change', (e) => {
    bassRoot = parseInt(e.target.value);
    updateDisplay();
  });
  
  playBtn.addEventListener('click', () => playChord());
  arpeggiateBtn.addEventListener('click', () => playArpeggiated());
  
  // Click on keys to play individual notes
  keyboard.addEventListener('click', (e) => {
    if (e.target.classList.contains('key')) {
      const midiNote = parseInt(e.target.dataset.note);
      playNote(midiNote);
    }
  });
}

// Calculate current pitches
function getCurrentPitches() {
  const pitches = [];
  const agglomeratoMidi = (currentOctave + 1) * 12 + currentRoot; // Agglomerate starts one octave below middle
  const bassMidi = (currentOctave - 1) * 12 + bassRoot; // Bass root two octaves below main octave

  // Add bass notes based on selection (using independent bass root)
  if (currentBass === 'root') {
    pitches.push(bassMidi);
  } else if (currentBass === 'fifth') {
    pitches.push(bassMidi);
    pitches.push(bassMidi + 7); // Fifth
  } else if (currentBass === 'fourth') {
    pitches.push(bassMidi);
    pitches.push(bassMidi + 5); // Fourth
  }

  // Add agglomerato notes
  let currentPitch = agglomeratoMidi;
  pitches.push(currentPitch);

  currentAgglomerato.intervals.forEach(interval => {
    currentPitch += interval;
    pitches.push(currentPitch);
  });

  return pitches;
}

// Update display
function updateDisplay() {
  // Update info panel
  formulaDisplay.textContent = currentAgglomerato.name;
  intervalsDisplay.textContent = currentAgglomerato.intervals.join('-');
  spanDisplay.textContent = `${currentAgglomerato.span} semitones`;
  
  // Calculate and display pitches
  const pitches = getCurrentPitches();
  const pitchNames = pitches.map(midi => {
    const noteIndex = midi % 12;
    const octave = Math.floor(midi / 12) - 1;
    return NOTE_NAMES_FLAT[noteIndex] + octave;
  });
  
  // Separate bass from agglomerato in display
  let bassCount = 0;
  if (currentBass === 'root') bassCount = 1;
  else if (currentBass === 'fifth' || currentBass === 'fourth') bassCount = 2;
  
  const bassPitches = pitchNames.slice(0, bassCount);
  const aggPitches = pitchNames.slice(bassCount);
  
  if (bassPitches.length > 0) {
    pitchesDisplay.textContent = `[${bassPitches.join('–')}] ${aggPitches.join('–')}`;
  } else {
    pitchesDisplay.textContent = aggPitches.join('–');
  }
  
  // Update keyboard highlighting
  highlightKeys(pitches, bassCount);
}

// Highlight active keys on keyboard
function highlightKeys(pitches, bassCount) {
  // Clear all highlights
  document.querySelectorAll('.key').forEach(key => {
    key.classList.remove('active', 'bass-note');
  });
  
  // Highlight active pitches
  pitches.forEach((midi, index) => {
    const key = document.querySelector(`.key[data-note="${midi}"]`);
    if (key) {
      key.classList.add('active');
      if (index < bassCount) {
        key.classList.add('bass-note');
      }
    }
  });
}

// Initialize Tone.js synth
function initSynth() {
  if (!synth) {
    synth = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 3,
      modulationIndex: 10,
      envelope: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0.4,
        release: 1
      },
      modulation: { type: 'square' },
      modulationEnvelope: {
        attack: 0.5,
        decay: 0.1,
        sustain: 0.2,
        release: 0.5
      }
    }).toDestination();
    
    // Add slight reverb for warmth
    const reverb = new Tone.Reverb({ decay: 2, wet: 0.3 }).toDestination();
    synth.connect(reverb);
  }
}

// Convert MIDI to frequency
function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Play single note
function playNote(midi) {
  initSynth();
  Tone.start();
  const freq = midiToFreq(midi);
  synth.triggerAttackRelease(freq, '4n');
}

// Play chord
function playChord() {
  initSynth();
  Tone.start();
  
  const pitches = getCurrentPitches();
  const freqs = pitches.map(midiToFreq);
  
  synth.triggerAttackRelease(freqs, '2n');
}

// Play arpeggiated
function playArpeggiated() {
  initSynth();
  Tone.start();
  
  const pitches = getCurrentPitches();
  const now = Tone.now();
  
  pitches.forEach((midi, index) => {
    const freq = midiToFreq(midi);
    synth.triggerAttackRelease(freq, '8n', now + index * 0.15);
  });
}

// Start app
init();
