import React, { useState, useEffect, useRef} from 'react';
import './NotesPart.css' ;
import front from '../../assets/front.png';
import send from '../../assets/enter.svg';
import lock from '../../assets/lock.svg';



function NotesPart({selcGrpName, selcGrpClr}) {

    
  return (
    <div className="container2">
      {selectedGroupName ? (
        <div>
          <div className='title'>
            <span
              className="initials"
              style={{
                backgroundColor: selectedGroupColor,
                fontSize: '20px',
                padding: '10px',
                borderRadius: '50%',
                color: 'white',
                fontWeight: '600',
              }}
            >
              {selectedGroupName.slice(0, 2).toUpperCase()}
            </span>
            <p style={{ fontSize: '20px', display: 'inline', padding: '12px', paddingLeft: '20px', fontWeight: '600' }}>{selectedGroupName}</p>
          </div>
          <div className='notes-display' ref={notesContainerRef}>
            {displayData[selectedGroupName] ? (
              displayData[selectedGroupName].map((showData, index) => (
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
          {selectedGroupName && (
            <p style={{ padding: '10px' }}>Selected Notes Group: {selectedGroupName}</p>
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