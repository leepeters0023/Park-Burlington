import React from 'react'
import SearchBar from './SearchBar.js'

export default function Header() {
    return(
        <div id='header'>
            <img id="logo" src="logo-secondary.png"></img>
            <img id="logo-text" src="logo-text.png"></img>
            <SearchBar/>
        </div>
    )
}