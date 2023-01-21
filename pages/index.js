import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'
 
export default function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  
  var apiKey = "786cf4a96685df31efdc801284d377c2";
  var lang = "en";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`;

  const searchLocation = (event) => {
    if(event.key === "Enter"){
      axios.get(url)
        .then((response) => {
          console.clear();
          setData(response.data)
          console.log(response.data)
          setWeather(response.data.weather)
          setErrorMessage("")
        }).catch(err => {
          console.log(err)
          setErrorMessage("Please enter another location")
          setData({})
          setWeather()
        })
        setLocation('');
    }
  }

  return (

    <div className={styles.main}>
      <div className={styles.inputCont}>
        <input className={styles.input}
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>
      <div className={styles.infoCont}>
        <span className={styles.error}>{errorMessage}</span>
        <span className={styles.name}>{data.name}</span>
      {
        weather && weather.map((w, index) => {
          return(
            <div key={index} className={styles.infoSection}>
              <div>
                <span className={styles.label}>Temperature: </span>
                {data.main.temp}°C
              </div>
              <div>
                <span className={styles.label}>Feels Like: </span>
                {data.main.feels_like}°C
              </div>
              <div>
                <span className={styles.label}>Wind Gust: </span>
                {data.wind.gust}m/s
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
