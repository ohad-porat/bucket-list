import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js"
import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import LandingPage from "./layout/LandingPage.js"
import AllTablesList from "./layout/AllTablesList.js"
import MyTablesList from "./layout/MyTablesList.js"
import ShowTable from "./layout/ShowTable.js"
import EditTableForm from "./layout/EditTableForm.js"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(() => {
        setCurrentUser(null)
      })
  }, [])
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <LandingPage user={currentUser} />
        </Route>
        <Route exact path="/all-tables" component={AllTablesList} />
        <AuthenticatedRoute exact path="/:userId/my-tables" component={MyTablesList} user={currentUser} />
        <Route exact path="/tables/:tableId">
          <ShowTable user={currentUser} />
        </Route>
        <Route exact path="/tables/:tableId/edit" component={EditTableForm} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  )
}

export default hot(App)
