import { response } from "express"
import got from "got"

class StatsClient {
  static async getStats(playerId, season) {
    try {
      const apiResponse = await got(
        `https://balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerId}`
      )
      const responseBody = apiResponse.body
      return responseBody
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default StatsClient
