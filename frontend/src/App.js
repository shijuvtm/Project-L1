// App.js
import { useRef } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI }      from './ui';
import { SubmitButton }    from './submit';
import './index.css';

function App() {
  // tapAdd handler lives in Flow; we wire it up here via a ref
  const tapAddRef = useRef(null);

  const onRegisterTapAdd = (fn) => { tapAddRef.current = fn; };
  const onTapAdd = (type) => { if (tapAddRef.current) tapAddRef.current(type); };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}>
      <PipelineToolbar onTapAdd={onTapAdd} />
      <PipelineUI onRegisterTapAdd={onRegisterTapAdd} />
      <SubmitButton />
    </div>
  );
}

export default App;
