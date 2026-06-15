// textNode.js  — Part 3: auto-resize + {{ variable }} → dynamic Handles

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';
import './textNode.css';

// Regex: matches {{ validJSIdentifier }} with optional whitespace inside braces
const VAR_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const MIN_W = 230;
const MAX_W = 480;
const MIN_H = 100;    // header + padding; body grows on top of this
const CHAR_W = 7.5;   // approximate px per character at 12px Inter

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // ── Derive unique variable names from {{ }} patterns ──────────────────────
  const variables = useMemo(() => {
    const found = new Set();
    for (const m of text.matchAll(VAR_REGEX)) found.add(m[1]);
    return [...found];
  }, [text]);

  // ── Compute dynamic node dimensions based on content ──────────────────────
  const [dims, setDims] = useState({ width: MIN_W, height: MIN_H });

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    // Let browser measure the natural scroll height
    ta.style.height = 'auto';
    const sh = ta.scrollHeight;
    ta.style.height = sh + 'px';

    // Width: longest line × char-width, clamped
    const lines = text.split('\n');
    const maxLen = Math.max(...lines.map((l) => l.length));
    const newW = Math.min(MAX_W, Math.max(MIN_W, maxLen * CHAR_W + 60));

    // Height: header (~38px) + padding (20px) + labels (~28px) + textarea
    const newH = 38 + 20 + 28 + sh + 16;

    setDims({ width: newW, height: Math.max(MIN_H, newH) });
  }, [text]);

  // ── Variable handle vertical positioning ─────────────────────────────────
  const varHandleTop = (idx, total) => {
    if (total === 1) return '50%';
    return `${((idx + 1) / (total + 1)) * 100}%`;
  };

  return (
    <div
      className="vs-node vs-node--default text-node"
      style={{ width: dims.width, minHeight: dims.height }}
    >
      {/* Dynamic input handles — one per {{ variable }} */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          className="vs-handle vs-handle--target"
          style={{ top: varHandleTop(i, variables.length) }}
          title={v}
        />
      ))}

      {/* Header */}
      <div className="vs-node__header">
        <span className="vs-node__icon">📝</span>
        <span className="vs-node__title">Text</span>
      </div>

      {/* Body */}
      <div className="vs-node__body">
        <div className="vs-field">
          <label className="vs-field__label">Text</label>
          <textarea
            ref={textareaRef}
            className="vs-field__textarea text-node__textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text… use {{ varName }} to add inputs"
            rows={1}
          />
        </div>

        {/* Variable pills */}
        {variables.length > 0 && (
          <div className="text-node__vars">
            {variables.map((v) => (
              <span key={v} className="text-node__var-pill">
                {`{{ ${v} }}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Fixed output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="vs-handle vs-handle--source"
        style={{ top: '50%' }}
        title="output"
      />
    </div>
  );
};
