import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [inputName, setInputName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      data={{ inputName, inputType }}
      onChange={{
        inputName: setInputName,
        inputType: setInputType,
      }}
      fields={[
        { label: 'Name', key: 'inputName', type: 'text' },
        { label: 'Type', key: 'inputType', type: 'select', options: ['Text', 'File'] },
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: 'value' },
      ]}
    />
  );
};
