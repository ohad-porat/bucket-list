const validateInput = (player) => {
  const { name, season } = player
  let newErrors = {}
  if (season.trim() === "") {
    newErrors = {
      ...newErrors,
      season: "is required",
    }
  }

  if (name.trim() === "") {
    newErrors = {
      ...newErrors,
      name: "is required",
    }
  }

  return newErrors
}

export default validateInput