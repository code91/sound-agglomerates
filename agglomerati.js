// All 95 valid agglomerati sonori, ordered by span
// Each entry: [name, intervals array, span]
// Intervals: S=1, T=2, m3=3, M3=4, 4=5

const AGGLOMERATI = [
  // Span 3
  { id: 1, name: "S.S.S", intervals: [1, 1, 1], span: 3 },
  
  // Span 4
  { id: 2, name: "S.S.T", intervals: [1, 1, 2], span: 4 },
  { id: 3, name: "S.T.S", intervals: [1, 2, 1], span: 4 },
  { id: 4, name: "T.S.S", intervals: [2, 1, 1], span: 4 },
  
  // Span 5
  { id: 5, name: "S.S.m3", intervals: [1, 1, 3], span: 5 },
  { id: 6, name: "S.T.T", intervals: [1, 2, 2], span: 5 },
  { id: 7, name: "S.m3.S", intervals: [1, 3, 1], span: 5 },
  { id: 8, name: "T.S.T", intervals: [2, 1, 2], span: 5 },
  { id: 9, name: "T.T.S", intervals: [2, 2, 1], span: 5 },
  { id: 10, name: "m3.S.S", intervals: [3, 1, 1], span: 5 },
  
  // Span 6
  { id: 11, name: "S.S.M3", intervals: [1, 1, 4], span: 6 },
  { id: 12, name: "S.T.m3", intervals: [1, 2, 3], span: 6 },
  { id: 13, name: "S.m3.T", intervals: [1, 3, 2], span: 6 },
  { id: 14, name: "S.M3.S", intervals: [1, 4, 1], span: 6 },
  { id: 15, name: "T.S.m3", intervals: [2, 1, 3], span: 6 },
  { id: 16, name: "T.T.T", intervals: [2, 2, 2], span: 6 },
  { id: 17, name: "T.m3.S", intervals: [2, 3, 1], span: 6 },
  { id: 18, name: "m3.S.T", intervals: [3, 1, 2], span: 6 },
  { id: 19, name: "m3.T.S", intervals: [3, 2, 1], span: 6 },
  { id: 20, name: "M3.S.S", intervals: [4, 1, 1], span: 6 },
  
  // Span 7
  { id: 21, name: "S.S.4", intervals: [1, 1, 5], span: 7 },
  { id: 22, name: "S.T.M3", intervals: [1, 2, 4], span: 7 },
  { id: 23, name: "S.m3.m3", intervals: [1, 3, 3], span: 7 },
  { id: 24, name: "S.M3.T", intervals: [1, 4, 2], span: 7 },
  { id: 25, name: "S.4.S", intervals: [1, 5, 1], span: 7 },
  { id: 26, name: "T.S.M3", intervals: [2, 1, 4], span: 7 },
  { id: 27, name: "T.T.m3", intervals: [2, 2, 3], span: 7 },
  { id: 28, name: "T.m3.T", intervals: [2, 3, 2], span: 7 },
  { id: 29, name: "T.M3.S", intervals: [2, 4, 1], span: 7 },
  { id: 30, name: "m3.S.m3", intervals: [3, 1, 3], span: 7 },
  { id: 31, name: "m3.T.T", intervals: [3, 2, 2], span: 7 },
  { id: 32, name: "m3.m3.S", intervals: [3, 3, 1], span: 7 },
  { id: 33, name: "M3.S.T", intervals: [4, 1, 2], span: 7 },
  { id: 34, name: "M3.T.S", intervals: [4, 2, 1], span: 7 },
  { id: 35, name: "4.S.S", intervals: [5, 1, 1], span: 7 },
  
  // Span 8
  { id: 36, name: "S.T.4", intervals: [1, 2, 5], span: 8 },
  { id: 37, name: "S.m3.M3", intervals: [1, 3, 4], span: 8 },
  { id: 38, name: "S.M3.m3", intervals: [1, 4, 3], span: 8 },
  { id: 39, name: "S.4.T", intervals: [1, 5, 2], span: 8 },
  { id: 40, name: "T.S.4", intervals: [2, 1, 5], span: 8 },
  { id: 41, name: "T.T.M3", intervals: [2, 2, 4], span: 8 },
  { id: 42, name: "T.M3.T", intervals: [2, 4, 2], span: 8 },
  { id: 43, name: "T.4.S", intervals: [2, 5, 1], span: 8 },
  { id: 44, name: "m3.S.M3", intervals: [3, 1, 4], span: 8 },
  { id: 45, name: "m3.m3.T", intervals: [3, 3, 2], span: 8 },
  { id: 46, name: "m3.M3.S", intervals: [3, 4, 1], span: 8 },
  { id: 47, name: "M3.S.m3", intervals: [4, 1, 3], span: 8 },
  { id: 48, name: "M3.T.T", intervals: [4, 2, 2], span: 8 },
  { id: 49, name: "M3.m3.S", intervals: [4, 3, 1], span: 8 },
  { id: 50, name: "4.S.T", intervals: [5, 1, 2], span: 8 },
  { id: 51, name: "4.T.S", intervals: [5, 2, 1], span: 8 },
  
  // Span 9
  { id: 52, name: "S.m3.4", intervals: [1, 3, 5], span: 9 },
  { id: 53, name: "S.4.m3", intervals: [1, 5, 3], span: 9 },
  { id: 54, name: "T.T.4", intervals: [2, 2, 5], span: 9 },
  { id: 55, name: "T.m3.M3", intervals: [2, 3, 4], span: 9 },
  { id: 56, name: "T.M3.m3", intervals: [2, 4, 3], span: 9 },
  { id: 57, name: "T.4.T", intervals: [2, 5, 2], span: 9 },
  { id: 58, name: "m3.S.4", intervals: [3, 1, 5], span: 9 },
  { id: 59, name: "m3.T.M3", intervals: [3, 2, 4], span: 9 },
  { id: 60, name: "m3.M3.T", intervals: [3, 4, 2], span: 9 },
  { id: 61, name: "m3.4.S", intervals: [3, 5, 1], span: 9 },
  { id: 62, name: "M3.S.M3", intervals: [4, 1, 4], span: 9 },
  { id: 63, name: "M3.T.m3", intervals: [4, 2, 3], span: 9 },
  { id: 64, name: "M3.m3.T", intervals: [4, 3, 2], span: 9 },
  { id: 65, name: "M3.M3.S", intervals: [4, 4, 1], span: 9 },
  { id: 66, name: "4.S.m3", intervals: [5, 1, 3], span: 9 },
  { id: 67, name: "4.T.T", intervals: [5, 2, 2], span: 9 },
  { id: 68, name: "4.m3.S", intervals: [5, 3, 1], span: 9 },
  
  // Span 10
  { id: 69, name: "S.M3.4", intervals: [1, 4, 5], span: 10 },
  { id: 70, name: "S.4.M3", intervals: [1, 5, 4], span: 10 },
  { id: 71, name: "T.m3.4", intervals: [2, 3, 5], span: 10 },
  { id: 72, name: "T.4.m3", intervals: [2, 5, 3], span: 10 },
  { id: 73, name: "m3.m3.M3", intervals: [3, 3, 4], span: 10 },
  { id: 74, name: "m3.M3.m3", intervals: [3, 4, 3], span: 10 },
  { id: 75, name: "m3.4.T", intervals: [3, 5, 2], span: 10 },
  { id: 76, name: "M3.S.4", intervals: [4, 1, 5], span: 10 },
  { id: 77, name: "M3.m3.m3", intervals: [4, 3, 3], span: 10 },
  { id: 78, name: "M3.M3.T", intervals: [4, 4, 2], span: 10 },
  { id: 79, name: "M3.4.S", intervals: [4, 5, 1], span: 10 },
  { id: 80, name: "4.S.M3", intervals: [5, 1, 4], span: 10 },
  { id: 81, name: "4.T.m3", intervals: [5, 2, 3], span: 10 },
  { id: 82, name: "4.m3.T", intervals: [5, 3, 2], span: 10 },
  { id: 83, name: "4.M3.S", intervals: [5, 4, 1], span: 10 },
  
  // Span 11
  { id: 84, name: "T.M3.4", intervals: [2, 4, 5], span: 11 },
  { id: 85, name: "T.4.M3", intervals: [2, 5, 4], span: 11 },
  { id: 86, name: "m3.m3.4", intervals: [3, 3, 5], span: 11 },
  { id: 87, name: "m3.4.m3", intervals: [3, 5, 3], span: 11 },
  { id: 88, name: "M3.T.4", intervals: [4, 2, 5], span: 11 },
  { id: 89, name: "M3.M3.m3", intervals: [4, 4, 3], span: 11 },
  { id: 90, name: "M3.4.T", intervals: [4, 5, 2], span: 11 },
  { id: 91, name: "4.S.4", intervals: [5, 1, 5], span: 11 },
  { id: 92, name: "4.T.M3", intervals: [5, 2, 4], span: 11 },
  { id: 93, name: "4.m3.m3", intervals: [5, 3, 3], span: 11 },
  { id: 94, name: "4.M3.T", intervals: [5, 4, 2], span: 11 },
  { id: 95, name: "4.4.S", intervals: [5, 5, 1], span: 11 },
];

