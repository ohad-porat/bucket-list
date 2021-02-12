import express from "express"
import passport from "passport"

import TableSerializer from "../../../serializers/TableSerializer.js"
import { User, Table } from "../../../models/index.js"

const usersRouter = new express.Router()

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password })
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser })
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({ errors: error })
  }
})

usersRouter.get("/:userId/tables", async (req, res) => {
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

export default usersRouter
