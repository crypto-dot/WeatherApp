import React from 'react';
import '../App.css';

function Information() {
  return (
    <div id = 'Information'>
        <h1 id = 'Location'>Richardson, Texas</h1>
        <h1 id= 'WeatherInformation'>80<button  class = 'selected' id='fahrenheit'>°F</button>|<button id = 'celsius'>°C</button></h1>
    </div>
  )
}

export default Information