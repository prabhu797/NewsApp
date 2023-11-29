import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar';
import LinkedInLogo from './images and logos/linkedin-logo.png'
import GitHubLogo from './images and logos/github-mark.png'
import GitHubLogoDark from './images and logos/github-mark-white.png'

const App = () => {

  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState(false);

  const toggleMode = () => {
    if(mode) {
      setMode(false);
      document.body.style.backgroundColor = 'white';
    } else {
      setMode(true);
      document.body.style.backgroundColor = '#203754';
    }
  }

    return (
      <>
      <Router>
        <div>
          <Navbar mode={mode} toggleMode={toggleMode}/>
          <LoadingBar
              color='#f11946'
              height={3}
              progress={progress}
          />
          <Routes>
            <Route exact path='' element={<News setProgress={setProgress} mode={mode} key='general' category='general'/>}/>
            <Route exact path='business' element={<News setProgress={setProgress} mode={mode} key='business' category='business'/>}/>
            <Route exact path='entertainment' element={<News setProgress={setProgress} mode={mode} key='entertainment' category='entertainment'/>}/>
            <Route exact path='health' element={<News setProgress={setProgress} mode={mode} key='health' category='food'/>}/>
            <Route exact path='science' element={<News setProgress={setProgress} mode={mode} key='science' category='science'/>}/>
            <Route exact path='sports' element={<News setProgress={setProgress} mode={mode} key='sports' category='sports'/>}/>
            <Route exact path='technology' element={<News setProgress={setProgress} mode={mode} key='technology' category='tech'/>}/>
            <Route exact path='about' element={<About mode={mode}/>}/>
          </Routes>
        </div>
    
        <footer className="card-footer text-center" style={{backgroundColor: mode? '#0012ff24':'#c5eedc'}} >
          <small style={{color: mode? 'rgb(210 207 225)':'#595959'}}>Created by Prabhudev Desai&ensp;
          <Link target='_blank' to='https://www.linkedin.com/in/prabhudev797'><img src={LinkedInLogo} alt='linkedin' style={{height: '30px'}}></img></Link>
          &ensp;
          <Link target='_blank' to='https://www.github.com/prabhu797'><img src={mode? GitHubLogoDark: GitHubLogo} alt='linkedin' style={{height: '20px'}}></img></Link>
          </small>
        </footer>
        
      </Router>
    </>
    )
}
export default App