import React, { Component } from 'react';
import MapData from './BurlingtonParkingMap.geojson'
import ClearMapData from './ClearParkingMap.geojson'
import './App.css';

var map = ''
var dataLayer = ''
export default class mapSelection extends Component {
  constructor(props) {
    super(props)
    this.onScriptLoad = this.onScriptLoad.bind(this)
    this.state = {
      showParking: this.props.showParking
    }
  }


  onScriptLoad() {                                      
    // CREATE YOUR GOOGLE MAPS
    map = new window.google.maps.Map(
      document.getElementById('map'),
      {
        // ADD OPTIONS LIKE STYLE, CENTER, GESTUREHANDLING, ...
        center: { lat: 44.478081, lng: -73.215 },
        zoom: 15.3,
        gestureHandling: 'greedy',
        disableDefaultUI: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit.station.bus",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "on"
              }
            ]
          }
        ]

      });



  }



  componentDidMount() {
    // LOADING THE GOOGLE MAPS ITSELF
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://maps.google.com/maps/api/js?key=' + process.env.REACT_APP_API_KEY;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })

    } else {
      this.onScriptLoad()
    }
    console.log('map did mount and state is : ' + this.state.showParking)
  }

  componentDidUpdate() {
    if (this.props.showParking === true) {

      map.data.loadGeoJson(MapData)
      map.data.setStyle(function (feature) {
        let fillC = feature.getProperty('fill');
        let fillO = feature.getProperty('fill-opacity')
        let strokeC = feature.getProperty('stroke')
        let strokeO = feature.getProperty('stroke-opacity')
        let strokeW = feature.getProperty('stroke-width')

        return {
          fillColor: fillC,
          fillOpacity: fillO,
          strokeColor: strokeC,
          strokeOpacity: strokeO,
          strokeWeight: strokeW,
          zIndex: -10000
        };
      });
      console.log('component just updated and state should be true and it is: ' + this.props.showParking)

    } else {
      map.data.loadGeoJson(ClearMapData)
      console.log('component just updated and state should be false and it is: ' + this.props.showParking)
    }
  }

  render() {
    return (
      <div id='mapContainer'>
        <div style={{ width: '100%', height: '100%' }} id='map' />
      </div>
    );
  }

};


