import React, { Component } from 'react'

export default class footer extends Component {
    myStyle={
        margin:"10px 0px 0px 0px",
        height:"40px",
        bottom:'0',
        backgroundColor:'black',
        color:"white",
        textAlign:"center"
    }
    render() {
        return (
            <div style={this.myStyle}>
                <p>
                &copy;2021 All rights reserved
                Harivardhan
                </p>
            </div>
        )
    }
}
