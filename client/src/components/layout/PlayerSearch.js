import React, { useState, useEffect } from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.scss"

const PlayerSearch = () => {
  function PlayerCombobox() {
    const [searchTerm, setSearchTerm] = useState("")
    const players = usePlayerSearch(searchTerm)
    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value)
    }
    return (
      <Combobox aria-label="Players">
        <ComboboxInput
          className="player-search-input"
          onChange={handleSearchTermChange}
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
  function usePlayerSearch(searchTerm) {
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
  function fetchPlayers(value) {
    if (cache[value]) {
      return Promise.resolve(cache[value])
    }
    return fetch(`https://www.balldontlie.io/api/v1/players?search=${value}&per_page=10`)
      .then((res) => res.json())
      .then((result) => {
        cache[value] = result
        return result
      })
  }
  return <PlayerCombobox />
}

export default PlayerSearch
