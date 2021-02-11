import express from "express"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
import { Table } from "../../../models/index.js"
import findPlayer from "../../../services/findPlayer.js"
import findSeason from "../../../services/findSeason.js"

const tablesRouter = new express.Router()

tablesRouter.post("/", async (req, res) => {
  const userId = req.user.id
  const { body } = req
  const formInput = { title: body.title, notes: body.notes }
  const cleanedFormInput = cleanUserInput({ ...formInput, userId })

  try {
    const table = await Table.query().insertAndFetch(cleanedFormInput)

    let allPlayers = []
    for (let player of body.players) {
      let foundPlayer = await findPlayer(player)
      allPlayers.push(foundPlayer)
    }

    for (let player of allPlayers) {
      await findSeason(player, table)
    }

    return res.status(201).json({ table })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default tablesRouter
