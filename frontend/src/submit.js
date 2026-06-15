// submit.js  — Part 4: sends nodes/edges to backend and shows analysis alert
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './submit.css';

const BACKEND = 'http://localhost:8000';

const selector = (s) => ({ nodes: s.nodes, edges: s.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert('Your pipeline is empty. Add some nodes first!');
      return;
    }

    try {
      const res = await fetch(`${BACKEND}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const { num_nodes, num_edges, is_dag } = await res.json();

      // User-friendly alert (Part 4 requirement)
      alert(
        `📊  Pipeline Analysis\n` +
        `──────────────────────\n` +
        `Nodes : ${num_nodes}\n` +
        `Edges : ${num_edges}\n` +
        `Is DAG: ${is_dag ? '✅  Yes — no cycles detected' : '❌  No — cycle(s) detected'}`
      );
    } catch (err) {
      alert(`⚠️  Could not reach the backend.\n\n${err.message}\n\nMake sure the backend is running:\n  uvicorn main:app --reload`);
    }
  };

  return (
    <footer className="submit-bar">
      <div className="submit-bar__info">
        {/* Live node/edge counter for UX bonus */}
        <span className="submit-bar__stat">
          <strong>{useStore((s) => s.nodes.length)}</strong> nodes
        </span>
        <span className="submit-bar__sep">·</span>
        <span className="submit-bar__stat">
          <strong>{useStore((s) => s.edges.length)}</strong> edges
        </span>
      </div>
      <button className="submit-bar__btn" onClick={handleSubmit}>
        Analyze Pipeline
      </button>
    </footer>
  );
};
