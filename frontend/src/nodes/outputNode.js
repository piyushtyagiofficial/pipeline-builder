import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [outputName, setOutputName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      data={{ outputName, outputType }}
      onChange={{
        outputName: setOutputName,
        outputType: setOutputType,
      }}
      fields={[
        { label: 'Name', key: 'outputName', type: 'text' },
        { label: 'Type', key: 'outputType', type: 'select', options: ['Text', 'File'] },
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: 'value' },
      ]}
    />
  );
};
