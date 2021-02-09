import React, { useState } from "react"

const SaveTableForm = ({ selectedPlayers }) => {
  const [form, setForm] = useState({
    title: "",
    notes: "",
  })

  const handleInputChange = (event) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value })
  }

  return (
    <form className="save-table-form">
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
