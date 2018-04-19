import React, { Component } from 'react';
import {modelInstance} from '../data/EventModel';
import Events from '../Events/Events';

import './WhereWhen.css';
import user_logo from '../media/user_logo.png';
import { Link } from 'react-router-dom';
import  Calendar  from 'react-calendar'; //https://www.npmjs.com/package/react-calendar
import date from 'react-calendar';


class WhereWhen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      countryCode: '',
      date: "",
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

  searchFilter = (event) => {
    this.setState ({filter: event.target.value})
  }

  setDate = date => {
    date = new Intl.DateTimeFormat('sv-SV').format(date);
    this.setState({date: date})
  }

  update() {
    //date = new Intl.DateTimeFormat('sv-SV').format(date);
    this.setState({date: date})
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  render() {
    return (
      <div className='WhereWhen'>
        <div className='row'>
          <Calendar className='col-md-4'
            onChange={this.setDate}
            value={this.state.date}
          />

          <div id="searchInput" className='col-md-8'>
            <form className="form-inline" onSubmit={this.searchSubmit}>
              <div className="row" id="searchRow">
                        <div className="form-group col-md-5">
                          <input id="searchTxt" type="text" name="" placeholder="Search event..." value={this.state.countryCode} onChange={this.searchFilter}/>
                        </div>



                        <div className="form-group col-md-5">
                          <select id="typeDish" name="types" value={this.state.countryCode} onChange={this.searchCountryCode}>
                            <option value="">All</option>
                            <option value="SE">Sweden</option>
                            <option value="NO">Norway</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                          </select>
                        </div>


              </div>
            </form>
            <br/> <br/>
            <Events model={this.props.model} countryCode={this.state.countryCode} date = {this.state.date}/>

          </div>
        </div>



      <div className='btnDiv'>
      <Link to="/search">
        <button className="myBtndiv btn btn-warning btn-warning-text">See time</button>
      </Link>
      </div>

      </div>


    );

    }



}

export default WhereWhen;
