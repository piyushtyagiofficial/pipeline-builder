import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data.condition || 'x > 10');

  return (
    <BaseNode
      id={id}
      title="Condition"
      data={{ condition }}
      onChange={{ condition: setCondition }}
      fields={[
        { label: 'Condition', key: 'condition', type: 'text' },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'true' },
        { type: 'source', position: Position.Right, id: 'false', style: { top: '70%' } },
      ]}
    />
  );
};
