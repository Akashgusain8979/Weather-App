import './App.css';
import React, {useState} from 'react';



const api = {
  key: "563c728f79708cf711076af3abf2db40",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

const[state, setState] = useState('');
const[weather, setWeather] = useState({});


const search = evt =>{
  if(evt.key ==="Enter"){
    fetch(`${api.base}weather?q=${state}&units=metric&APPID=${api.key}`)
    .then(res =>res.json())
    .then(result => {
      setWeather(result);
      setState('');
      console.log(result);
    });
  }
}

const dateBuilder =(d)=>{
  let months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
           
  let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();


  return `${day} ${date} ${month} ${year}`
}

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      
     <main>
      <div className="search-box">
        <input type="text" className="search-bar" placeholder="Search" onChange={e => setState(e.target.value)} value={state} onKeyPress={search} />
      </div>

{(typeof weather.main !="undefined")? (
  <div>
      <div className="location-box">
      <div className="location">{weather.name}, {weather.sys.country}</div>
      <div className="date">{dateBuilder(new Date())}</div>
      </div>

      <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}°c </div>
        <div className="weather">{weather.weather[0].main}</div>
      </div>
      </div>
      ):('')}
     </main>
    </div>
  );
}

export default App;
