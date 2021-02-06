import React, { useState } from "react"

const IndexPage = (props) => {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [player, setPlayer] = useState({ name: "", season: "" })

  const fetchPlayer = async () => {
    try {
      const response = await fetch(`api/v1/players?playerName=${player.name}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const playerData = await response.json()
      return playerData
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const fetchStats = async (playerId) => {
    try {
      let season = player.season
      const response = await fetch(
        `api/v1/stats/playerId=${playerId}&season=${season}`
      )
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const statsData = await response.json()
      return statsData
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handlePlayerSubmit = async (event) => {
    event.preventDefault()
    let fetchedPlayerData = await fetchPlayer()
    const fetchedStatsData = await fetchStats(fetchedPlayerData.id)
    fetchedPlayerData.stats = fetchedStatsData.data[0]
    let newPlayers = selectedPlayers.concat(fetchedPlayerData)
    setSelectedPlayers(newPlayers)
  }

  const handlePlayerInputChange = (event) => {
    setPlayer({
      ...player,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const playerTiles = selectedPlayers.map((player) => {
    return (
      <>
      <h2>
        {player.first_name} {player.last_name}
      </h2>
      <h4>
      Season: {player.stats.season}
      </h4>
      <p>
        Points: {player.stats.pts} <br/>
        Rebounds: {player.stats.reb} <br/>
        Assists: {player.stats.ast}
      </p>
      </>
    )
  })

  return (
    <>
      <form onSubmit={handlePlayerSubmit}>
        <label htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Player"
            onChange={handlePlayerInputChange}
          />
        </label>
        <label htmlFor="season">
          <input
            id="season"
            name="season"
            type="text"
            placeholder="season"
            onChange={handlePlayerInputChange}
          />
        </label>
        <input type="submit" value="Add Player" />
      </form>
      {playerTiles}
    </>
  )
}

export default IndexPage
