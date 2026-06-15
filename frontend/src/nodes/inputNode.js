// inputNode.js  — rebuilt on BaseNode abstraction
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [name, setName]   = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [type, setType]   = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      category="io"
      outputs={[{ id: 'value', label: 'Value' }]}
      fields={[
        {
          name: 'inputName',
          label: 'Name',
          type: 'text',
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: 'input_1',
        },
        {
          name: 'inputType',
          label: 'Type',
          type: 'select',
          value: type,
          onChange: (e) => setType(e.target.value),
          options: [
            { value: 'Text',   label: 'Text'   },
            { value: 'File',   label: 'File'   },
            { value: 'Number', label: 'Number' },
          ],
        },
      ]}
    />
  );
};
