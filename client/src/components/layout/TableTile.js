import React from "react"
import { Link } from "react-router-dom"

const TableTile = ({ table }) => {
  const emptyNotes = <i>Not Provided</i>

  const playerList = table.seasons.map((stat) => {
    if (stat === table.seasons[table.seasons.length -1]) {
      return `${stat.player.first_name} ${stat.player.last_name}`
    } else {
      return `${stat.player.first_name} ${stat.player.last_name}, `
    }
  })
  return (
    <div className="table-tile">
      <h1><Link to={`/tables/${table.id}`}>{table.title}</Link></h1>
      <h2>Players: {playerList}</h2>
      <h3>Notes: {table.notes ? table.notes : emptyNotes}</h3>
    </div>
  )
}

export default TableTile
