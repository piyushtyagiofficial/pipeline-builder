// APICallNode.jsx
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const APICallNode = ({ id, data }) => {
  const [url, setUrl] = useState(data.url || '');

  return (
    <BaseNode
      id={id}
      title="API Call"
      data={{ url }}
      onChange={{ url: setUrl }}
      fields={[
        { label: 'URL', key: 'url', type: 'text' },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    />
  );
};
