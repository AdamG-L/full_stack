import { useState, useEffect, useRef } from 'react'
import Services from './services/Services'
import Display from './components/Display'
const App = () => {
  const [search, setSearch] = useState("")
  // Contains country name as key and all data as value
  const [map, setMap] = useState(new Map())
  const [display, setDisplay] = useState([])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  // Make single request to retrieve all country data
  useEffect(() => {
    Services.getAll()
      .then(data => {
        const tempMap = new Map()
        data.forEach(d => tempMap.set(d.name.common.toLowerCase(), d))
        setMap(tempMap)
      })
  }, [])

  /* Whenever search value changes update display
     Note: map is included for the edge case where the user inputs 
     but the map has not been filled yet
     We have a small "bug" where if map and search update but search isnt 
     updated before the useEffect runs, we first display a stale version
     followed by detecting a change in search, updating to the current version
  */
  useEffect(() => {
    if (map.size === 0 || search === "") {
      return
    }
    displayCountries()
  }, [search, map])

  // Helper Methods
  const displayCountries = () => {
    const names = []
    // Gather relevant countries
    map.forEach((value, key) => {
      if (key.startsWith(search.toLowerCase())) {
        names.push(key)
      }
    })
    const res = []
    res.push(names.length)
    if (names.length > 10) {
      res.push("Too many matches, please refine filter!")
    }
    else if (names.length <= 10 && names.length > 1) {
      res.push(names)
    }
    else if (names.length === 1) {
      res.push(map.get(names[0]))
    }
    else {
      res.push("No results found")
    }
    setDisplay(res)
  }


  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <Display display={display} setSearch={setSearch} />
    </div>
  );
};

export default App;
