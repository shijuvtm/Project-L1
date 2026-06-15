// toolbar.js
import { DraggableNode } from './draggableNode';
import './toolbar.css';

const NODE_CATALOG = [
  { type: 'customInput',  label: 'Input',     icon: '📥', group: 'Core' },
  { type: 'customOutput', label: 'Output',    icon: '📤', group: 'Core' },
  { type: 'llm',          label: 'LLM',       icon: '🤖', group: 'Core' },
  { type: 'text',         label: 'Text',      icon: '📝', group: 'Core' },
  { type: 'math',         label: 'Math',      icon: '➕', group: 'Logic' },
  { type: 'filter',       label: 'Filter',    icon: '🔍', group: 'Logic' },
  { type: 'transform',    label: 'Transform', icon: '⚙️', group: 'Logic' },
  { type: 'api',          label: 'API',       icon: '🌐', group: 'Integration' },
  { type: 'note',         label: 'Note',      icon: '🗒️', group: 'Utility' },
];

export const PipelineToolbar = ({ onTapAdd }) => {
  const groups = [...new Set(NODE_CATALOG.map((n) => n.group))];

  return (
    <header className="toolbar">
      <div className="toolbar__brand">
        <span className="toolbar__logo">⚡</span>
        <span className="toolbar__name">VectorShift</span>
      </div>

      <div className="toolbar__groups">
        {groups.map((group) => (
          <div key={group} className="toolbar__group">
            <span className="toolbar__group-label">{group}</span>
            <div className="toolbar__nodes">
              {NODE_CATALOG.filter((n) => n.group === group).map((n) => (
                <DraggableNode
                  key={n.type}
                  type={n.type}
                  label={n.label}
                  icon={n.icon}
                  onTapAdd={onTapAdd}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};
