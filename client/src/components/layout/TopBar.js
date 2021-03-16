import React from "react"
import { Link } from "react-router-dom"

import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedRightNavBar = [
    <li key="sign-in" id="sign-in" className="top-bar-user">
      <Link to="/user-sessions/new"className="top-bar-link">Sign In</Link>
    </li>,
    <li key="sign-up" className="top-bar-user">
      <Link to="/users/new" className="button sign-up-button">Sign Up</Link>
    </li>,
  ]

  let username = ""
if (user) {
  username = user.userName
}
  const authenticatedRightNavBar = [
    <li key="hello-user" className="hello-user top-bar-user">Hello, {username}
    </li>,
    <li key="sign-out" id="sign-out" className="top-bar-user">
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
          {user ? authenticatedRightNavBar : unauthenticatedRightNavBar}
          <li><i className="fas fa-bars"></i></li>
        </ul>
      </div>
    </div>
  )
}

export default TopBar
