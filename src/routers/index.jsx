import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import loadable from "./../utils/loadable";

const Home = loadable(() => import(/* webpackChunkName: 'home' */ "./../pages/home"));
const About = loadable(() => import(/* webpackChunkName: 'about' */ "./../pages/about"));

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/index" />} />
        <Route path="/index" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
};