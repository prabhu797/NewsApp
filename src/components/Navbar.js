// import PropTypes from 'prop-types'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Logo from '../images and logos/favicon-32x32.png'

const Navbar = (props) => {

    const {mode, toggleMode} = props;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
        <div>

        <nav className={`navbar fixed-top navbar-expand-lg navbar-${mode? 'dark' : 'light'} bg-${mode? 'dark' : 'light'}`}>
        <div className="container-fluid">

            <Link className="navbar-brand" to=''> <img src={Logo} alt="Logo" style={{height: '22px', width: '24px',     position: 'relative', bottom: '3px',}}/> News 24*7</Link>

            <button className="navbar-toggler" type="button" onClick={toggleMenu} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" onClick={toggleMenu} aria-current="page" to="">Home</Link>
                </li>
                <li className="nav-item"><Link className="nav-link" onClick={toggleMenu} to="/business">Business</Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={toggleMenu} to="/entertainment">Entertainment</Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={toggleMenu} to="/health">Food</Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={toggleMenu} to="/science">Science</Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={toggleMenu} to="/sports">Sports</Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={toggleMenu} to="/technology">Technology</Link></li>
                <li className="nav-item"><Link className="nav-link" onClick={toggleMenu} to="/about">About</Link></li>
            </ul>
                <div className="form-check form-switch">
                <input className="form-check-input" onClick={toggleMode} type="checkbox" role='switch' id="flexSwitchCheckChecked"/>
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{color: mode? 'white' : 'black'}}>Enable {mode? 'Light':'Dark'} Mode</label>
                </div>
            </div>
        </div>
        </nav>

      </div>
      </>
    )
}

Navbar.defaultProps = {
    mode: false,
}

Navbar.protoTypes = {
    mode: PropTypes.bool.isRequired,
}

export default Navbar