import React from 'react';
import './App.css';
import Header from './Header.js'
import Maplet from './Maplet.js'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: [
        { latitude: 44.4759, longitude: -73.2121 },
        { latitude: 44.4750, longitude: -73.2121 },
        { latitude: 44.4748, longitude: -73.2120 },
        { latitude: 44.4751, longitude: -73.2118 },
        { latitude: 44.4754, longitude: -73.2121 }
      ],

      showParking: false
    };
  }

  toggleParkingDisplay = () => {
    if (this.state.showParking === true) {
      this.setState({
        showParking: false
      })
    } else {
      this.setState({
        showParking: true
      })
    }
  };

  render() {
    return (
      <div className="App"  >
        <Header toggleParkingDisplay={this.toggleParkingDisplay} />
        <Maplet showParking={this.state.showParking} />
      </div>
    );
  }
}

export default App;