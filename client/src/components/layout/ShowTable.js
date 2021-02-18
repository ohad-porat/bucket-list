import React, { useState, useEffect } from "react"
import { Redirect, Link } from "react-router-dom"
import { useParams } from "react-router"

import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"
import nestSeasonUnderPlayer from "../../services/nestSeasonUnderPlayer.js"

const ShowTable = ({ user }) => {
  const [table, setTable] = useState({
    title: "",
    notes: "",
    userId: "",
    seasons: [],
    stats: [],
  })
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
    if (confirm("Are you sure?")) {
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
  }

  if (shouldRedirect) {
    return <Redirect to={`/${currentUserId}/my-tables`} />
  }

  let editDeleteButtons
  if (user) {
    if (user.id !== table.userId) {
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
  }

  return (
    <div className="page-body">
      <h1>{table.title}</h1>
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
      <p>{table.notes}</p>
      {editDeleteButtons}
    </div>
  )
}

export default ShowTable
