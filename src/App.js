import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes';

class App extends Component {




  render() {
    return (
      <div className="App">
      <div className="app_routes_container">
            {routes()}
          </div>
      </div>
    );
  }
}

export default App;
