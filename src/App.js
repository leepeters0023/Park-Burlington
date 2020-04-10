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
      showPolygon: false,
      showLineString: false
    };
  }

  togglePolygonDisplay = () => {
    if (this.state.showPolygon === true) {
      this.setState({
        showPolygon: false
      })
    } else {
      this.setState({
        showPolygon: true
      })
    }
  };

  toggleLineStringDisplay = () => {
    if (this.state.showLineString === true) {
      this.setState({
        showLineString: false
      })
    } else {
      this.setState({
        showLineString: true
      })
    }
  };




  render() {
    return (
      <div className="App"  >
        <Header
          togglePolygonDisplay={this.togglePolygonDisplay}
          toggleLineStringDisplay={this.toggleLineStringDisplay}
        />
        <Maplet
          showPolygon={this.state.showPolygon}
          showLineString={this.state.showLineString}
        />
      </div>
    );
  }
}

export default App;