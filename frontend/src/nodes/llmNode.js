// llmNode.js  — rebuilt on BaseNode abstraction
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      category="ai"
      inputs={[
        { id: 'system', label: 'System',  top: '33%' },
        { id: 'prompt', label: 'Prompt',  top: '66%' },
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
      ]}
      fields={[
        {
          name: 'model',
          label: 'Model',
          type: 'select',
          value: model,
          onChange: (e) => setModel(e.target.value),
          options: [
            { value: 'gpt-4o',          label: 'GPT-4o'          },
            { value: 'gpt-4o-mini',     label: 'GPT-4o Mini'     },
            { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
            { value: 'gemini-1.5-pro',  label: 'Gemini 1.5 Pro'  },
          ],
        },
        {
          name: 'info',
          type: 'info',
          value: 'Connect a system prompt on the top-left and a user prompt on the bottom-left.',
        },
      ]}
    />
  );
};
