import React, { useState, useEffect } from "react"
import TableTile from "./TableTile.js"

const AllTablesList = (props) => {
  const [tables, setTables] = useState([])

  const getTables = async () => {
    try {
      const response = await fetch("/api/v1/tables")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setTables(responseBody.tables)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getTables()
  }, [])

  const tableTiles = tables.map((table) => {
    return <TableTile key={table.id} table={table} />
  })

  return <div className="page-body">{tableTiles}</div>
}

export default AllTablesList
