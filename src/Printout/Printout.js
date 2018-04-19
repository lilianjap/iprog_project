import React, {Component} from 'react';
import './Printout.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';


class Printout extends Component {

  componentDidMount() {
    modelInstance.addObserver(this)
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  render() {

    return (
      <div className = "Printout">
      <div className='header'>
        <h2>Events planned for [date]!</h2>
      </div>

      <div className="myBtndiv">
      <Link to="/search">
        <button type="button" className="myBtndiv goBack btn btn-warning btn-warning-text">Go back and edit dinner</button>
      </Link>
      </div>

      <div id="dishdiv">
        <div className='table-responsive'>
          <table className='table'>
          <tbody className="tbody" >

          {modelInstance.getFullMenu().map(ingredient =>

              <tr key={ingredient.dishDeet}>
                  <td className='dishImage col-sm-6'>
                    <img className='img-responsive' src={ingredient.dishDeet.image}></img>
                  </td>
                  <td className='dishTitle col-sm-3'><h3>
                      {ingredient.dishDeet.title}
                  </h3></td>
                  <td className='dishDescription col-sm-5'>
                  {ingredient.dishDeet.instructions}
                  </td>
              </tr>
            )
          }

          </tbody>
          </table>
        </div>
      </div>

      </div>

    )
  }
}

export default Printout;