// Note names
const NOTE_NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
const NOTE_NAMES_FLAT = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
const NOTE_NAMES_SHARP = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

// MIDI note for C4
const MIDDLE_C = 60;

// Interval names for display
const INTERVAL_NAMES = {
  1: 'S',
  2: 'T', 
  3: 'm3',
  4: 'M3',
  5: '4'
};

// Chord quality mappings based on bass interval (semitones from bass up to agglomerate root)
// Keys are agglomerate names, values are objects mapping interval (0-11) to jazz chord symbol
// "/" or null means no standard chord quality for that combination
const CHORD_QUALITIES = {
  // S.T.T. (1-2-2) - based on the table
  "S.T.T": {
    0: null,              // 1/4 - root (no bass reharmonization)
    1: null,              // b2/#4
    2: "m11(no7)",        // 2/5
    3: "7/Maj7",          // 3m/b6
    4: null,              // 3/6
    5: "m11",             // 4/7
    6: null,              // tritone
    7: "Spanish",         // 5/1
    8: "Maj7(b9,#11)",    // b6/b2
    9: "Maj7",            // 6/2
    10: null,             // m7
    11: "7"               // 7/3m
  },

  // S.T.4 (1-2-5) - based on the table
  "S.T.4": {
    0: null,              // root
    1: null,              // b2
    2: null,              // 2
    3: "7/Maj7",          // 3m
    4: "Lyd(2Triad/1)",   // 3
    5: "m13",             // 4
    6: null,              // tritone
    7: "Phrygian",        // 5
    8: "Maj7",            // b6
    9: null,              // 6
    10: "Min7(b13)",      // m7
    11: "7(11)"           // 7
  },

  // M3.S.T (4-1-2) - based on the table
  "M3.S.T": {
    0: "Maj7/Min(maj7)",  // 1/4
    1: null,              // b2
    2: "m7",              // 2
    3: null,              // 3m
    4: "m13",             // 3
    5: "Maj7(#11)",       // 4
    6: null,              // tritone
    7: "Maj7/7",          // 5
    8: "Min arm",         // b6
    9: null,              // 6
    10: "7",              // m7
    11: null              // 7
  },

  // Additional common agglomerates with typical jazz voicings

  // S.S.T (1-1-2) - chromatic cluster with tone
  "S.S.T": {
    0: null,
    1: null,
    2: "sus(b9)",
    3: "7(b9)",
    4: null,
    5: "m(add9)",
    6: null,
    7: "Phryg",
    8: "Maj7(b9)",
    9: null,
    10: null,
    11: "7(b9,b13)"
  },

  // T.S.T (2-1-2) - whole-half pattern
  "T.S.T": {
    0: null,
    1: null,
    2: "dim7",
    3: "m7(b5)",
    4: "7(b9)",
    5: "m7",
    6: null,
    7: "7",
    8: null,
    9: "Maj7",
    10: "m7",
    11: null
  },

  // T.T.S (2-2-1) - whole-whole-half
  "T.T.S": {
    0: null,
    1: "Maj7(#11)",
    2: null,
    3: "7(#11)",
    4: null,
    5: "m9",
    6: null,
    7: "9",
    8: null,
    9: "6/9",
    10: null,
    11: "Maj9"
  },

  // m3.S.T (3-1-2)
  "m3.S.T": {
    0: "m(maj7)",
    1: null,
    2: "m7",
    3: null,
    4: "Maj7",
    5: "m11",
    6: null,
    7: "m7/7",
    8: null,
    9: "7",
    10: "m9",
    11: null
  },

  // M3.T.S (4-2-1)
  "M3.T.S": {
    0: "Maj7",
    1: null,
    2: "7",
    3: null,
    4: "m7",
    5: "Maj9",
    6: null,
    7: "6",
    8: "7(#5)",
    9: null,
    10: "m(maj7)",
    11: null
  },

  // T.m3.T (2-3-2) - symmetric diminished
  "T.m3.T": {
    0: "7",
    1: null,
    2: "dim7",
    3: "m7(b5)",
    4: null,
    5: "m7",
    6: "7(b5)",
    7: "7",
    8: null,
    9: "7(#9)",
    10: "m7",
    11: null
  },

  // m3.T.T (3-2-2) - minor triad extensions
  "m3.T.T": {
    0: "m7",
    1: null,
    2: "7",
    3: null,
    4: "Maj7",
    5: "m9",
    6: null,
    7: "m7",
    8: null,
    9: "7(#9)",
    10: null,
    11: "Maj7"
  },

  // M3.m3.S (4-3-1) - major triad extensions
  "M3.m3.S": {
    0: "Maj7",
    1: null,
    2: "7",
    3: null,
    4: "m7",
    5: "Maj7(#11)",
    6: null,
    7: "6",
    8: null,
    9: "7(#9)",
    10: "m(maj7)",
    11: null
  },

  // m3.m3.T (3-3-2)
  "m3.m3.T": {
    0: "m7(b5)",
    1: null,
    2: "dim7",
    3: null,
    4: "m7",
    5: "m9(b5)",
    6: null,
    7: "7(b9)",
    8: null,
    9: "Maj7",
    10: null,
    11: "7(#9)"
  },

  // 4.S.T (5-1-2) - quartal voicing
  "4.S.T": {
    0: "sus4",
    1: null,
    2: "7sus4",
    3: null,
    4: "Maj7sus",
    5: "sus(add9)",
    6: null,
    7: "sus4",
    8: null,
    9: "13sus",
    10: null,
    11: "Maj7sus"
  },

  // T.4.S (2-5-1) - sus voicing
  "T.4.S": {
    0: "sus2",
    1: null,
    2: "7sus2",
    3: null,
    4: "Maj9(no3)",
    5: "sus2/4",
    6: null,
    7: "9sus",
    8: null,
    9: "6sus2",
    10: null,
    11: "Maj9(no3)"
  }
};

// Function to get chord quality for an agglomerate and bass interval
function getChordQuality(agglomeratoName, bassInterval) {
  const qualities = CHORD_QUALITIES[agglomeratoName];
  if (!qualities) return null;
  return qualities[bassInterval] || null;
}

export { AGGLOMERATI, NOTE_NAMES, NOTE_NAMES_FLAT, NOTE_NAMES_SHARP, MIDDLE_C, INTERVAL_NAMES, CHORD_QUALITIES, getChordQuality };
