import React, { useState, useEffect } from "react"
import { useParams, Redirect, Link } from "react-router-dom"
import PlayerTile from "./PlayerTile.js"
import StatTile from "./StatTile.js"

const ShowTable = (props) => {
  const [table, setTable] = useState({
    title: "",
    notes: "",
    userId: "",
    stats: [],
  })
  const [currentUserId, setCurrentUserId] = useState(null)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { tableId } = useParams()
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
      setCurrentUserId(responseBody.userId)
      setTable(responseBody.table)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getTable()
  }, [])

  const playerTiles = table.stats.map((stat) => {
    let player = stat.player
    player.stats = {
      games_played: stat.games_played,
      season: stat.season,
      min: stat.min,
      fgm: stat.fgm,
      fga: stat.fga,
      fg3m: stat.fg3m,
      fg3a: stat.fg3a,
      ftm: stat.ftm,
      fta: stat.fta,
      oreb: stat.oreb,
      dreb: stat.dreb,
      reb: stat.reb,
      ast: stat.ast,
      stl: stat.stl,
      blk: stat.blk,
      turnover: stat.turnover,
      pf: stat.pf,
      pts: stat.pts,
      fg_pct: stat.fg_pct,
      fg3_pct: stat.fg3_pct,
      ft_pct: stat.ft_pct,
    }

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
        <button className="button">
          <Link to={`/tables/${tableId}/edit`}>Edit</Link>
        </button>
        <button className="button" onClick={handleDeleteTable}>
          Delete
        </button>
      </div>
    )
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
