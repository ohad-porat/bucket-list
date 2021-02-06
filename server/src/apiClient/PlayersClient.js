import got from "got"

class PlayersClient {
  static async getPlayer(playerName) {
    try {
      const apiResponse = await got(
        `https://balldontlie.io/api/v1/players?search=${playerName}`
      )
      const responseBody = apiResponse.body
      return responseBody
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default PlayersClient
