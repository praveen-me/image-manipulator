import React, { Component } from 'react';
import Main from './components/Main';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Gallery from './components/Gallery';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/gallery" component={Gallery} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
