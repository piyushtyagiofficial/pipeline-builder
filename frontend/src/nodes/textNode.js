// TextNode.jsx
import { useState, useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');

  // Extract variables from text using regex
  const extractVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const variables = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const variable = match[1].trim();
      // Validate if it's a valid JavaScript variable name
      if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(variable)) {
        if (!variables.includes(variable)) {
          variables.push(variable);
        }
      }
    }
    
    return variables;
  };

  const variables = useMemo(() => extractVariables(text), [text]);

  // Calculate dynamic dimensions based on text content
  const calculateDimensions = (text) => {
    const lines = text.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length), 20); // Min 20 chars
    
    // Base dimensions
    const minWidth = 280;
    const minHeight = 200;
    
    // Dynamic width (approximately 8 pixels per character, with padding)
    const dynamicWidth = Math.max(minWidth, Math.min(600, maxLineLength * 8 + 100));
    
    // Dynamic height (approximately 24 pixels per line, plus padding for header and fields)
    const dynamicHeight = Math.max(minHeight, lines.length * 24 + 180);
    
    return { width: dynamicWidth, height: dynamicHeight };
  };

  const dynamicSize = useMemo(() => calculateDimensions(text), [text]);

  // Create dynamic handles based on variables
  const dynamicHandles = useMemo(() => {
    const handles = [
      { type: 'source', position: Position.Right, id: 'output' }
    ];
    
    // Add input handles for each variable
    variables.forEach((variable, index) => {
      const topPosition = Math.min(80, 40 + (index * 25)); // Start higher, smaller spacing
      handles.unshift({
        type: 'target',
        position: Position.Left,
        id: variable,
        style: { top: `${topPosition}px` } // Use pixels instead of percentage for better control
      });
    });
    
    return handles;
  }, [variables]);

  return (
    <BaseNode
      id={id}
      title="Text"
      data={{ text }}
      onChange={{ text: setText }}
      fields={[
        { label: 'Text Content', key: 'text', type: 'textarea' },
      ]}
      handles={dynamicHandles}
      customInfo={variables.length > 0 ? `Variables: ${variables.join(', ')}` : null}
      dynamicSize={dynamicSize}
    />
  );
};
