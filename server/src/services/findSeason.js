import { SeasonAverage } from "../models/index.js"

const findSeason = async (player, table) => {
  let currentSeason = await SeasonAverage.query().where({
    season: player.stats.season,
    playerId: player.id,
  })
  if (currentSeason.length === 0) {
    const inputData = { ...player.stats, playerId: player.id }
    currentSeason = await SeasonAverage.query().insertAndFetch(inputData)
  }
  await table.$relatedQuery("seasonAverages").relate(currentSeason)
}

export default findSeason
