import React, { Component } from 'react';
import MapData from './BurlingtonParkingMap.geojson'
import google from 'react-google-maps'


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
            map.data.loadGeoJson(MapData)
            map.data.setStyle(function(feature) {
              var stroke = feature.getProperty('stroke')
              var color = feature.getProperty('fill');
              
              return {
                fillColor: color,
                strokeColor: stroke,
              };
            }); 

        

    };

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
                 
                featureCollection.features.forEach(feature => {
                    
                    let coords = feature.geometry.coordinates
                    // map.data.add(polygon)
                        console.log(feature)
                    let i = feature.geometry.type
                    if(i === 'polygon'){
                        map.data.addListener('click', (event) => {
                            console.log(feature.properties.name)
                            console.log(feature.properties.description)
                        })
                      
                    }else if(i === 'LineString'){
                        map.data.addListener('click', (event) => {
                            console.log(feature.properties.name)
                            console.log(feature.properties.description)
                        })
                    }
                })

                
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