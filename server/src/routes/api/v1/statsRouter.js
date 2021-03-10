import express from "express"

import balldontlieClient from "../../../apiClient/balldontlieClient.js"
import SeasonAverageSerializer from "../../../serializers/SeasonAverageSerializer.js"

const statsRouter = new express.Router()

statsRouter.get("/playerId=:playerId&season=:season", (req, res) => {
  const { playerId, season } = req.params

  balldontlieClient.getStats(playerId, season)
    .then((data) => {
      if (data.error) {
        console.log(`Error from balldontlie api: ${data.error}`)
      } else {
        const parsedResponse = JSON.parse(data)
        const stats = SeasonAverageSerializer.getSummary(parsedResponse.data[0])
        return res.status(200).json(stats)
      }
    })
    .catch((error) => {
      console.log("Something went wrong.")
      console.log(error)
    })
})

export default statsRouter
