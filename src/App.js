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
import { Helmet } from "react-helmet";

export default function App() {
  const Title = "Van Tech Company";
  return (
    <div className="App">
      <Helmet>
        <title>{Title}</title>
      </Helmet>
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
