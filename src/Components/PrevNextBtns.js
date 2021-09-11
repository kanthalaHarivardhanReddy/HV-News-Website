import React, { Component } from 'react'

export default class PrevNextBtns extends Component {
    render() {
        return (
            <div>
                <div className=" container d-flex justify-content-between">
                    <button disabled={this.props.page<=1} className="btn btn-dark" 
                    onClick={this.props.handleprevClick}
                     >&larr; Previous</button>
                    <button  className="btn btn-dark" onClick={this.props.handlenextClick} >Next &rarr;</button>
                </div>
            </div>
        )
    }
}
