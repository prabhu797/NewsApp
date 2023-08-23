import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar';

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
      <div>
        <Router>
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
            <Route exact path='about' element={<About/>}/>
          </Routes>
        </Router>
      </div>
    )
}

export default App