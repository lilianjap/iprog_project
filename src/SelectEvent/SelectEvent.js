import React, { Component } from 'react';
import './SelectEvent.css';
import Sidebar from '../Sidebar/Sidebar';
import Events from '../Events/Events';
import {modelInstance} from '../data/EventModel';
import { Link } from 'react-router-dom';
import moment, { calendarFormat } from 'moment';
import date from 'react-calendar';

class SelectEvent extends Component {
  constructor(props) {
   super(props);
   this.state = {
     countryCode: '',
     date: '',
    }
    this.searchCountryCode.bind(this)
    this.searchFilter.bind(this)
  }

  componentDidMount = () => {
    modelInstance.addObserver(this)
  }

  searchCountryCode = (event) => {
    this.setState ({countryCode: event.target.value});
  }

   searchType = (event) => {
     this.setState ({type: event.target.value});
   }

   searchFilter = (event) => {
     this.setState ({filter: event.target.value})
   }


   setDate = date => {
     date = new Intl.DateTimeFormat('sv-SV').format(date);
     this.setState({date: date})
   }

   update () {
     this.setState({
       date: date
     })
   }

    componentWillUnmount() {
      modelInstance.removeObserver(this)
    }

    addEvent(e) {
      modelInstance.addEvent('hej')
    }



   render() {
      return (
        <div className="SelectEvent" ><br/><br/>

        <div className='container'>
          <div className='row'>
                      <div className='col-sm-6 center left'>
                        SELECTEVENT COMPONENT
                        {/* LEFT - EVENTS SUGGESTED*/}
                        <div id="accordion" role="tablist" aria-multiselectable="true">
                          <div className="card">
                            <div className="card-header" role="tab" id="headingOne">
                              <h5 className="mb-0">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                  TIMESLOT #1
                                </a>
                              </h5>
                            </div>

                            <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                              <div className="card-block" onClick={this.addEvent}>
                                <button className='link'> Event 1 for timeslot 1 </button> <br/>
                                <button className='link'> Event 2 for timeslot 1 </button> <br/>
                                <button className='link'> Event 3 for timeslot 1 </button> <br/>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" role="tab" id="headingTwo">
                              <h5 className="mb-0">
                                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                  TIMESLOT #2
                                </a>
                              </h5>
                            </div>
                            <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo">
                              <div className="card-block">
                              <button className='link'> Event 1 for timeslot 2 </button> <br/>
                              <button className='link'> Event 2 for timeslot 2 </button> <br/>
                              <button className='link'> Event 3 for timeslot 2 </button> <br/>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-header" role="tab" id="headingThree">
                              <h5 className="mb-0">
                                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                  TIMESLOT #3
                                </a>
                              </h5>
                            </div>
                            <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree">
                              <div className="card-block">
                              <button className='link'> Event 1 for timeslot 3 </button> <br/>
                              <button className='link'> Event 2 for timeslot 3 </button> <br/>
                              <button className='link'> Event 3 for timeslot 3 </button> <br/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

            <Sidebar model={this.props.model}/>
            </div>

            <div className='btnDiv'>
            <Link to="/overview">
              <button className="myBtndiv btn btn-warning btn-warning-text">Confirm and see details</button>
            </Link>
            </div>

        </div>



          {/* We pass the model as property to the Sidebar component
          <Events model={this.props.model} type ={this.state.type} filter = {this.state.filter}/>

          */}
        </div>
      );
    }
  }


export default SelectEvent;
