import React, { Component } from 'react'
import { Client } from "@googlemaps/google-maps-services-js"
import './App.css';
//import axiosInstance from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const client = new Client({});
const dotenv = require('dotenv');

let mapStyles = {
  width: '100%',
  height: '92vh',
}

export class Maplet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: [
        {latitude: 44.4759, longitude: -73.2121},
        {latitude: 44.4750, longitude: -73.2121},
        {latitude: 44.4748, longitude: -73.2120},
        {latitude: 44.4751, longitude: -73.2118},
        {latitude: 44.4754, longitude: -73.2121}
      ]
    }
  }
  /*componentDidMount() {
   async function initMap() {
    src="https://maps.googleapis.com/maps/api/js?key=///////key//////////&callback=initMap"
    let map = new google.maps.Map(), {
      zoom: 4,
      center: {lat: -25.344, lng: 131.036}
    }
   }

  }*/
  
  displayMarkers = () => {
    return this.state.spaces.map((space, index) => {
      return <Marker key={index} id={index} position={{
       lat: space.latitude,
       lng: space.longitude
     }}
     onClick={() => console.log("You clicked me!") }  />
    })
  }


  render() {
    return (
        <Map
          google={this.props.google}
          zoom={15}
          style={mapStyles}
          initialCenter={{ lat: 44.4759, lng: -73.2121}}>
          
          {this.displayMarkers()}
          </Map>
      )
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(Maplet);