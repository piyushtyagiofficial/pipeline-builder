// LogNode.jsx
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const LogNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Log"
    data={{}}
    fields={[]}
    handles={[
      { type: 'target', position: Position.Left, id: 'input' },
    ]}
  />
);
