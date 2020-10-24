import React from "react";
import "./App.css";
import Layouts from "./layouts/Layouts";
import Login from "./layouts/Login";
import ProtectedRoute from "./guard/ProtectedRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/*" component={Layouts} />
           {/* muon lay het path co trong layout thi cho path cho /* la dc */}
        </Switch>
      </Router>
    </div>
  );
}
