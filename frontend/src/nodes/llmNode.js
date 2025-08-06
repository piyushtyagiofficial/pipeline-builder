import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      data={{}}
      fields={[]}
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' },
      ]}
    />
  );
};
