const getFullSeasonName = (season) => {
  const seasonPlusOne = season + 1
  return `${season}-${seasonPlusOne.toString().substring(2)}`
}

export default getFullSeasonName