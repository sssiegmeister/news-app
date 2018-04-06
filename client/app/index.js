import React from 'react';
import {render} from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import { Redirect } from 'react-router'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Source from './components/Source/Source';
import {Provider} from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

import './styles/styles.scss';
import Saved from "./components/Saved/Saved";

render((
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={() => {
            return <Redirect to='/login'/>;
          }}/>
          <Route path="/main" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/articles/:id" component={Source}/>
          <Route path="/saved" component={Saved}/>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
