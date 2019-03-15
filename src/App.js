import React, { Component } from 'react';
import Main from './components/Main';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Gallery from './components/Gallery';
import Header from './components/Header';

// Import SASS
import './scss/app.scss'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/gallery" component={Gallery} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
