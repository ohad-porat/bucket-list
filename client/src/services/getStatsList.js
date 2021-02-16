const getStatsList = async () => {
  try {
    const response = await fetch("api/v1/statsList")
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    return responseBody.stats
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default getStatsList
