import React from "react"
import { Link } from "react-router-dom"

import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new"className="top-bar-link">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="top-bar-link">Sign Up</Link>
    </li>,
  ]

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ]

  const authenticatedLeftNavbar = (
    <li>
      <Link to="/my-tables" className="top-bar-link">My Tables</Link>
    </li>
  )

  const unauthenticatedLeftNavBar = ""

  return (
    <div className="top-bar">
      <Link to="/">
        <img src="https://i.ibb.co/r3DCrp4/logo.png" alt="Website Logo" className="top-bar-logo" />
      </Link>
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <Link to="/all-tables" className="top-bar-link">All Tables</Link>
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
