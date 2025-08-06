from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

# Create FastAPI app
app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Model to Accept Frontend Payload
class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

# Basic root route
@app.get("/")
def read_root():
    return {"Ping": "Pong"}

# Main pipeline parsing logic
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    nodes = pipeline.nodes
    edges = pipeline.edges

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build adjacency list and in-degree count for DAG check
    graph = defaultdict(list)
    in_degree = defaultdict(int)

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")

        if source and target:
            graph[source].append(target)
            in_degree[target] += 1
            in_degree.setdefault(source, 0)

    # Kahn's Algorithm for DAG detection
    queue = deque([node["id"] for node in nodes if in_degree[node["id"]] == 0])
    visited_count = 0

    while queue:
        curr = queue.popleft()
        visited_count += 1

        for neighbor in graph[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited_count == num_nodes

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
