import React, { useState, useEffect } from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

const PlayerCombobox = ({ handlePlayerInputChange, player }) => {
  const players = usePlayerSearch(player.name)
  const handlePlayerNameChange = (event) => {
    handlePlayerInputChange(event.currentTarget.value, event.type)
  }

  return (
    <Combobox aria-label="name" onSelect={handlePlayerInputChange}>
      <ComboboxInput
        id="name"
        className="search-input medium-12 cell form-field"
        placeholder="Choose a Player"
        onChange={handlePlayerNameChange}
        value={player.name}
      />
      {players && (
        <ComboboxPopover className="shadow-popup">
          {players.length > 0 ? (
            <ComboboxList>
              {players.map((player) => {
                const str = `${player.first_name} ${player.last_name}`
                return <ComboboxOption key={player.id} value={str} />
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
const usePlayerSearch = (searchTerm) => {
  const [players, setPlayers] = useState([])
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      let isFresh = true
      fetchPlayers(searchTerm).then((players) => {
        if (isFresh) setPlayers(players.data)
      })

      return () => (isFresh = false)
    }
  }, [searchTerm])

  return players
}
const cache = {}
const fetchPlayers = (value) => {
  if (cache[value]) {
    return Promise.resolve(cache[value])
  }

  return fetch(
    `https://www.balldontlie.io/api/v1/players?search=${value}&per_page=10`
  )
    .then((res) => res.json())
    .then((result) => {
      cache[value] = result

      return result
    })
}

export default PlayerCombobox
