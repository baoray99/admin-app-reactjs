import React, { Component } from "react";
// import Items from "./components/Items";
// import Counter from './components/Counter'
import "./App.css";
import Layouts from "./layouts/Layouts";
import Login from "./layouts/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Redirect exact from="/" to="/login" /> 
            {/* phai co exact */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Layouts} />
          </Switch>
        </Router>
      </div>
    );
  }
}
