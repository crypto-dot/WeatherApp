import React from 'react';
import Information from './components/Information';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import './App.css';
function App() {
  return (
    <>
      <SearchBar/>
      <div className='lowerHalf'>
      <Loading/>
      <Information/> 
      </div>
    </>
  )
}

export default App
