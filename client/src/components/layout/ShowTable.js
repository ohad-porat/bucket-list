import React, { useState, useEffect } from "react"
import { Redirect, Link } from "react-router-dom"
import { useParams } from "react-router"

import nestSeasonUnderPlayer from "../../services/nestSeasonUnderPlayer.js"

import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"

const ShowTable = ({ user }) => {
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
    return <Redirect to={`/${user.id}/my-tables`} />
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
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="title-box medium-8">
            <h1 className="title-show-page">{table.title}</h1>
            <p className="userName-show-page">By {table.user.userName}</p>
          </div>
          <div className="notes-box callout medium-4">
            <div className="notes-header-show-page">Notes:</div>
            <div className="notes-show-page">{table.notes ? table.notes : <i>Not Provided</i>}</div>
          </div>
          <table className="hover unstriped table-scroll">
            <thead>
              <tr>
                <th width="200">Player</th>
                <th width="100">Season</th>
                {statsTiles}
              </tr>
            </thead>
            <tbody>{playerTiles}</tbody>
          </table>
          {editDeleteButtons}
        </div>
      </div>
    </div>
  )
}

export default ShowTable
