import StatsSerializer from "./StatsSerializer.js"

class TableSerializer {
  static async getDetails(table) {
    const allowedAttributes = ["id", "title", "notes"]

    let serializedTable = {}
    for (const attribute of allowedAttributes) {
      serializedTable[attribute] = table[attribute]
    }

    const stats = await table.$relatedQuery("seasonAverages")
    serializedTable.stats = await Promise.all(
      stats.map((stat) => {
        return StatsSerializer.getDetails(stat)
      })
    )

    return serializedTable
  }
}

export default TableSerializer
