import express from "express"

import balldontlieClient from "../../../apiClient/balldontlieClient.js"
import PlayerSerializer from "../../../serializers/PlayerSerializer.js"

const playersRouter = new express.Router()

playersRouter.get("/", (req, res) => {
  const playerName = req.query.playerName

  balldontlieClient.getPlayer(playerName)
    .then((data) => {
      if (data.error) {
        console.log(`Error from balldontlie api: ${data.error}`)
      } else {
        const parsedResponse = JSON.parse(data)
        const player = PlayerSerializer.getSummary(parsedResponse.data[0])
        return res.status(200).json(player)
      }
    })
    .catch((error) => {
      console.log("Something went wrong.")
      console.log(error)
    })
})

export default playersRouter
