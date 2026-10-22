# Party Math

Party cup, table and tray arithmetic. The 46 guests at 8 a table take 6 tables, leaving 2 empty seats.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The cups truth** - cups: the guests (1 to 100000) times the cups a guest (1 to 100), divided by the cups a pack (1 to 10000), rounded up, with the cups left.
- **The tables truth** - tables: the guests divided by the seats a table (1 to 100), rounded up, with the empty seats.
- **The trays truth** - trays: the guests times the servings a guest (1 to 100), divided by the servings a tray (1 to 1000), rounded up, with the servings left.
- **The cost truth** - cost: the packs and the trays (1 to 100000 each), each at their price (0.01 to 10000 dollars).

## Boundary

Arithmetic only. Counting applied as written. It has not met any guests and does not know who will come, who will eat what, the venue or any food safety or capacity rule, and it gives no verdict that the food is enough or the room fits. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/partymath/
Repo: https://github.com/iLanis-agent/partymath
