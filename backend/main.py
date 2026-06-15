# main.py  — VectorShift pipeline backend (Part 4)

from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Any

app = FastAPI(title="VectorShift Pipeline API")

# Allow the React dev-server to talk to us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


# ── DAG detection ─────────────────────────────────────────────────────────────

def _is_dag(nodes: list[dict], edges: list[dict]) -> bool:
    """
    Return True if the graph formed by nodes/edges is a Directed Acyclic Graph.
    Uses iterative DFS with three-colour marking (WHITE=0, GRAY=1, BLACK=2).
    """
    node_ids = {n["id"] for n in nodes}

    # Build adjacency list: source → [targets]
    adj: dict[str, list[str]] = {nid: [] for nid in node_ids}
    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src in adj and tgt in node_ids:
            adj[src].append(tgt)

    WHITE, GRAY, BLACK = 0, 1, 2
    color: dict[str, int] = {nid: WHITE for nid in node_ids}

    def dfs(start: str) -> bool:
        """Returns True if a back-edge (cycle) is found."""
        stack = [(start, iter(adj[start]))]
        color[start] = GRAY
        while stack:
            node, children = stack[-1]
            try:
                child = next(children)
                if color[child] == GRAY:   # back-edge → cycle
                    return True
                if color[child] == WHITE:
                    color[child] = GRAY
                    stack.append((child, iter(adj[child])))
            except StopIteration:
                color[node] = BLACK
                stack.pop()
        return False

    for nid in node_ids:
        if color[nid] == WHITE:
            if dfs(nid):
                return False   # cycle detected → NOT a DAG

    return True


# ── Endpoint ──────────────────────────────────────────────────────────────────

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: dict[str, Any] = Body(...)):
    """
    Accepts { nodes: [...], edges: [...] } and returns:
      { num_nodes: int, num_edges: int, is_dag: bool }
    """
    nodes = pipeline.get("nodes", [])
    edges = pipeline.get("edges", [])

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag":    _is_dag(nodes, edges),
    }
