const saveTableValidation = (selectedPlayers, selectedStats, title) => {
  let submitErrors = {}
  if (selectedPlayers.length < 1) {
    submitErrors = {
      ...submitErrors,
      ["players"]: "should not be empty",
    }
  }

  if (selectedStats.length < 1) {
    submitErrors = {
      ...submitErrors,
      ["stats"]: "should not be empty",
    }
  }

  if (title.trim() === "") {
    submitErrors = {
      ...submitErrors,
      ["title"]: "is a required property",
    }
  }

  return submitErrors
}

export default saveTableValidation