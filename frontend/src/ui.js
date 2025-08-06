// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/MathNode';
import { APICallNode } from './nodes/APICallNode';
import { ConditionalNode } from './nodes/ConditionalNode';
import { DelayNode } from './nodes/DelayNode';
import { LogNode } from './nodes/LogNode';

import 'reactflow/dist/style.css';
import 'tailwindcss/tailwind.css';
import { FaBolt } from 'react-icons/fa';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  apiCall: APICallNode,
  conditional: ConditionalNode,
  delay: DelayNode,
  log: LogNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  updateNodeData: state.updateNodeData,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      updateNodeData
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { 
        id: nodeID, 
        nodeType: `${type}`,
        updateNodeData: updateNodeData
      };
      if (type === 'text') {
        nodeData.text = '{{input}}';
      }
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded flex items-center justify-center">
            <span className="text-white text-sm">
              <FaBolt />
            </span>
            </div>
            Pipeline Canvas
          </h2>
          <p className="text-slate-600 text-sm mt-1">Design your AI workflow by connecting nodes</p>
          </div>
          <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-slate-200 text-sm">
            <span className="text-slate-600">Nodes:</span>
            <span className="font-semibold text-slate-800">{nodes.length}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-slate-200 text-sm">
            <span className="text-slate-600">Connections:</span>
            <span className="font-semibold text-slate-800">{edges.length}</span>
          </div>
          </div>
        </div>
        </div>
        
        <div
        ref={reactFlowWrapper}
        className="w-full h-[600px] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30"
        >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          defaultEdgeOptions={{
          style: { 
            stroke: '#3b82f6', 
            strokeWidth: 2,
          },
          type: 'smoothstep',
          animated: true,
          }}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background 
          color="#e2e8f0" 
          gap={gridSize} 
          size={1}
          style={{ opacity: 0.4 }}
          />
          <Controls 
          className="!bg-white/90 !backdrop-blur-md !border !border-slate-200 !rounded-lg !shadow-lg"
          showInteractive={false}
          />
          <MiniMap 
          className="!bg-white/90 !backdrop-blur-md !border !border-slate-200 !rounded-lg !shadow-lg"
          nodeColor={(node) => {
            switch (node.type) {
            case 'customInput': return '#10b981';
            case 'llm': return '#8b5cf6';
            case 'customOutput': return '#f59e0b';
            case 'text': return '#06b6d4';
            case 'math': return '#ec4899';
            case 'apiCall': return '#4f46e5';
            case 'conditional': return '#f59e0b';
            case 'delay': return '#14b8a6';
            case 'log': return '#64748b';
            default: return '#3b82f6';
            }
          }}
          maskColor="rgba(255, 255, 255, 0.8)"
          />
        </ReactFlow>
        </div>
      </div>
    )
}
