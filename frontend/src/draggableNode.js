// draggableNode.js — tap to add (mobile) + drag to place (desktop)
import './draggableNode.css';

export const DraggableNode = ({ type, label, icon, onTapAdd }) => {
  // Desktop: drag and drop
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  // Mobile: single tap adds node to center of canvas
  const onTap = (e) => {
    e.preventDefault();
    if (onTapAdd) onTapAdd(type);
  };

  return (
    <div
      className="drag-node"
      draggable
      onDragStart={onDragStart}
      onClick={onTap}
      title={`Click to add a ${label} node`}
    >
      {icon && <span className="drag-node__icon">{icon}</span>}
      <span className="drag-node__label">{label}</span>
    </div>
  );
};
