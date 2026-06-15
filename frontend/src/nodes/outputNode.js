// outputNode.js  — rebuilt on BaseNode abstraction
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName]   = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [type, setType]   = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      category="io"
      inputs={[{ id: 'value', label: 'Value' }]}
      fields={[
        {
          name: 'outputName',
          label: 'Name',
          type: 'text',
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: 'output_1',
        },
        {
          name: 'outputType',
          label: 'Type',
          type: 'select',
          value: type,
          onChange: (e) => setType(e.target.value),
          options: [
            { value: 'Text',  label: 'Text'  },
            { value: 'Image', label: 'Image' },
            { value: 'File',  label: 'File'  },
          ],
        },
      ]}
    />
  );
};
