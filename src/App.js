import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import MyNavBar from './components/MyNavBar/MyNavBar';
import MainView from './components/MainView/MainView';

class App extends Component {

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <MyNavBar/>
          </header>
          <MainView/>
        </div>
    );
  }
}

export default (App);
