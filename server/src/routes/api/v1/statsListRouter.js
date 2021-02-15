import express from "express"

import { Stat } from "../../../models/index.js"
import StatSerializer from "../../../serializers/StatSerializer.js"

const statsListRouter = new express.Router()

statsListRouter.get("/", async (req, res) => {
  try {
    const rawStats = await Stat.query()
    const stats = await Promise.all(
      rawStats.map((stat) => StatSerializer.getSummary(stat))
    )
    return res.status(200).json({ stats })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default statsListRouter
