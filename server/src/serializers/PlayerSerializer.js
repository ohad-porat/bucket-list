class PlayerSerializer {
  static getSummary(player) {
    const allowedAttributes = ["id", "first_name", "last_name"]

    let serializedPlayer = {}
    for (const attribute of allowedAttributes) {
      serializedPlayer[attribute] = player[attribute]
    }

    return serializedPlayer
  }

  static getDetails(player) {
    const allowedAttributes = ["id", "apiPlayerId", "first_name", "last_name"]

    let serializedPlayer = {}
    for (const attribute of allowedAttributes) {
      serializedPlayer[attribute] = player[attribute]
    }

    return serializedPlayer
  }
}

export default PlayerSerializer
