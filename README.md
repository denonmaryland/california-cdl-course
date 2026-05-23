# California Class A CDL Course

Local responsive study course built from the California Commercial Driver Handbook PDF in `/Users/mrmaryland/Downloads/California Commercial Driver Handbook.pdf`.

## Open It

Hosted course:

https://denonmaryland.github.io/california-cdl-course/

GitHub repository:

https://github.com/denonmaryland/california-cdl-course

Open `index.html` in a browser, or run a small local server from this folder:

```sh
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## What Is Included

- Class A permit path modules for General Knowledge, Air Brakes, Combination Vehicles, cargo, and skills-test preparation.
- Optional endorsement preview for Doubles/Triples, Tanker, HazMat, Passenger, and School Bus.
- Separate standalone endorsement courses:
  - `endorsements/doubles-triples.html`
  - `endorsements/tanker.html`
  - `endorsements/hazmat.html`
  - `endorsements/passenger.html`
  - `endorsements/school-bus.html`
- Local progress tracking with `localStorage`.
- Practice tests by topic, Class A mixed mode, individual endorsement filters, and missed-question review.
- Separate DMV-style simulators for the Class A full mix, General Knowledge, Air Brakes, Combination Vehicles, cargo, Tanker, HazMat, Tank + HazMat, Doubles/Triples, Passenger, and School Bus.
- Flashcards with simple spaced repetition scheduling.
- Source links to the local handbook extraction and the official DMV/FMCSA references used for test framing.

## Source Trace

Project folder:

`/Users/mrmaryland/Documents/What Matters/Personal/Career/CDL Journey/California CDL Course`

- Extracted handbook text: `source/handbook-text.txt`
- Course content: `course-data.js`
- Expanded handbook lesson layer: `course-deep-dive.js`
- App behavior: `app.js`
- Standalone endorsement content: `endorsements/endorsement-data.js`
- Standalone endorsement behavior: `endorsements/endorsement-course.js`
- Layout: `styles.css`

## Current Behavior Notes

- Module time labels show estimated reading time and a separate drill/study estimate. The course cards are intentionally compact, so the old 30-60 minute labels were too high for the visible module text.
- The main course now includes expanded handbook-backed teaching blocks inside each lesson: Handbook Lesson, DMV Test Angle, On-The-Road Habit, and Common Traps.
- Quick-check answers and endorsement quiz answers are shuffled so the correct answer is not always in the first position.
- Lessons include teach-back notes and confidence markers so recall can be practiced, saved, and synced across devices.
- The Simulator tab provides one-question-at-a-time test flows for each core exam and endorsement area, with scores, explanations, history, and missed-question review.
- The visual system uses a light theme with color-coded learning sections, richer cards, and shared styling across the main and endorsement courses.
- Cloud progress sync uses Supabase and GitHub Pages; local progress still works if you are not signed in.

This is a prep tool, not an official DMV product. It cannot guarantee a passing score, but it is designed around the handbook, official sample-test topic signals, active recall, spaced repetition, and weak-topic review.
