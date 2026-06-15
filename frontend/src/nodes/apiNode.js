// apiNode.js — HTTP request node
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method,  setMethod]  = useState(data?.method  || 'GET');
  const [url,     setUrl]     = useState(data?.url     || '');
  const [headers, setHeaders] = useState(data?.headers || '');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      category="default"
      inputs={[
        { id: 'body',  label: 'Body',  top: '40%' },
        { id: 'auth',  label: 'Auth',  top: '65%' },
      ]}
      outputs={[
        { id: 'response', label: 'Response', top: '35%' },
        { id: 'error',    label: 'Error',    top: '65%' },
      ]}
      fields={[
        {
          name: 'method',
          label: 'Method',
          type: 'select',
          value: method,
          onChange: (e) => setMethod(e.target.value),
          options: [
            { value: 'GET',    label: 'GET'    },
            { value: 'POST',   label: 'POST'   },
            { value: 'PUT',    label: 'PUT'    },
            { value: 'PATCH',  label: 'PATCH'  },
            { value: 'DELETE', label: 'DELETE' },
          ],
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          value: url,
          onChange: (e) => setUrl(e.target.value),
          placeholder: 'https://api.example.com/endpoint',
        },
        {
          name: 'headers',
          label: 'Headers (JSON)',
          type: 'textarea',
          value: headers,
          onChange: (e) => setHeaders(e.target.value),
          placeholder: '{"Authorization": "Bearer ..."}',
          rows: 2,
        },
      ]}
    />
  );
};
