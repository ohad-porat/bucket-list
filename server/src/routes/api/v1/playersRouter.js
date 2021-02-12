import express from "express"

import PlayersClient from "../../../apiClient/PlayersClient.js"
import PlayerSerializer from "../../../serializers/PlayerSerializer.js"

const playersRouter = new express.Router()

playersRouter.get("/", (req, res) => {
  const playerName = req.query.playerName

  PlayersClient.getPlayer(playerName).then((data) => {
    if (data.error) {
      console.log(`Error from balldontlie api: ${data.error}`)
    } else {
      const parsedResponse = JSON.parse(data)
      const player = PlayerSerializer.getSummary(parsedResponse.data[0])
      return res.status(200).json(player)
    }
  })
})

export default playersRouter
