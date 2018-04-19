import React, {Component} from 'react';
import './Overview.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';

class Overview extends Component {

  componentDidMount() {
    modelInstance.addObserver(this)
  }
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  createNewMenu = (e) => {
    localStorage.clear();
  }

  render() {

    return (
      <div className = "Overview">
        <div className='row' id='overviewHeader'>
          <div className='col-md-10'>
            <h2>Day of events</h2>
          </div>
          <div className='col-md-1 myBtn'>
          <Link to="/search">
            <button type="button" onClick={this.createNewMenu} className="createDinner btn btn-warning btn-warning-text myBtndiv">Go back and edit</button>
          </Link>
          </div>
        </div>

          <div className='row' id='overviewDishes'>
          <div className='dishImage'>

              {modelInstance.getFullMenu().map(ingredient =>
                  <div key={ingredient.dishDeet.id} className='col-sm-2'>

                      <img className='img-responsive' src={ingredient.dishDeet.image}></img>
                          {ingredient.dishDeet.title}
                      <div id='dishPrice' className=''><b>{Math.floor(ingredient.dishDeet.pricePerServing * modelInstance.getNumberOfGuests())} SEK</b></div>
                  </div>
                )
              }
              </div>

              <div className="col-sm-3" id="totalDishPrices">
              Total Price: <br/>
              <span id="PriceTxt">{Math.floor(modelInstance.getFullPrice())} SEK</span>
              </div>
          </div>

        <div id="myBtn2">
        <Link to="/printout">
          <button type="button" onClick={this.createNewMenu} className="printOut btn btn-warning btn-warning-text myBtndiv">Print Full Schedule</button>
        </Link>
        </div>
      </div>
    )
  }
}

export default Overview;
