import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/EventModel'
import SelectEvent from "./SelectEvent/SelectEvent";
import Details from "./Details/Details";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";
import WhereWhen from "./WhereWhen/WhereWhen";




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "LET'S",
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1 className="App-title">{this.state.title}</h1>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectEvent model={modelInstance}/>}/>
          <Route path="/details" render={() => <Details model={modelInstance}/>}/>
          <Route path="/overview" render={() => <Overview model={modelInstance}/>}/>
          <Route path="/printout" render={() => <Printout model={modelInstance}/>}/>
          <Route path="/wherewhen" render={() => <WhereWhen model={modelInstance}/>}/>


        </header>
      </div>
    );
  }
}

export default App;
