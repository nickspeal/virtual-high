import React, { Component } from 'react';
import Classroom from './Classroom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/Introduction" />} />
          <Route path="/:lesson" component={Classroom} />
        </Switch>
      </Router>
    );
  }
}

export default App;
