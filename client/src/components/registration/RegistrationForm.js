import React, { useState } from "react"
import FormError from "../layout/FormError"
import config from "../../config"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    userName: "",
    password: "",
    passwordConfirmation: "",
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const validateInput = (payload) => {
    setErrors({})
    const { email, userName, password, passwordConfirmation } = payload
    const emailRegexp = config.validation.email.regexp
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }

    if (userName.trim() == "") {
      newErrors = {
        ...newErrors,
        userName: "is required",
      }
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      }
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        }
      }
    }

    setErrors(newErrors)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    validateInput(userPayload)
    if (Object.keys(errors).length === 0) {
      fetch("/api/v1/users", {
        method: "post",
        body: JSON.stringify(userPayload),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            setShouldRedirect(true)
          })
        } else {
          const errorMessage = `${resp.status} (${resp.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      })
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/"
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h1 className="sign-in-up-header">Register</h1>
      <form>
        <div>
          <label className="sign-in-up-form">
            Email
            <input
              type="text"
              name="email"
              className="form-field"
              value={userPayload.email}
              onChange={onInputChange}
            />
            <FormError error={errors.email} />
          </label>
          <label className="sign-in-up-form">
            User Name
            <input
              type="text"
              name="userName"
              className="form-field"
              value={userPayload.userName}
              onChange={onInputChange}
            />
            <FormError error={errors.userName} />
          </label>
        </div>
        <div>
          <label className="sign-in-up-form">
            Password
            <input
              type="password"
              name="password"
              className="form-field"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label className="sign-in-up-form">
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              className="form-field"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
