class UserSerializer {
  static getSummary(user) {
    const allowedAttributes = ["id", "email", "userName"]

    let serializedUser = {}
    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }
    return serializedUser
  }
}

export default UserSerializer