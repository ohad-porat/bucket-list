import express from "express"

import StatsClient from "../../../apiClient/StatsClient.js"
import StatsSerializer from "../../../serializers/StatsSerializer.js"

const statsRouter = new express.Router()

statsRouter.get("/playerId=:playerId&season=:season", (req, res) => {
  const { playerId, season } = req.params

  StatsClient.getStats(playerId, season).then((data) => {
    if (data.error) {
      console.log(`Error from balldontlie api: ${data.error}`)
    } else {
      const parsedResponse = JSON.parse(data)
      const stats = StatsSerializer.getSummary(parsedResponse.data[0])
      return res.status(200).json(stats)
    }
  })
})

export default statsRouter
