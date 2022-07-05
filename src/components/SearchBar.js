
import './Loading.css';
import React from 'react';
import '../App.css';

function retrieveWeather(e) {
    const input = document.querySelector('input');
    if(!input.validity.valid) {
        e.preventDefault()
    } else {
        document.getElementById('information').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        const city = new FormData(e.target).get('search');
        document.getElementById('location').textContent = `${city[0].toUpperCase()}${city.slice(1)}`;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dad1668d2a09e8fc09c452ba19dbb162`)
        .then(
                (res) => res.json())
        .then(
        async function(res) {
            const promise = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=O5Rq3DgUs9onISIeDz4S2Qwo0HmcLxXD&q=weather ${res.weather[0].main}&limit=1&offset=0&rating=g&lang=en`);
            const data = await promise.json();
            document.querySelector('#root').style.backgroundImage = `url(\"${data.data[0].images.original.url}\")`;
            document.getElementById('loading').style.display = 'none';
            document.getElementById('information').style.display = 'block';
            document.getElementById('degrees').textContent = `${ ( ( (res.main.temp - 273.15) * (9/5) ) + 32).toFixed(1) }`;
            }
        )
    }
}
function checkInput (e) {
    const errorOutput = document.getElementById('error');
    if(e.target.validity.tooShort || e.target.value === '') {
        errorOutput.textContent = 'Invalid length input must be at least three characters long';
    } else if(e.target.validity.patternMismatch) {
        errorOutput.textContent = 'Please use only alphabetical characters';
    }
}
function SearchBar() {

    return (
    <header className = 'searchBar'>
        <form onSubmit = {retrieveWeather} noValidate action = 'javascript:void(0)'>
        <div className='searchBarWrapper'>
            <input onInput= {checkInput} pattern='[A-z]+' minLength = '3' maxLength='85' type='text' name= 'search' id = 'search' placeholder='Search'></input>
            <div className='square'></div>
        </div>
        <span id='error'></span>
        </form>
    </header>);

}

export default SearchBar