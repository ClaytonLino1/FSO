
import axios from 'axios';
import { useState, useEffect } from 'react';
import Countries from './components/Countries';

const api_key = process.env.REACT_APP_API_KEY;




const Search = ({search, handleSearch}) => (
  <div>
    find countries <input
    value={search}
    onChange={handleSearch}/>
  </div>
)

const App = () => {
  const [data, setData] = useState([])
  const [weather, setWeather] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setLoading] = useState(true)
  const [countryShow, setCountry] = useState([])
  const [latLang, setLatLang] = useState([-10, 55])
  

  useEffect(() => {
    axios.
    get("https://restcountries.com/v3.1/all").
    then((response) => {
      setLoading(false)
      setData(response.data)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    axios.
    get(`https://api.openweathermap.org/data/2.5/weather?lat=${latLang[0]}&lon=${latLang[1]}&appid=${api_key}&units=metric`).
    then((response) => {
      setLoading(false)
      setWeather(response.data)
    })
  }, latLang)

  if (isLoading) {
    return <div>Loading</div>
  }

  const getLatLang = (country) => {
    setLatLang(country.latlng)
  }

  const handleSearch = (event) => (setSearch(event.target.value))
  

  const showCountry = (country) => {
    
    setCountry(country)
  }

  

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Countries data={data} 
      search={search} 
      showCountry={showCountry} 
      country={countryShow}
      getLatLang={getLatLang}
      weather={weather}
      />
    </div>
  )

}

export default App;
