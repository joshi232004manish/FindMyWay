
import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Bus from './pages/bus'
import Flight from './pages/flight'
import Holidays from './pages/holidays'
import Hotel from './pages/hotel'
import Train from './pages/train'
import MyProfile from './pages/myProfile'
import Headers from './components/headers'
function App() {
  return (
    <BrowserRouter>
    <Headers/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/bus' element={<Bus/>}></Route>
        <Route path='/flight' element={<Flight/>}></Route>
        <Route path='/holidays' element={<Holidays/>}></Route>
        <Route path='/hotel' element={<Hotel/>}></Route>
        <Route path='/train' element={<Train/>}></Route>
        <Route path='/my-profile' element={<MyProfile/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
