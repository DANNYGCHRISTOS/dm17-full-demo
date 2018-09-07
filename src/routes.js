import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/shop" component={Shop} />
  </Switch>
);
