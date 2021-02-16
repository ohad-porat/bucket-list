import getPlayer from "../components/fetchRequests/getPlayer.js"
import getStats from "../components/fetchRequests/getStats.js"

const fetchPlayerAndStats = async (player) => {
  let fetchedPlayerData = await getPlayer(player.name)
  const fetchedStatsData = await getStats(
    fetchedPlayerData.id,
    player.season
  )
  fetchedPlayerData.stats = fetchedStatsData

  return fetchedPlayerData
}

export default fetchPlayerAndStats
