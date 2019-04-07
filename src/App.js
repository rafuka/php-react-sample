import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/navbar/NavBar';
import Teams from './components/teams/Teams';
import Calendar from './components/calendar/Calendar';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/teams" />} />
          <Route path="/teams" component={Teams} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </Router>
    );
  }
}

export default App;
