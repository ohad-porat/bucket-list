class StatSerializer {
  static getSummary(stat) {
    const allowedAttributes = ["id", "name", "abbreviation", "value"]

    let serializedStat = {}
    for (const attribute of allowedAttributes) {
      serializedStat[attribute] = stat[attribute]
    }

    return serializedStat
  }
}

export default StatSerializer
