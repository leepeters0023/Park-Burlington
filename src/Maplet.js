import React, { Component } from 'react';
import MapData from './BurlingtonParkingMap.geojson'
import './App.css';

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
                center: { lat: 44.478081, lng: -73.215739 },
                zoom: 16,
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
            map.data.loadGeoJson(MapData)
            map.data.setStyle(function(feature) {
              let fillC = feature.getProperty('fill');
              let fillO = feature.getProperty('fill-opacity')
              let strokeC = feature.getProperty('stroke')
              let strokeO = feature.getProperty('stroke-opacity')
              let strokeW = feature.getProperty('stroke-width')
              
              return {
                fillColor: fillC,
                fillOpacity:  fillO,
                strokeColor: strokeC,
                strokeOpacity: strokeO,
                strokeWeight: strokeW,
                zIndex: -10000
              };
          });
    }

    //Currently not ever calling this data handler
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
                
                // ADD SOME NEW STYLE IF YOU WANT TO
             
                // console.log(featureCollection)                   
                // map.data.setStyle(map.data.getStyle()) 
                // featureCollection.features.forEach(feature => {
                //   map.data.addGeoJson(feature)
                //   console.log(JSON.stringify(feature.properties.fill))
                //   if (feature.properties.fill) {
                //     feature.setProperty("fillColor", feature.properties.fill);
                //   } 
                    
                //   console.log(feature)
                // });
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
            // this.dataHandler(MapData)

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
