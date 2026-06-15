// ui.js
import { useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { APINode } from './nodes/apiNode';
import { TransformNode } from './nodes/transformNode';
import { NoteNode } from './nodes/noteNode';

import 'reactflow/dist/style.css';
import './ui.css';

const GRID = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  api: APINode,
  transform: TransformNode,
  note: NoteNode,
};

const selector = (s) => ({
  nodes: s.nodes,
  edges: s.edges,
  getNodeID: s.getNodeID,
  addNode: s.addNode,
  onNodesChange: s.onNodesChange,
  onEdgesChange: s.onEdgesChange,
  onConnect: s.onConnect,
});

const Flow = ({ onRegisterTapAdd }) => {
  const wrapperRef = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const tapOffsetRef = useRef(0);

  const handleTapAdd = useCallback(
    (type) => {
      tapOffsetRef.current = (tapOffsetRef.current + 40) % 200;

      const bounds = wrapperRef.current
        ? wrapperRef.current.getBoundingClientRect()
        : { left: 0, top: 0, width: 400, height: 400 };

      const position = screenToFlowPosition({
        x: bounds.left + bounds.width / 2 + tapOffsetRef.current,
        y: bounds.top + bounds.height / 2 + tapOffsetRef.current,
      });

      const nodeID = getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        data: {
          id: nodeID,
          nodeType: type,
        },
      });
    },
    [screenToFlowPosition, getNodeID, addNode]
  );

  if (onRegisterTapAdd) {
    onRegisterTapAdd(handleTapAdd);
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const raw = event.dataTransfer.getData(
        'application/reactflow'
      );

      if (!raw) return;

      const { nodeType: type } = JSON.parse(raw);

      if (!type) return;

      const bounds = wrapperRef.current.getBoundingClientRect();

      const position = screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(type);

      addNode({
        id: nodeID,
        type,
        position,
        data: {
          id: nodeID,
          nodeType: type,
        },
      });
    },
    [screenToFlowPosition, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={wrapperRef} className="pipeline-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[GRID, GRID]}
        snapToGrid
        connectionLineType="smoothstep"
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
        defaultViewport={{
          x: 100,
          y: 100,
          zoom: 1,
        }}
        minZoom={0.2}
        maxZoom={2}
      >
        <Background
          color="#cbd5e1"
          gap={GRID}
          variant="dots"
        />

        <Controls className="rf-controls" />

        <MiniMap
          className="rf-minimap"
          nodeColor="#6366f1"
          maskColor="rgba(241,245,249,0.7)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
};

export const PipelineUI = ({ onRegisterTapAdd }) => (
  <ReactFlowProvider>
    <Flow onRegisterTapAdd={onRegisterTapAdd} />
  </ReactFlowProvider>
);
