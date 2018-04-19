import React, { Component } from 'react';
import './Welcome.css';
import user_logo from '../media/user_logo.png';
import { Link } from 'react-router-dom';

class Welcome extends Component {

  classifyEvent (e) {
    console.log(e.target.id)
  }

  render() {
    return (
      <div className="Welcome">
        <p id="texthome">
            PLAN YOUR DAY!
            <br/><br/>
            Who are you?
        </p>

        <div class="container">
            <div class="row">
              <div class="col">
                  <div key='' baseuri='' className='userImage' onClick={this.classifyEvent}>
                  <button className='imgbtn' type='submit' ><img id='couples' className='img-responsive' src={user_logo}></img>Couples</button>
                  </div>
              </div>
              <div class="col">
                  <div key='' baseuri='' className='userImage' onClick={this.classifyEvent}>
                  <button className='imgbtn' type='submit' ><img id='family' className='img-responsive' src={user_logo}></img><br/>Family</button>
                  </div>
              </div>
              <div class="col">
                  <div key='' baseuri='' className='userImage' onClick={this.classifyEvent}>
                  <button className='imgbtn' type='submit' ><img id='single' className='img-responsive' src={user_logo}></img><br/>Single</button>
                  </div>
              </div>
              <div class="col">
                  <div key='' baseuri='' className='userImage' onClick={this.classifyEvent}>
                  <button className='imgbtn' type='submit' ><img id='friends' className='img-responsive' src={user_logo}></img><br/>Friends</button>
                  </div>
              </div>
            </div>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>

        <Link to="/wherewhen">
          <button className="myBtndiv btn btn-warning btn-warning-text">Start planning</button>
        </Link>
        <br/>
        {/*
        <Link to="/search">
          <button className="myBtndiv btn btn-warning btn-warning-text">Search event</button>
        </Link>
        */}
      </div>
    );
  }
}

export default Welcome;
