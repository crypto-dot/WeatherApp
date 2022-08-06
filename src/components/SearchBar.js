
import './Loading.css';
import React from 'react';
import '../App.css';
import "./SearchBar.css"

async function retrieveWeather(e) {
    const informationDiv = document.getElementById('information');
    const loadingSpinner = document.getElementById('loading');
    const locationDiv = document.getElementById('location');

    const formData = new FormData(e.target);
    const city = formData.get('city') ? formData.get('city').match(/[A-Za-zÀ-ÖØ-öø-ÿ]+/)[0] : null;
    let state = formData.get('state') ? formData.get('state').match(/[A-Za-zÀ-ÖØ-öø-ÿ]+/)[0] : null;
    let country = formData.get('country') ? formData.get('country').match(/[A-Za-zÀ-ÖØ-öø-ÿ]+/)[0] : null;

    informationDiv.style.display = 'none';
    loadingSpinner.style.display = 'block';

    locationDiv.textContent = `${city[0].toUpperCase()}${city.slice(1)}`;

    if (state != null && state !== "") {
        const stateCodeResponse = await fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-united-states-of-america-state&q=${state}&facet=ste_code`);
        const data = await stateCodeResponse.json();
        if (data.nhits === 0) {
            alert("Unable to find state code")
        } else {
            state = data.records[0].fields.ste_stusps_code;
        }
    }
    const countryCodeResponse = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await countryCodeResponse.json();
    country = data[0].cca2;
    if (country == null) {
        alert("Unable to find country code");
    }
    let query;
    if (state == null || state === "") {
        query = `${city},${country}`;
    } else {
        query = `${city},${state},${country}`;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=dad1668d2a09e8fc09c452ba19dbb162`)
        .then(
            (res) => res.json()
        )
        .then(
            async function (res) {
                const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=O5Rq3DgUs9onISIeDz4S2Qwo0HmcLxXD&q=weather ${res.weather[0].main}&limit=1&offset=0&rating=g&lang=en`);
                const data = await response.json();
                document.querySelector('body').style.backgroundImage = `url(\"${data.data[0].images.original.url}\")`;
                loadingSpinner.style.display = 'none';
                informationDiv.style.display = 'block';
                document.getElementById('degrees').textContent = `${(((res.main.temp - 273.15) * (9 / 5)) + 32).toFixed(1)}`;
                return data;
            }
        )
        .catch(error => {
            if (state == null || state === "") {
                alert(`Could not find the location. Searched for a location with a city of: ${city} and a country of: ${country}`);
            } else {
                alert(`Could not find the location. Searched for a location with a city of: ${city} and a state of: ${state} `);
            }
            loadingSpinner.style.display = 'none';

        });
}
function validateInput(e) {
    console.log(e.key);
    if (!(new RegExp(/[A-z]/).test(e.key)) && e.key !== "Backspace" && e.key !== ' ') {
        e.preventDefault();
    }
}
function SearchBar() {

    return (
        <header className='searchBar'>
            <form id="weatherForm" onSubmit={retrieveWeather} noValidate action='javascript:void(0)'>
                <div className='searchBarWrapper'>
                    <input onKeyDown={validateInput} minLength='3' maxLength='85' type='text' name='city' id='city' placeholder='Enter City'></input>
                    <div className='square'></div>
                </div>
                <div className='searchBarWrapper'>
                    <input onKeyDown={validateInput} maxLength='85' type='text' name='state' id='state' placeholder='Enter State (US ONLY)'></input>
                    <div className='square'></div>
                </div>
                <div className='searchBarWrapper'>
                    <input onKeyDown={validateInput} minLength='3' maxLength='85' type='text' name='country' id='country' placeholder='Enter Country'></input>
                    <div className='square'></div>
                </div>
            </form>
            <input value="Find Weather" form="weatherForm" type="submit" />
        </header >);

}

export default SearchBar