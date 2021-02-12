const getStats = async (playerId, season) => {
  try {
    const response = await fetch(
      `/api/v1/stats/playerId=${playerId}&season=${season}`
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

export default getStats
