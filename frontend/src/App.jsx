import { useState } from 'react'
import Body from './components/Body'
import Profile from './components/Profile'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CameraCapture from './components/CameraCapture';

function App() {
  return(
    //<Profile/>
    //<Body/>
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<CameraCapture/>} />
        <Route path="/camera" element={<CameraCapture/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
