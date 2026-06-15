// transformNode.js — applies a JS-style transformation to data
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [mode,   setMode]   = useState(data?.mode   || 'map');
  const [script, setScript] = useState(data?.script || 'item => item');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙️"
      category="util"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[{ id: 'out', label: 'Output' }]}
      fields={[
        {
          name: 'mode',
          label: 'Mode',
          type: 'select',
          value: mode,
          onChange: (e) => setMode(e.target.value),
          options: [
            { value: 'map',    label: 'Map'    },
            { value: 'filter', label: 'Filter' },
            { value: 'reduce', label: 'Reduce' },
            { value: 'sort',   label: 'Sort'   },
          ],
        },
        {
          name: 'script',
          label: 'Expression',
          type: 'textarea',
          value: script,
          onChange: (e) => setScript(e.target.value),
          placeholder: 'item => item.value * 2',
          rows: 2,
        },
      ]}
    />
  );
};
