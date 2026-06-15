// noteNode.js — sticky-note comment node (no handles)
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(data?.note || '💡 Add a note…');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="🗒️"
      category="warn"
      style={{ minWidth: 200, opacity: 0.92 }}
      fields={[
        {
          name: 'note',
          label: 'Comment',
          type: 'textarea',
          value: text,
          onChange: (e) => setText(e.target.value),
          rows: 3,
          placeholder: 'Describe this part of the pipeline…',
        },
      ]}
    />
  );
};
