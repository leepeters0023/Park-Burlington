import React, { Component } from 'react'
import { Client } from "@googlemaps/google-maps-services-js"
import './App.css';
import axiosInstance from 'axios';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const client = new Client({});

class Maplet extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  /*componentDidMount() {
   async function initMap() {
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDn6biiYSbeE_Q1FX8ujW65HS32ItfWVhI&callback=initMap"
    let map = new google.maps.Map(), {
      zoom: 4,
      center: {lat: -25.344, lng: 131.036}
    }
   }

  }*/

  render() {
    return (
      <div>
        <Map google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}} />
      </div >
    )
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDn6biiYSbeE_Q1FX8ujW65HS32ItfWVhI'
})(MapContainer);

export default Maplet


