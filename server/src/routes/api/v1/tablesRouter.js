import express from "express"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
import { Table, SeasonOfTable } from "../../../models/index.js"
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
    console.log(error)
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
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

tablesRouter.get("/:tableId", async (req, res) => {
  const { tableId } = req.params

  try {
    const rawTable = await Table.query().findById(tableId)
    const table = await TableSerializer.getDetails(rawTable)
    return res.status(200).json({ table })
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

tablesRouter.delete("/:tableId", async (req, res) => {
  const { tableId } = req.params

  try {
    await SeasonOfTable.query().delete().where({ tableId: tableId })
    await Table.query().deleteById(tableId)
    return res.status(204).json({ message: "Table has been deleted" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default tablesRouter
