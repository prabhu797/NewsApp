import React, { Component } from 'react'
import Spinner from './Spinner'

export default class About extends Component {
  render() {
    return (
      <div className='container my-3 text-center'>
        <Spinner/>
        <h1 className='my-5'>Under progress... </h1>
        <img src="https://w7.pngwing.com/pngs/169/68/png-transparent-architectural-engineering-graphy-work-in-progress-angle-building-text-thumbnail.png" alt="" />
      </div>
    )
  }
}
