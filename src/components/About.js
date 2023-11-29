import React from 'react'
import Spinner from './Spinner'

const About = (props) => {

    return (
      <div className='container my-3 text-center'>
        
          <div className="card" style={{marginTop: '75px', backgroundColor: props.mode? '#FFEFD5':'#FFEFD5'}}>
            <div className="card-body">
              <h5 className="card-title"><b>Jai Shree Ram 🙏</b></h5>
                <p className="card-text">राम रतन धन जो कोई पाए <br/> जीवन भर रामायण गाए <br/> मंगल भवन अमंगल हारी <br/> द्रवहु सु दशरथ अजर बिहारी</p>
            </div>
          </div>
        

        <Spinner mode={props.mode}/>
        <h1 className='my-5' style={{color: props.mode? 'white':'black'}}>Under progress... </h1>
        {/* <img src="https://w7.pngwing.com/pngs/169/68/png-transparent-architectural-engineering-graphy-work-in-progress-angle-building-text-thumbnail.png" alt="" /> */}
      </div>
    )
}

export default About