# California Class A CDL Course

Local responsive study course built from the California Commercial Driver Handbook PDF in `/Users/mrmaryland/Downloads/California Commercial Driver Handbook.pdf`.

## Open It

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
- Flashcards with simple spaced repetition scheduling.
- Source links to the local handbook extraction and the official DMV/FMCSA references used for test framing.

## Source Trace

- Extracted handbook text: `source/handbook-text.txt`
- Course content: `course-data.js`
- App behavior: `app.js`
- Standalone endorsement content: `endorsements/endorsement-data.js`
- Standalone endorsement behavior: `endorsements/endorsement-course.js`
- Layout: `styles.css`

This is a prep tool, not an official DMV product. It cannot guarantee a passing score, but it is designed around the handbook, official sample-test topic signals, active recall, spaced repetition, and weak-topic review.
