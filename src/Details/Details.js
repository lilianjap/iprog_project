import React, {Component} from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';
import Sidebar from '../Sidebar/Sidebar';

let dinnerDetails;

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      dishDeet: [],
      totalPrice: 0,
    };
  }

  componentDidMount = () => {
    modelInstance.addObserver(this)
    modelInstance.getDish(modelInstance.getId()).then(dish =>
      this.setState({status: 'LOADED',
                    dishDeet: dish
                    })).catch(error =>
        this.setState({ status: 'ERROR' }))

    }

  componentWillUnmount = () => {
    modelInstance.removeObserver(this);
  }

  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests()
    })
  }

  addToMenu = function(e) {
    modelInstance.addDishToMenu(modelInstance.dishDetails);
  }


  render() {
    switch (this.state.status) {
      case 'INITIAL':
        return(
          <div className='Details'>
          <Sidebar model={this.props.model}/>
            <div className='loading'> Loading... </div>
          </div>
        )
        break;


      case 'LOADED':
        modelInstance.dishDetails = this.state;
        const {dishDeet} = this.state;

        localStorage.setItem("DO", JSON.stringify(this.state))
        let dishDeet2 = JSON.parse(localStorage.getItem("DO")).dishDeet;

        return (
          <div>
            <Sidebar model={modelInstance.dishDetails}/>
            <div className ="Details">
              <div className='col-sm-5' id='colImg'>
              <img alt='dishImg' id='dishImg' src={dishDeet2.image}></img>

              <h3> Preparation </h3> {dishDeet2.instructions} <br/>

              <Link to="/search">
                <button className="myBtndiv btn btn-warning btn-warning-text">Back to Search</button>
              </Link>
              </div>

              <div id='detailsmenu' className='col-sm-4'>
                <div id = {dishDeet2.id}>
                    <h3> {dishDeet2.title} </h3>

                    {dishDeet2.extendedIngredients.map(ingredient =>
                    <div className="Details" key = {ingredient.name}>
                      <div className='col-xs-2'> {Math.floor(ingredient.amount*modelInstance.getNumberOfGuests())}</div>
                      <div className='col-xs-4'>{ingredient.unit}</div>
                      <div className='col-xs-6'>{ingredient.name}</div>
                    </div>
                    )}

                    <div id='detailRow' className='row'>
                      <div className='col-xs-5 price'>Price: {Math.floor(dishDeet2.pricePerServing * modelInstance.getNumberOfGuests())} SEK</div>
                      <div id='myBtn2' className='col-xs-6'>
                        <button type='button' onClick={this.addToMenu} className='btn btn-warning btn-warning-text'>Add to menu</button>
                      </div>
                    </div>
                </div>
              </div>



            </div>
            </div>


        )

        break;
      default:
          return (
              <div className='Details'>
                  <div id='details' className='col-sm-8'>
                    <div className='failed'> <b>Failed to load data, please try again</b> </div>
                  </div>
              </div>
            )
       break;
    }


    return (
      <div classNameName="Details">
      </div>
    )
  }
}

export default Details;
