import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const SaveTableForm = ({ selectedPlayers }) => {
  const [form, setForm] = useState({
    title: "",
    notes: "",
    players: [],
  })
  const [errors, setErrors] = useState([])
  const [tableId, setTableId] = useState()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const saveTable = async (event) => {
    event.preventDefault()
    const formPayload = { ...form, players: selectedPlayers }

    try {
      const response = await fetch(`/api/v1/tables`, {
        method: "POST",
        headers: new Headers({
          "content-Type": "application/json",
        }),
        body: JSON.stringify(formPayload),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const responseBody = await response.json()
        setTableId(responseBody.table.id)
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to={`/tables/${tableId}`} />
  }

  const handleInputChange = (event) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value })
  }

  return (
    <form className="save-table-form" onSubmit={saveTable}>
      <ErrorList errors={errors} />
      <label htmlFor="title">
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          onChange={handleInputChange}
          value={form.title}
        />
      </label>

      <label htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          placeholder="Notes"
          onChange={handleInputChange}
          value={form.notes}
        />
      </label>
      <input type="submit" value="Save Table" className="button" />
    </form>
  )
}

export default SaveTableForm
