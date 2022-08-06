import React from 'react';
import '../App.css';

function toFahrenheit(e) {
  document.getElementById('celsius').classList.toggle('selected');
  e.target.classList.toggle('selected');
  console.log("h");
  const value = document.getElementById('degrees').textContent;
  if (isNaN(value)) {
    return;
  }
  document.getElementById('degrees').textContent = (((Number(value) * 9 / 5) + 32)).toFixed(1);
}
function toCelsius(e) {
  document.getElementById('fahrenheit').classList.toggle('selected');
  e.target.classList.toggle('selected');
  const value = document.getElementById('degrees').textContent;
  if (isNaN(value)) {
    return;
  }
  document.getElementById('degrees').textContent = (((Number(value) - 32) * (5 / 9))).toFixed(1);
}
function Information(props) {

  return (
    <div id='information'>
      <h1 id='location'>Unknown City</h1>
      <h1 id='weatherInformation'><span id='degrees'>{props.weather}</span><button onClick={toFahrenheit} className='selected' id='fahrenheit'>°F</button>|<button onClick={toCelsius} id='celsius'>°C</button></h1>
    </div>
  )
}

export default Information