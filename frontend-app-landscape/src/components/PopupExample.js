import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Try.css'

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontend: true,
      backend: false,
      user: 55,
      date: "2021-01-01"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }
 render(){
  var person = {Frontend: this.state.frontend, Backend: this.state.backend,
  User: this.state.user, Date: this.state.date}
  console.log(person);
  return(
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
                name="frontend" type="checkbox"
                checked={this.state.frontend}
                onChange={this.handleInputChange}
              />
            </label>
          </form>
          <form>
          <label>
              Backend:
              <input
                name="backend"            type="checkbox"
                checked={this.state.backend}
                onChange={this.handleInputChange}
            />
            </label>
          </form>
          <form>
          <label>
              Number of users: 
              <input style={{width: '75px'}}
                name="user"            type="number"
                value={this.state.user}
                onChange={this.handleInputChange}
            />
            </label>
          </form>
          <form>
            <label>
              Date of creation:
              <input
              name="date" type="Date"
              value={this.state.date}
              onChange={this.handleInputChange}
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
  )
 }
}
  

  