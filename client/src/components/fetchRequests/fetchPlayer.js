const fetchPlayer = async (playerName) => {
  try {
    const response = await fetch(`/api/v1/players3rdParty?playerName=${playerName}`)
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

export default fetchPlayer