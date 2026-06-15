// BaseNode.js
// Core reusable abstraction for all pipeline nodes.
// Pass inputs[], outputs[], fields[], and optional children — the rest is handled here.

import { Handle, Position } from 'reactflow';
import './BaseNode.css';

/**
 * BaseNode renders a styled card with:
 *  - Left-side target handles (inputs)
 *  - Right-side source handles (outputs)
 *  - A header with title + optional icon
 *  - A body that renders declared `fields` OR custom `children`
 *
 * @param {string}   id         Node id from ReactFlow
 * @param {string}   title      Header label
 * @param {string}   [icon]     Emoji icon shown in header
 * @param {string}   [category] Color-codes the header accent (default | ai | io | util)
 * @param {Array}    [inputs]   [{id, label, top?}] — left-side handles
 * @param {Array}    [outputs]  [{id, label, top?}] — right-side handles
 * @param {Array}    [fields]   [{name, label, type, value, onChange, options?, placeholder?, rows?}]
 * @param {object}   [style]    Extra wrapper styles (e.g. dynamic width/height)
 * @param {ReactNode}[children] Custom body content; replaces fields when provided
 */
export const BaseNode = ({
  id,
  title,
  icon,
  category = 'default',
  inputs = [],
  outputs = [],
  fields = [],
  style = {},
  children,
}) => {

  // Evenly distribute handles unless a custom `top` is supplied
  const handleTop = (index, total, customTop) => {
    if (customTop !== undefined) return { top: customTop };
    if (total === 1) return { top: '50%' };
    return { top: `${((index + 1) / (total + 1)) * 100}%` };
  };

  return (
    <div className={`vs-node vs-node--${category}`} style={style}>

      {/* ── Left handles (inputs / targets) ── */}
      {inputs.map((inp, i) => (
        <Handle
          key={inp.id}
          type="target"
          position={Position.Left}
          id={`${id}-${inp.id}`}
          className="vs-handle vs-handle--target"
          style={handleTop(i, inputs.length, inp.top)}
          title={inp.label || inp.id}
        />
      ))}

      {/* ── Header ── */}
      <div className="vs-node__header">
        {icon && <span className="vs-node__icon">{icon}</span>}
        <span className="vs-node__title">{title}</span>
      </div>

      {/* ── Body ── */}
      <div className="vs-node__body">
        {children != null
          ? children
          : fields.map((f) => <NodeField key={f.name} field={f} />)
        }
      </div>

      {/* ── Right handles (outputs / sources) ── */}
      {outputs.map((out, i) => (
        <Handle
          key={out.id}
          type="source"
          position={Position.Right}
          id={`${id}-${out.id}`}
          className="vs-handle vs-handle--source"
          style={handleTop(i, outputs.length, out.top)}
          title={out.label || out.id}
        />
      ))}
    </div>
  );
};

// ── Field renderer ────────────────────────────────────────────────────────────
const NodeField = ({ field }) => {
  const {
    label,
    type = 'text',
    value,
    onChange,
    options = [],
    placeholder = '',
    rows = 3,
    readOnly = false,
  } = field;

  return (
    <div className="vs-field">
      {label && <label className="vs-field__label">{label}</label>}

      {type === 'select' && (
        <select className="vs-field__select" value={value} onChange={onChange}>
          {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>
              {o.label ?? o}
            </option>
          ))}
        </select>
      )}

      {type === 'textarea' && (
        <textarea
          className="vs-field__textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly}
        />
      )}

      {type === 'checkbox' && (
        <input
          className="vs-field__checkbox"
          type="checkbox"
          checked={!!value}
          onChange={onChange}
        />
      )}

      {(type === 'text' || type === 'number' || type === 'password') && (
        <input
          className="vs-field__input"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      )}

      {type === 'info' && (
        <p className="vs-field__info">{value}</p>
      )}
    </div>
  );
};

export default BaseNode;
