import React, { Component } from 'react'

export default class PrevNextBtns extends Component {
    render() {
        return (
            <div>
                <div className=" container d-flex justify-content-between">
                    <button disabled={this.props.page<=1} className="btn btn-primary" 
                    onClick={this.props.handleprevClick}
                     >&larr; Previous</button>
                    <button disabled={this.props.page+1>Math.ceil(this.props.totalPages/this.props.page)}
                    className="btn btn-primary" onClick={this.props.handlenextClick} >Next &rarr;</button>
                </div>
            </div>
        )
    }
}
