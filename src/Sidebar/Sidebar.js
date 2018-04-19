import React, { Component } from 'react';
import './Sidebar.css';
import {modelInstance} from '../data/EventModel';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenu: modelInstance.getFullMenu()
    }
  }

  componentDidMount() {
    modelInstance.addObserver(this)
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      fullMenu: modelInstance.getFullMenu(),
    })
  }

  changeGuest = (e) => {
    if (e.target.getAttribute('id') === 'minus' && modelInstance.getNumberOfGuests() !== 0){
      modelInstance.setNumberOfGuests(modelInstance.getNumberOfGuests() - 1);
    }
    else if (e.target.getAttribute('id') === 'plus'){
        modelInstance.setNumberOfGuests(modelInstance.getNumberOfGuests() + 1);
      }
  }

  removeEvent = (e) => {
    modelInstance.removeDishFromMenu(e.target.id);
    //modelInstance.removeDishFromMenu();
  }

  render() {

    return (
      <div className="Sidebar" >
        <div className='col-sm-6 center right'>
          SIDEBAR COMPONENT <br/>
                {modelInstance.getFullMenu().map (index =>
                <div key={index}>
                  <div className='row'>
                    <div className='col-xs-3' onClick={this.removeEvent}>
                      <b id={index}>X</b>
                    </div>
                    <div className='col-xs-9'>
                     {index}
                    </div>
                  </div>
                </div>
                )}

          </div>
      </div>
    );
  }
}

export default Sidebar;
