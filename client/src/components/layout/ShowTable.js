import React, { useState, useEffect } from "react"
import { Redirect, Link } from "react-router-dom"

import nestSeasonUnderPlayer from "../../services/nestSeasonUnderPlayer.js"

import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"

const ShowTable = (props) => {
  const [table, setTable] = useState({
    title: "",
    notes: "",
    userId: "",
    seasons: [],
    stats: [],
    user: {
      userName: "",
    },
  })
  const [currentUserId, setCurrentUserId] = useState(null)
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
      setCurrentUserId(responseBody.userId)
      setTable(responseBody.table)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getTable()
  }, [])

  const playerTiles = table.seasons.map((stats) => {
    let player = nestSeasonUnderPlayer(stats)

    return (
      <PlayerTile
        key={`${player.id}_${player.stats.season}`}
        player={player}
        selectedStats={table.stats}
      />
    )
  })

  const statsTiles = table.stats.map((stat) => {
    return <StatTile key={stat.id} abbreviation={stat.abbreviation} />
  })

  const handleDeleteTable = async () => {
    try {
      const response = await fetch(`/api/v1/tables/${tableId}`, {
        method: "DELETE",
        headers: new Headers({
          "content-Type": "application/json",
        }),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to={`/my-tables`} />
  }

  let editDeleteButtons
  if (currentUserId !== table.userId) {
    editDeleteButtons = ""
  } else {
    editDeleteButtons = (
      <div className="button-group">
        <Link to={`/tables/${tableId}/edit`}>
          <button className="button">Edit</button>
        </Link>
        <input
          type="button"
          value="Delete"
          className="button delete-button"
          onClick={handleDeleteTable}
        />
      </div>
    )
  }

  return (
    <div className="page-body">
      <h1 className="title-show-page">{table.title}</h1>
      <p className="userName-show-page">By {table.user.userName}</p>
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
      <p className="notes-show-page">{table.notes}</p>
      {editDeleteButtons}
    </div>
  )
}

export default ShowTable
