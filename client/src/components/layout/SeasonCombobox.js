import React, { useState, useEffect } from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

const SeasonCombobox = ({ handleSeasonInputChange, player }) => {
  let seasons = useSeasonSearch(player.id)
  seasons.sort()

  if (player.id === "") {
    seasons.length = 0
  }

  const handleSeasonChange = (event) => {
    handleSeasonInputChange(event.currentTarget.value)
  }

  let loadingClass = ""

  if (player.id !== "" && seasons.length === 0) {
    loadingClass = "loading"
  } else if (player.id !== "" && seasons.length > 0) {
    loadingClass = ""
  }

  return (
    <Combobox aria-label="name" onSelect={handleSeasonInputChange}>
      <ComboboxInput
        className={`search-input medium-12 cell form-field ${loadingClass}`}
        placeholder="Choose a Season"
        onChange={handleSeasonChange}
        value={player.season}
      />
      {seasons && (
        <ComboboxPopover className="shadow-popup">
          {seasons.length > 0 ? (
            <ComboboxList>
              {seasons.map((season) => {
                const str = `${season}`
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
