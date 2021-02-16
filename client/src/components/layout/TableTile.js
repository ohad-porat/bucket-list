import React from "react"
import { Link } from "react-router-dom"

const TableTile = ({ table }) => {
  const playerList = table.seasons.map((stat) => {
    if (stat === table.seasons[table.seasons.length -1]) {
      return `${stat.player.first_name} ${stat.player.last_name}`
    } else {
      return `${stat.player.first_name} ${stat.player.last_name}, `
    }
  })
  return (
    <div className="table-tile callout cell medium-4">
      <h1 className="table-title"><Link to={`/tables/${table.id}`}>{table.title}</Link></h1>
      <h2 className="table-players">Players: {playerList}</h2>
    </div>
  )
}

export default TableTile
