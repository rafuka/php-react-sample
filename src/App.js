import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/navbar/NavBar';
import Teams from './components/teams/Teams';
import Calendar from './components/calendar/Calendar';
import Error from './components/error/Error';
import Footer from './components/footer/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/teams" />} />
          <Route path="/teams" component={Teams} />
          <Route path="/calendar" component={Calendar} />
          <Route component={() => <Error message="We couldn't find what you're looking for." />} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
