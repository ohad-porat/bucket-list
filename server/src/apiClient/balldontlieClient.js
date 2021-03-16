import got from "got"

class balldontlieClient {
  static baseUrl() {
    return "https://balldontlie.io/api/v1/"
  }

  static async getPlayer(playerName) {
    const baseUrl = this.baseUrl()

    try {
      const apiResponse = await got(`${baseUrl}players?search=${playerName}`)
      const responseBody = apiResponse.body
      return responseBody
    } catch (error) {
      return { error: error.message }
    }
  }

  static async getStats(playerId, season) {
    const baseUrl = this.baseUrl()

    try {
      const apiResponse = await got(
        `${baseUrl}season_averages?season=${season}&player_ids[]=${playerId}`
      )
      const responseBody = apiResponse.body
      return responseBody
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default balldontlieClient
