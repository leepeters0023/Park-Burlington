
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

                {/* <div id='toggleSelector'> */}
                <button onClick={this.props.toggleParkingDisplay} >Show / Hide Parking</button>
                {/* </div> */}
            </div>
        )
    }
}

export default Header