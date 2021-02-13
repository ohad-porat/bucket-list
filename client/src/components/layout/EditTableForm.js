import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

import translateServerErrors from "../../services/translateServerErrors.js"
import nestStatsUnderPlayer from "../../services/nestStatsUnderPlayer.js"
import ErrorList from "./ErrorList.js"
import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"

const EditTableForm = (props) => {
  const [form, setForm] = useState({
    title: "",
    notes: "",
    stats: [],
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { tableId } = props.match.params
  const selectedStats = ["pts", "ast", "reb"]

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

  const playerTiles = form.stats.map((stat) => {
    let player = nestStatsUnderPlayer(stat)

    return (
      <PlayerTile
        key={`${player.id}_${player.stats.season}`}
        player={player}
        selectedStats={selectedStats}
      />
    )
  })

  const statsTiles = selectedStats.map((stat) => {
    return <StatTile key={stat} stat={stat} />
  })

  const editTable = async () => {
    try {
      const response = await fetch(`/api/v1/tables/${tableId}`, {
        method: "PATCH",
        header: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(form),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      } else {
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to={`/tables/${tableId}`} />
  }

  return (
    <div className="page-body">
      <form className="save-table-form">
      <table className="hover unstriped table-scroll">
        <thead>
          <tr>
            <th width="200">Player</th>
            <th width="60">Season</th>
            {statsTiles}
          </tr>
        </thead>
        <tbody>{playerTiles}</tbody>
      </table>
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
