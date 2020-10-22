import React, { Component } from "react";
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
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Layouts} />
            <Route exact path="/laptops" component={Layouts} />
            <Route exact path="/pcs" component={Layouts} />
            <Route exact path="/keyboards" component={Layouts} />
            <Route exact path="/mouses" component={Layouts} />
            <Route exact path="/monitors" component={Layouts} />
            <Route exact path="/graphiccards" component={Layouts} />
            <Route exact path="/customers" component={Layouts} />
            <Route exact path="/laptop/add" component={Layouts} />
            <Route exact path="/laptop/edit/:id" component={Layouts} />
          </Switch>
        </Router>
      </div>
    );
  }
}
