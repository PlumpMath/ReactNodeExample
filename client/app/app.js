// @flow

import React from 'react';
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import CustomerService from './CustomerService'
import CustomerDetailsComponent from './CustomerDetailsComponent'
import CustomerListComponent from './CustomerListComponent'
import AboutComponent from './AboutComponent'

class Menu extends React.Component {
  render() {
    return <div>Menu:
      <a href="/#/">Customers</a>
      <a href="/#/about">About</a>
      </div>;
  }
}

class Routes extends React.Component {
  render() {
    return <Router history={hashHistory}>
      <Route exact path="/" component={CustomerListComponent}/>
      <Route path="/customer/:customerId" component={CustomerDetailsComponent}/>
      <Route path="/about" component={AboutComponent}/>
    </Router>;
  }
}

render(<div>
  <Menu/>
  <Routes/>
</div>, document.getElementById('root'));
