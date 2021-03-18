import React, { useState, useEffect } from "react"
import { Redirect, Link } from "react-router-dom"
import { useParams } from "react-router"
import _ from "lodash"

import validateInput from "../../services/validateInput.js"
import fetchPlayerAndStats from "../../services/fetchPlayerAndStats.js"
import translateServerErrors from "../../services/translateServerErrors.js"
import nestSeasonUnderPlayer from "../../services/nestSeasonUnderPlayer.js"
import getPlayer from "../fetchRequests/getPlayer.js"

import ErrorList from "./ErrorList.js"
import PlayerTileEdit from "./PlayerTileEdit.js"
import StatTile from "./StatTile.js"
import PlayerCombobox from "./PlayerCombobox.js"
import SeasonCombobox from "./SeasonCombobox.js"

const EditTableForm = (props) => {
  const [player, setPlayer] = useState({ name: "", id: "", season: "" })
  const [form, setForm] = useState({
    title: "",
    notes: "",
    seasons: [],
    stats: [],
    seasonsToRemove: [],
    seasonsToAdd: [],
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { tableId } = useParams()

  const getTable = async () => {
    try {
      const response = await fetch(`/api/v1/tables/${tableId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      const { title, notes, seasons, stats } = responseBody.table
      setForm({ ...form, title, notes, seasons, stats })
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

  const handlePlayerInputChange = async (nameString, eventType) => {
    if (eventType === "change") {
      setPlayer({
        ...player,
        id: "",
        name: nameString,
      })
    } else {
      const playerData = await getPlayer(nameString)
      setPlayer({
        ...player,
        id: playerData.id.toString(),
        name: nameString,
      })
    }
  }

  const handleSeasonInputChange = (seasonString) => {
    setPlayer({
      ...player,
      season: seasonString,
    })
  }

  const validationErrors = validateInput(player)

  const handlePlayerSubmit = async (event) => {
    event.preventDefault()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      const fetchedPlayerData = await fetchPlayerAndStats(player)
      const seasonsToAdd = form.seasonsToAdd.concat(fetchedPlayerData)
      const seasons = form.seasons.concat(fetchedPlayerData)
      setForm({ ...form, seasonsToAdd, seasons })
      setPlayer({ name: "", season: "", id: "" })
    }
  }

  const removePlayer = (playerId, playerSeason, seasonId) => {
    if (seasonId) {
      const playerIndex = form.seasons.findIndex(
        (season) =>
          season.player.apiPlayerId === playerId &&
          season.season === playerSeason
      )
      form.seasons.splice(playerIndex, 1)
      const seasonsToRemove = form.seasonsToRemove.concat(seasonId)
      setForm({ ...form, seasonsToRemove })
    } else {
      const playerIndex = form.seasons.findIndex(
        (player) =>
          player.id === playerId && player.stats.season === playerSeason
      )
      let seasons = form.seasons
      seasons.splice(playerIndex, 1)
      setForm({ ...form, seasons })
      const addPlayerIndex = form.seasonsToAdd.findIndex(
        (player) =>
          player.id === playerId && player.stats.season === playerSeason
      )
      let seasonsToAdd = form.seasonsToAdd
      seasonsToAdd.splice(addPlayerIndex, 1)
      setForm({ ...form, seasonsToAdd })
    }
  }

  const playerTiles = form.seasons.map((stats) => {
    let player
    if (stats.player) {
      player = nestSeasonUnderPlayer(stats)
    } else {
      player = stats
    }

    return (
      <PlayerTileEdit
        key={`${player.id}_${player.stats.season}`}
        player={player}
        selectedStats={form.stats}
        removePlayer={removePlayer}
      />
    )
  })

  const statsTiles = form.stats.map((stat) => {
    return <StatTile key={stat.id} abbreviation={stat.abbreviation} />
  })

  const editTable = async () => {
    try {
      const response = await fetch(`/api/v1/tables/${tableId}`, {
        method: "PATCH",
        headers: new Headers({
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

  const validateTable = () => {
    let submitErrors = {}
    if (form.seasons.length < 1) {
      submitErrors = {
        ...submitErrors,
        ["players"]: "should not be empty",
      }
    }

    if (form.title.trim() === "") {
      submitErrors = {
        ...submitErrors,
        ["title"]: "is a required property",
      }
    }

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateTable()) {
      editTable()
    }
  }

  if (shouldRedirect) {
    return <Redirect to={`/tables/${tableId}`} />
  }

  return (
    <div className="page-body">
      <form
        onSubmit={handlePlayerSubmit}
        className="add-player-form"
        autoComplete="off"
      >
        <div className="grid-container">
          <div className="grid-x grid-padding-x edit-add-player">
            <div className="small-6 medium-4 cell">
              <label htmlFor="name">
                <PlayerCombobox
                  handlePlayerInputChange={handlePlayerInputChange}
                  player={player}
                />
              </label>
            </div>

            <div className="small-6 medium-4 cell">
              <label htmlFor="season">
                <SeasonCombobox
                  handleSeasonInputChange={handleSeasonInputChange}
                  player={player}
                />
              </label>
            </div>
            <input
              type="submit"
              value="Add Player"
              className="button edit-add-player-button"
            />
            <Link to={`/tables/${tableId}`} className="back-to-table small-8 medium-12 cell">
              Back To Table
            </Link>
          </div>
        </div>
      </form>
      <form className="edit-table-form" onSubmit={handleSubmit}>
        <ErrorList errors={errors} />
        <div className="table">
          <table className="hover unstriped table-scroll">
            <thead>
              <tr>
                <th width="30"> </th>
                <th width="200">Player</th>
                <th width="60">Season</th>
                {statsTiles}
              </tr>
            </thead>
            <tbody>{playerTiles}</tbody>
          </table>
        </div>
        <label htmlFor="title">
          <input
            id="title"
            name="title"
            type="text"
            className="form-field"
            placeholder="Title"
            onChange={handleInputChange}
            value={form.title}
          />
        </label>

        <label htmlFor="notes">
          <textarea
            id="notes"
            name="notes"
            className="form-field"
            placeholder="Notes"
            onChange={handleInputChange}
            value={form.notes || ""}
          />
        </label>
        <input type="submit" value="Save Table" className="button" />
      </form>
    </div>
  )
}

export default EditTableForm
