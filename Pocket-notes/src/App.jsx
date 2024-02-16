import { useState } from 'react';
import './App.css';
import SidePart from './components/SidePart/SidePart';
import NotesPart from './components/NotesPart/NotesPart';


function App() {
  const [selcGrpName, setSelcGrpName] = useState('');
  const [selcGrpClr, setSelcGrpClr] = useState('');

  return (
    <div className='container'>
      <SidePart
        setSelcGrpName={setSelcGrpName}
        setSelcGrpClr={setSelcGrpClr}
      />
      <NotesPart
        selcGrpName={selcGrpName}
        selcGrpClr={selcGrpClr}
      />
    </div>
  );
}

export default App
