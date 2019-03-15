import React, { Component, lazy, Suspense } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/Header';

// Import SASS
import './scss/app.scss'

const Gallery =  lazy(() => import('./components/Gallery'));
const Main =  lazy(() => import('./components/Main'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Header />
          <Suspense fallback={'Loading...'}>
            <Switch>
                <Route path="/" exact component={ Main } />
                <Route path="/gallery" component={ Gallery } />
            </Switch>
          </Suspense>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
