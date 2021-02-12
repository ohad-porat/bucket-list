import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import IndexPage from "./layout/IndexPage.js"
import AllTablesList from "./layout/AllTablesList.js"
import MyTablesList from "./layout/MyTablesList.js"
import ShowTable from "./layout/ShowTable.js"

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
          <IndexPage user={currentUser} />
        </Route>
        <Route exact path="/all-tables" component={AllTablesList} />
        <Route exact path="/my-tables">
          <MyTablesList user={currentUser} />
        </Route>
        <Route exact path="/tables/:tableId" component={ShowTable} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  )
}

export default hot(App)
