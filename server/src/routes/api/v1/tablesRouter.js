import express from "express"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
import { Table } from "../../../models/index.js"
import TableSerializer from "../../../serializers/TableSerializer.js"
import findPlayer from "../../../services/findPlayer.js"
import findSeason from "../../../services/findSeason.js"

const tablesRouter = new express.Router()

tablesRouter.get("/", async (req, res) => {
  try {
    const rawTables = await Table.query()
    const tables = await Promise.all(
      rawTables.map((table) => TableSerializer.getDetails(table))
    )
    return res.status(200).json({ tables })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

tablesRouter.get("/currentUser", async (req, res) => {
  const userId = req.user.id

  try {
    const rawTables = await Table.query().where({ userId: userId })
    const tables = await Promise.all(
      rawTables.map((table) => TableSerializer.getDetails(table))
    )
    return res.status(200).json({ tables })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

tablesRouter.post("/", async (req, res) => {
  const userId = req.user.id
  const { body } = req
  const formInput = { title: body.title, notes: body.notes }
  const cleanedFormInput = cleanUserInput({ ...formInput, userId })

  try {
    const table = await Table.query().insertAndFetch(cleanedFormInput)

    const allPlayers = await Promise.all(
      body.players.map((player) => {
        return findPlayer(player)
      })
    )

    const allSeason = await Promise.all(
      allPlayers.map((player) => {
        return findSeason(player, table)
      })
    )

    return res.status(201).json({ table })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default tablesRouter
