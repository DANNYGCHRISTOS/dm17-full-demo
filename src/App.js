import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import routes from './routes';
import './App.css';

import Header from './components/Header/Header';

// RENDER OUR ROUTES

// NOTES:
// Look at package.json for nodemon config
// Look at packahe.json for proxy
// Use the schema.sql to keep track of db structure
// Everyone loves a good easter egg

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Header />
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
