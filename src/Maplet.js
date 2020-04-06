import React, { Component } from 'react';
import MapData from './BurlingtonParkingMap.geojson'
import React, { Component } from 'react'
import './App.css';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



var map = ''
var dataLayer = ''
export default class mapSelection extends Component  {
    constructor(props){
        super(props)
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }
    onScriptLoad() {
        // CREATE YOUR GOOGLE MAPS
        map = new window.google.maps.Map(
          document.getElementById('map'),
           {
                // ADD OPTIONS LIKE STYLE, CENTER, GESTUREHANDLING, ...
                center: { lat: 44.4759, lng: -73.2121 },
                zoom: 15,
                gestureHandling: 'greedy',
                disableDefaultUI: false,
            });
    }
   }

  }
  
export class Maplet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: [
        { latitude: 44.4759, longitude: -73.2121 },
        { latitude: 44.4750, longitude: -73.2121 },
        { latitude: 44.4748, longitude: -73.2120 },
        { latitude: 44.4751, longitude: -73.2118 },
        { latitude: 44.4754, longitude: -73.2121 }
      ]
    }
  }

  addJson = () => {
    Map.data.loadGeoJson(
      'https://storage.googleapis.com/mapsdevsite/json/google.json');
  }

  displayMarkers = () => {
    return this.state.spaces.map((space, index) => {
      return <Marker key={index} id={index} position={{
        lat: space.latitude,
        lng: space.longitude
      }}
        onClick={() => console.log("You clicked me!")} />
    })
  }

  displayKml = () => {
    
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{ lat: 44.4759, lng: -73.2121 }}>
        {this.addJson()}
        {this.displayMarkers()}
      </Map>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY  // we'll need to revisit this before going live, this method is not secure enough for the web. Will consider restricting by HTTP referer or finding a canonic way 
})(Maplet);
    dataHandler = (getJson) => {
        // FIRST I REMOVE THE CURRENT LAYER (IF THERE IS ONE)
        // for (var i = 0; i < dataLayer.length; i++) {
        //     // map.data.remove(dataLayer[i])
        // }
        // THEN I FETCH MY JSON FILE, IN HERE I'M USING A PROP BECAUSE 
        // I WANT TO USE THIS DATAHANDLER MULTIPLE TIMES & DYNAMICALLY 
        // I CAN NOW DO SOMETHING LIKE THIS: 
        // onClick(this.dataHandler(www.anotherlinktojsonfile.com/yourjsonfile.json))
        // ON EACH BUTTON AND CHOOSE WHICH JSON FILE NEEDS TO BE FETCHED IN MY DATAHANDLER.
        fetch(getJson)
            .then(response => response.json())
            .then(featureCollection => {
                dataLayer = map.data.addGeoJson(featureCollection)
                // ADD SOME NEW STYLE IF YOU WANT TO
                // map.data.setStyle({fillColor: "#7cb342", fillOpacity: 1});
                console.log(featureCollection)
                // map.data.getStyle()
                featureCollection.features.forEach(feature => {
                  map.data.addGeoJson(feature)
                  console.log(feature)
                });
            }
            );
        map.data.addListener('mouseover', (event) => {
            map.data.revertStyle();
            // ADD A STYLE WHEN YOU HOVER OVER A SPECIFIC POLYGON
               
            // IN CONSOLE LOG, YOU CAN SEE ALL THE DATA YOU CAN RETURN
            // console.log(event.feature)
        });
        map.data.addListener('mouseout', (event) => {
            // REVERT THE STYLE TO HOW IT WAS WHEN YOU HOVER OUT
            map.data.revertStyle();
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
            this.dataHandler(MapData)

          })
        } else {
          this.onScriptLoad()
        }
    }
    render () {
        return (
            <div id='mapContainer'>
                <div style={{ width: '100%', height: '100%' }} id='map' />
            </div>
        );
    }
};
