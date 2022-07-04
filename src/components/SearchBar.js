import React from 'react';
import '../App.css';
function SearchBar() {

    return ( <header className = 'SearchBar'>
        <div className='square'></div>
        <input type='text' name= 'Search' id = 'search' placeholder='Search'></input>
    </header>);

}

export default SearchBar