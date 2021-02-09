import express from "express"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
import { Table, Player, SeasonAverage } from "../../../models/index.js"

const tablesRouter = new express.Router()

tablesRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = {title: body.title, notes: body.notes}
  // const cleanFormInput = cleanUserInput(formInput)
  debugger

  try {
    
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default tablesRouter

// pseudo code for the post:
// for players I need to look if the player exists, if not then add to players table
// for (const player of body.players) {
//   const currentPlayer = await Player.query().where({playerId: player.id})
//   if (!currentPlayer) {
//     await Player.query().insert(currentPlayer)
//   }
// }

// for seasonAverages I need to look the season exists for the specific player, if not then add to seasonAverages table
// for (const player of body.players) {
//   const currentSeason = await SeasonAverage.query().where({player_id: player.id}, {season: player.stats.season})
//   if (!currentSeason) {
//     await SeasonAverage.query().insert(currentSeason)
//   }
// }

// for table I need to add the table to the tables table, and add the relations to the playersOfTables join table
// await Table.query().insert(formInput)


// look into seeders from week 6, there is a for of loop that checks if row exists, can I do it on the backend?
// should I do all of this logic on the backend? if not then where?
