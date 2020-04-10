
import React from 'react'




export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showParking: this.props.showParking,
            toggleParkingDisplay: this.props.toggleParkingDisplay
        }

    }

    render() {
        return (
            <div id='header'>
                <img id="logo" src="logo-secondary.png" alt={'no logo'}></img>
                <img id="logo-text" src="logo-text.png" alt={'no logo text'}></img>

               
                <button onClick={this.props.togglePolygonDisplay} >Off-Street</button>
                <button onClick={this.props.toggleLineStringDisplay} >On-Street</button>
            </div>
        )
    }
}

export default Header