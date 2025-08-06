import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data.operation || 'Add');

  return (
    <BaseNode
      id={id}
      title="Math"
      data={{ operation }}
      onChange={{ operation: setOperation }}
      fields={[
        { label: 'Operation', key: 'operation', type: 'select', options: ['Add', 'Subtract', 'Multiply', 'Divide'] },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'a', style: { top: '30%' } },
        { type: 'target', position: Position.Left, id: 'b', style: { top: '60%' } },
        { type: 'source', position: Position.Right, id: 'result' },
      ]}
    />
  );
};
