# Agglomerati Sonori Explorer

An interactive tool for exploring **agglomerati sonori** (sound agglomerates) — a compositional alternative to chord symbols in improvised music.

## What is an Agglomerato Sonoro?

An *agglomerato sonoro* is a cluster of pitches defined by intervallic relationships rather than functional harmonic identity. Unlike chord symbols, which trigger idiomatic responses in trained musicians, agglomerati sonori specify the exact intervallic structure of a voicing.

### Constraints

1. **Four notes** (three stacked intervals)
2. **Within one octave** (span < 12 semitones)
3. **No uniform tertian stacking** (excludes m3.m3.m3 and M3.M3.M3)
4. **Interval vocabulary:** S (semitone), T (tone), m3 (minor 3rd), M3 (major 3rd), 4 (perfect 4th)

These constraints produce **95 valid agglomerati sonori**.

## Features

- Browse all 95 agglomerati, grouped by span
- Select any root note
- Add bass configurations: none, root, fifth (1-5), or fourth (1-4)
- Visual piano keyboard showing active pitches
- Audio playback (chord and arpeggiated)

## Usage

Visit: [https://mikerubini.github.io/agglomerati-sonori](https://mikerubini.github.io/agglomerati-sonori)

Or run locally:
```bash
# Clone the repo
git clone https://github.com/mikerubini/agglomerati-sonori.git
cd agglomerati-sonori

# Serve with any static server
python -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000` in your browser.

## Based On

This tool accompanies the paper:

> **"Agglomerati Sonori: A Compositional Alternative to Chord Symbols in Improvised Music"**  
> Michele "Mike" Rubini (2025)

The theoretical framework originates from:

> **"Libertà Improvvisativa nella Formalità Compositiva: Il Multiverso Possibile"**  
> Michele Rubini, Conservatorio di Musica "N. Rota" di Monopoli (2013)

## License

MIT License — feel free to use, modify, and distribute.

## Author

**Michele "Mike" Rubini**  
[music.mikerubini.com](https://music.mikerubini.com)
