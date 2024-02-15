import React, { useState, useEffect, useRef} from 'react';
import './NotesPart.css' ;
import front from '../../assets/front.png';
import send from '../../assets/enter.svg';
import lock from '../../assets/lock.svg';



function NotesPart({selcGrpName, selcGrpClr}) {
  const [data, setData] = useState('');
  const [displayData, setDisplayData] = useState(()=>{
    const storedData = localStorage.getItem('notes');
    return storedData ? JSON.parse(storedData) : {};
  });
  const notesContainerRef = useRef(null);

  const handleChange = (e)=>{
    setData(e.target.value);
    
  }

  const handleEnter =()=>{
    if(data.trim() !== ''){
      const now = new Date();
      const formattedTimeStamp = formatDateTime(now);
      const newData = {text: data, datetime: formattedTimeStamp};
      setDisplayData((prevNotes)=>({
        ...prevNotes,
        [selcGrpName]: [...(prevNotes[selcGrpName] || []), newData],
      }))
      setData('');
    }
  }
  useEffect(() => {
    const storedData = localStorage.getItem('notes');
    if (storedData) {
      setDisplayData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(displayData));
  }, [displayData]);

  const formatDateTime = (date) => {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    const dateTimeString = `${formattedTime}\n${formattedDate}`;

  return dateTimeString;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleEnter();
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
    }
  }, [displayData]);

    
  return (
    <div className="container2">
      {selcGrpName ? (
        <div>
          <div className='title'>
            <span
              className="initials"
              style={{
                backgroundColor: selcGrpClr,
                fontSize: '20px',
                padding: '10px',
                borderRadius: '50%',
                color: 'white',
                fontWeight: '600',
              }}
            >
              {selcGrpName.slice(0, 2).toUpperCase()}
            </span>
            <p style={{ fontSize: '20px', display: 'inline', padding: '12px', paddingLeft: '20px', fontWeight: '600' }}>{selcGrpName}</p>
          </div>
          <div className='notes-display' ref={notesContainerRef}>
            {displayData[selcGrpName] ? (
              displayData[selcGrpName].map((showData, index) => (
                <div key={index} className='notes-align'>
                  <pre style={{ width: '15vw', textAlign: 'center', fontFamily: 'DM Sans, sans-serif'  }}>{showData.datetime}</pre>
                  <pre style={{ width: '55vw', marginLeft: '5%', fontFamily: 'DM Sans, sans-serif' }}>{showData.text}</pre>
                </div>
              ))
            ) : (
              <p>No notes available for this group.</p>
            )}
          </div>
          <div className='notes-input'>
            <textarea className='textarea' placeholder='Enter your text here...' value={data} onChange={handleChange} onKeyDown={handleKeyDown}></textarea>
            <img className='enter' src={enter} onClick={handleEnter} />
          </div>
        </div>
      ) : (
        <div className="home">
          <img src={frontImg} width={500} alt="Front" />
          <p style={{ fontSize: '30px' }}>Pocket Notes</p>
          {selcGrpName && (
            <p style={{ padding: '10px' }}>Selected Notes Group: {selcGrpName}</p>
          )}
           <p style={{ padding: '10px' }}>
            Send and receive messages without keeping your phone online,<br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
          <div style={{ position: 'absolute', bottom: '10px' }}>
            <img src={lock} alt="Lock" />
            <p style={{ display: 'inline', position: 'relative', bottom: '5px', paddingLeft: '5px' }}>
              end-to-end encrypted
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

export default NotesPart;