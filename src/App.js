import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import FuncionariosList from './components/FuncionariosList';
import FuncionariosForm from './components/FuncionariosForm';

import Navigation from './Navigation';

import seidorLogo from './seidorLogo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="App-header">
          <img src={seidorLogo} className="App-logo" alt="logo" />
          <h2>Teste Técnico Seidor </h2>
        </div>
        <Navigation context={this.context} />
        <div className="routes">
          <Switch>
            <Route exact path="/FuncionariosList" component={FuncionariosList} />
            <Route path="/FuncionariosForm" component={FuncionariosForm} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
