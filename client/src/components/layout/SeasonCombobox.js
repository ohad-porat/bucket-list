import React, { useState, useEffect } from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.scss"

const SeasonCombobox =  ({ handleSeasonInputChange, player }) => {
  const seasons =  useSeasonSearch(player.id)

  const handleSeasonChange = (event) => {
    handleSeasonInputChange(event.currentTarget.value)
  }

  return (
    <Combobox aria-label="name" onSelect={handleSeasonInputChange}>
      <ComboboxInput
        className="season-search-input medium-12 cell"
        placeholder="Choose a Season"
        onChange={handleSeasonChange}
        value={player.season}
      />
      {seasons && (
        <ComboboxPopover className="shadow-popup">
          {seasons.length > 0 ? (
            <ComboboxList>
              {seasons.map((season) => {
                const seasonPlusOne = season + 1
                const str = `${season}-${seasonPlusOne.toString().substring(2)}`
                return <ComboboxOption key={str} value={str} />
              })}
            </ComboboxList>
          ) : (
            <span style={{ display: "block", margin: 8 }}>
              No results found
            </span>
          )}
        </ComboboxPopover>
      )}
    </Combobox>
  )
}
const useSeasonSearch = (searchTerm) => {
  const [seasons, setSeasons] = useState([])
  if (searchTerm === undefined) {
    searchTerm = ""
  }
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      let isFresh = true
      fetchSeasons(searchTerm).then((seasons) => {
        if (isFresh) setSeasons(seasons)
      })

      return () => (isFresh = false)
    }
  }, [searchTerm])

  return seasons
}

const cache = {}

const limitPerPage = 100
const apiUrl = `https://www.balldontlie.io/api/v1/stats`
const getStats = async (value, pageNo) => {
  let actualUrl = `${apiUrl}?page=${pageNo}&per_page=${limitPerPage}&player_ids[]=${value}`
  var apiResults = await fetch(actualUrl).then((resp) => {
    return resp.json()
  })

  return apiResults
}

const getEntireStatsList = async (value, pageNo = 1) => {
  const results = await getStats(value, pageNo)
  console.log("Retrieving data from API for page : " + pageNo)
  if (results.data.length > 0) {
    return results.data.concat(await getEntireStatsList(value, pageNo + 1))
  } else {
    return results.data
  }
}

const fetchSeasons = async (value) => {
  if (cache[value]) {
    return Promise.resolve(cache[value])
  }

  const entireList = await getEntireStatsList(value)
  const rawSeasons = entireList.map((stat) => stat.game.season)
  const seasons = [...new Set(rawSeasons)]

  return seasons
}

export default SeasonCombobox
