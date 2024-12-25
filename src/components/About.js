import React from 'react'
import Spinner from './Spinner'

const About = (props) => {

    return (
      <div className='container my-3 text-center'>
        <Spinner mode={props.mode}/>
        <h1 className='my-5' style={{color: props.mode? 'white':'black'}}>Under progress... </h1>
        <img src="https://w7.pngwing.com/pngs/169/68/png-transparent-architectural-engineering-graphy-work-in-progress-angle-building-text-thumbnail.png" alt="" />
      </div>
    )
}

export default About