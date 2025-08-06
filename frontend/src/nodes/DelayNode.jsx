// DelayNode.jsx
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data.delay || '1000');

  return (
    <BaseNode
      id={id}
      title="Delay"
      data={{ delay }}
      onChange={{ delay: setDelay }}
      fields={[
        { label: 'Delay (ms)', key: 'delay', type: 'text' },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    />
  );
};
