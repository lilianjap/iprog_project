import React, {Component} from 'react';
import './Events.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';
import SelectDish from '../SelectEvent/SelectEvent'

let URI = "https://spoonacular.com/recipeImages/";
let i;
let j;
let eventList = [];

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      data: [],
      countryCode: this.props.countryCode,
      date: this.props.date
    };
  }

  loadData (props) {
    modelInstance.getEventsPerCity(props.countryCode).then(eventsPerCity =>
      this.setState({
        status: 'LOADED',
        data: eventsPerCity._embedded.events,
        countryCode: props.countryCode,
        date: props.date
        })).catch(error =>
          this.setState({
            status: 'ERROR'
          }))
          console.log('data loggas')
  }

  componentDidMount = () => {
    this.loadData(this.props)
  }

  getDetails = (e) => {
    modelInstance.setId(e.target.id);
  }

  componentWillReceiveProps = (props) => {
    this.loadData(props)
  }

  checkEvent = (data) => {
    alert(this.props.date);
  }

  render() {
    switch (this.state.status) {
      case 'INITIAL':
        return (
          <div className='Events'>
            <div className='loading'> Loading... </div>
          </div>
        )
        break;
      case 'LOADED':
        eventList.length = 0;
        const {data} = this.state;
        for (i in data) {
          if (data[i].dates.start.localDate == this.state.date && this.state.countryCode == data[i]._embedded.venues[0].country.countryCode){
          eventList.push(data[i])}
        }

        return (
            <div className ="Events">
            <div id='Events' className='col-sm-12'>
            {eventList.map(event =>
              <div className="col-sm-3" key={event.id}>
                <div>
                  <div className="">
                    <div className='col-xs-2'> <b> {event.name} </b> {event.url} {event.dates.start.localDate}</div>
                  </div>
                </div>
              </div>)}
            </div>
            </div>
            )
        break;
      default:
        return (
          <div className='Events'>
          <div id='Events' className='col-sm-8'>
            <div className='failed'> <b>Failed to load data, please try again</b> </div>
          </div>
          </div>
        )
        break;
      }

      return (
        <div className="Events">
        </div>
      )
  }
}

export default Events;
