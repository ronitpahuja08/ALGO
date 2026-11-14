# ALGO — Collision Detection Lab

An interactive educational demonstration of **axis-aligned bounding box (AABB)** collision detection, built with p5.js and p5.play. This edition turns a simple moving-rectangle demo into a responsive learning lab.

## Features
- Move a rectangle with a pointer, touch, or arrow keys.
- See collisions, exact shared bounds, and overlap area in real time.
- Live count of times collision begins; press **R** or use **Reset simulation**.
- Keyboard-visible controls and a screen-reader status announcement.
- Separate, tested AABB collision functions.

## Geometry API

Rectangles use centre coordinates: `{ x, y, width, height }`. Width and height
must be finite and positive. Edge-only contact is not a collision, which keeps
the visualizer's overlap area consistent with its collision state.

- `isValidRectangle(rectangle)` verifies the input contract.
- `rectangleEdges(rectangle)` returns `{ left, right, top, bottom }` or `null`.
- `rectanglesOverlap(a, b)` performs strict AABB overlap detection.
- `intersectionRectangle(a, b)` returns the exact shared rectangle or `null`.
- `overlapArea(a, b)` returns its area in square pixels.
- `containsPoint(rectangle, point)` includes rectangle edges.
- `minimumTranslationVector(a, b)` gives the smallest axis-aligned move needed
  to separate the first rectangle from the second.

## Run
Open \`index.html\` or serve with \`python -m http.server 8000\`.

## Tests
\`node test-collision.js\` validates overlap, exact intersection bounds, point
containment, separation vectors, edge-only contact, and invalid rectangles.
\`node --check sketch.js\` checks JavaScript syntax.
