

import React, { useState } from 'react';
import '../App.css';

function retrieveWeather(e) {
    const input = document.querySelector('input');
    if(!input.validity.valid) {
        e.preventDefault()
    } else {
        const city = new FormData(e.target).get('search');
        fetch(`http://api.openweathermap.org/data/2.5/forecast?${city}&appid=dad1668d2a09e8fc09c452ba19dbb162`).then(
            function(res) {
                return res.json();
            }
        ).then(
            function(res) {
                console.log(res);
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
            <input onInput= {checkInput} pattern='/\w+/' minLength = '3' maxLength='85' type='text' name= 'search' id = 'search' placeholder='Search'></input>
            <div className='square'></div>
        </div>
        <span id='error'></span>
        </form>
    </header>);

}

export default SearchBar