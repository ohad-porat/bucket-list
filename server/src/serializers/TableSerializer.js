import SeasonAverageSerializer from "./SeasonAverageSerializer.js"
import StatSerializer from "./StatSerializer.js"

class TableSerializer {
  static async getDetails(table) {
    const allowedAttributes = ["id", "title", "notes", "userId"]

    let serializedTable = {}
    for (const attribute of allowedAttributes) {
      serializedTable[attribute] = table[attribute]
    }

    const seasons = await table.$relatedQuery("seasonAverages")
    serializedTable.seasons = await Promise.all(
      seasons.map((season) => {
        return SeasonAverageSerializer.getDetails(season)
      })
    )

    const stats = await table.$relatedQuery("stats")
    serializedTable.stats = await Promise.all(
      stats.map((stat) => {
        return StatSerializer.getSummary(stat)
      })
    )

    return serializedTable
  }
}

export default TableSerializer
