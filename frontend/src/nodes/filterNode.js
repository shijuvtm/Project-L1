// filterNode.js — conditional router: passes items to matched or unmatched
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [field,     setField]     = useState(data?.field     || '');
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value,     setValue]     = useState(data?.value     || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      category="util"
      inputs={[{ id: 'items', label: 'Items' }]}
      outputs={[
        { id: 'matched',   label: 'Matched',   top: '35%' },
        { id: 'unmatched', label: 'Unmatched', top: '65%' },
      ]}
      fields={[
        {
          name: 'field',
          label: 'Field',
          type: 'text',
          value: field,
          onChange: (e) => setField(e.target.value),
          placeholder: 'e.g. status',
        },
        {
          name: 'condition',
          label: 'Condition',
          type: 'select',
          value: condition,
          onChange: (e) => setCondition(e.target.value),
          options: [
            { value: 'contains',    label: 'Contains'     },
            { value: 'equals',      label: 'Equals'       },
            { value: 'starts_with', label: 'Starts with'  },
            { value: 'gt',          label: 'Greater than' },
            { value: 'lt',          label: 'Less than'    },
          ],
        },
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          value: value,
          onChange: (e) => setValue(e.target.value),
          placeholder: 'comparison value',
        },
      ]}
    />
  );
};
