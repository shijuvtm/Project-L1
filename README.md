# VectorShift Frontend Assessment — Completed

## Quick Start

### Backend
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
# → http://localhost:8000
```

### Frontend
```bash
cd frontend
npm install
npm start
# → http://localhost:3000
```

---

## What Was Built

### Part 1 · Node Abstraction (`src/nodes/BaseNode.js`)

A single `BaseNode` component drives **every** node in the pipeline.
You create a new node by declaring:

```js
<BaseNode
  id={id}
  title="My Node"
  icon="🔧"
  category="util"           // colours the header: default | ai | io | util | warn | danger
  inputs={[{ id: 'in', label: 'Input' }]}
  outputs={[{ id: 'out', label: 'Output' }]}
  fields={[
    { name: 'mode', label: 'Mode', type: 'select', value, onChange, options: [...] },
    { name: 'text', label: 'Value', type: 'text',  value, onChange },
  ]}
/>
```

Supported field types: `text`, `number`, `password`, `select`, `textarea`, `checkbox`, `info`.

**Five new demo nodes** (all ≤ 30 lines each):

| Node | File | Purpose |
|------|------|---------|
| Math | `mathNode.js` | Arithmetic on two inputs (add/sub/mul/div/mod) |
| Filter | `filterNode.js` | Routes items to matched/unmatched outputs |
| API Request | `apiNode.js` | HTTP call with method, URL, and headers |
| Transform | `transformNode.js` | map / filter / reduce / sort on data |
| Note | `noteNode.js` | Sticky comment — no handles, just documentation |

---

### Part 2 · Styling

- Dark header toolbar (`#0f172a`) with grouped node categories
- White node cards with per-category gradient headers and hover shadow
- Consistent `Inter` typeface, 12 px body, uppercase 10 px labels
- Indigo (`#6366f1`) accent colour for handles, focus rings, and the submit button
- Bottom status bar showing live node/edge count

---

### Part 3 · Text Node Logic (`src/nodes/textNode.js`)

**Auto-resize:** A `useEffect` hook measures `textarea.scrollHeight` after every keystroke and updates the node's `width` (clipped to 230–480 px, estimated from longest line) and `minHeight` (header + content).

**Variable handles:** `useMemo` runs a regex `/\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g` over the text and returns a deduplicated list of variable names. Each becomes a target Handle on the left side, labelled with the variable name. Variable "pills" are shown in the node body for at-a-glance reference.

---

### Part 4 · Backend Integration

**Frontend (`submit.js`):** On click, POSTs `{ nodes, edges }` to `http://localhost:8000/pipelines/parse`. Shows a formatted `alert` with the results, or an error message if the backend is unreachable.

**Backend (`backend/main.py`):**
- Counts nodes and edges.
- Detects cycles with an iterative DFS (3-colour: WHITE/GRAY/BLACK). Returns `is_dag: true` only if no back-edge is found.
- Response shape: `{ num_nodes: int, num_edges: int, is_dag: bool }`
- CORS is enabled for all origins (dev convenience).
