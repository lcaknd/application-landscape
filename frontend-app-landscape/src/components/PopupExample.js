import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Try.css'

export default () => (
    <Popup
      trigger={<button className="popup-content"> Open Modal </button>}
      modal
      nested
    >
      {close => (
        <div className="popup-content">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Modal Title </div>
          <div className="menu">
          <form>
            <label>
              Frontend:
              <input
                name="Frontend" type="checkbox"
              />
            </label>
          </form>
          <form>
          <label>
              Backend:
              <input
                name="Backend"            type="checkbox"
            />
            </label>
          </form>
          <form>
          <label>
              Number of users: 
              <input style={{width: '75px'}}
                name="Frontend"            type="number"
            />
            </label>
          </form>
  </div>
          <div className="actions">
            <button
              className="button"
              onClick={() => {
                console.log('modal closed ');
                close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );

  