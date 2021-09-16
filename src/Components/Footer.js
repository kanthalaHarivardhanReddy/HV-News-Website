import React, { Component } from 'react'

export default class footer extends Component {
    myStyle={
        margin:"10px 0px 0px 0px",
        height:'60px',
        bottom:'0',
        backgroundColor:'black',
        color:"white",
        textAlign:"center"
    }
    render() {
        return (
            <div style={this.myStyle}>
                <p>
                &copy; {new Date().getFullYear()} All rights reserved<br/>
                <b>HariVardhan</b>
                </p>
            </div>
        )
    }
}
