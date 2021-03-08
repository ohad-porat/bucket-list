import React from "react"
import { Link } from "react-router-dom"

import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in" id="sign-in">
      <Link to="/user-sessions/new"className="top-bar-link">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button sign-up-button">Sign Up</Link>
    </li>,
  ]

  let username = ""
if (user) {
  username = user.userName
}
  const authenticatedListItems = [
    <li key="hello-user" className="hello-user">Hello, {username}
    </li>,
    <li key="sign-out" id="sign-out">
      <SignOutButton />
    </li>,
  ]

  let authenticatedLeftNavbar
  if (user) {
    authenticatedLeftNavbar = (
      <li>
        <Link to={`/${user.id}/my-tables`} className="top-bar-link" id="my-tables">My Tables</Link>
      </li>
    )
  }

  const unauthenticatedLeftNavBar = ""

  return (
    <div className="top-bar">
      <Link to="/" className="top-bar-logo-link">
        <img src="https://i.ibb.co/r3DCrp4/logo.png" alt="Website Logo" className="top-bar-logo" />
      </Link>
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <Link to="/all-tables" className="top-bar-link" id="all-tables">All Tables</Link>
          </li>
          {user ? authenticatedLeftNavbar : unauthenticatedLeftNavBar}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          {user ? authenticatedListItems : unauthenticatedListItems}
        </ul>
      </div>
    </div>
  )
}

export default TopBar
