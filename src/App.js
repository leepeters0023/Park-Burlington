import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './App.css';
import Maplet from './Maplet.js'
import Header from './Header.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      spaces: [
        {latitude: 44.4759, longitude: -73.2121},
        {latitude: 44.4750, longitude: -73.2121},
        {latitude: 44.4748, longitude: -73.2120},
        {latitude: 44.4751, longitude: -73.2118},
        {latitude: 44.4754, longitude: -73.2121}
      ]
    }
  }
  render(){
  return (
    <div className="App">
      <Header  />
      <Maplet  
      />
    </div>
  );
  }
}

export default App;
