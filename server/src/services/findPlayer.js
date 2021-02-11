import { Player } from "../models/index.js"

const findPlayer = async (player) => {
  debugger
  let currentPlayer = await Player.query().where({ apiPlayerId: player.id })

  if (currentPlayer.length === 0) {
    currentPlayer = await Player.query().insertAndFetch({
      apiPlayerId: player.id,
      first_name: player.first_name,
      last_name: player.last_name,
    })
  }
  return player
}

export default findPlayer
