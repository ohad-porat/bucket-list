import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"

const EditTableForm = (props) => {
  const [form, setForm] = useState({
    title: "",
    notes: "",
    stats: [],
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { tableId } = props.match.params

  const getTable = async () => {
    try {
      const response = await fetch(`/api/v1/tables/${tableId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      const { title, notes, stats} = responseBody.table
      setForm({title, notes, stats})
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getTable()
  }, [])

  const handleInputChange = (event) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value })
  }

  return (
    <div className="page-body">
      <form className="save-table-form">
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
    </div>
  )
}

export default EditTableForm
