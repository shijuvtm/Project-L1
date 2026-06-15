// mathNode.js — arithmetic operation on two numeric inputs
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [op, setOp] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="➕"
      category="util"
      inputs={[
        { id: 'a', label: 'A (top)',    top: '33%' },
        { id: 'b', label: 'B (bottom)', top: '66%' },
      ]}
      outputs={[{ id: 'result', label: 'Result' }]}
      fields={[
        {
          name: 'operation',
          label: 'Operation',
          type: 'select',
          value: op,
          onChange: (e) => setOp(e.target.value),
          options: [
            { value: 'add',      label: 'Add  (A + B)'  },
            { value: 'subtract', label: 'Subtract (A − B)' },
            { value: 'multiply', label: 'Multiply (A × B)' },
            { value: 'divide',   label: 'Divide  (A ÷ B)'  },
            { value: 'modulo',   label: 'Modulo  (A % B)'  },
          ],
        },
      ]}
    />
  );
};
