import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Predictions from './Pages/Predictions/Predictions'
import Home from './Pages/Home/Home'
import Contact from './Pages/Contact/Contact'
import About from './Pages/About/About'
import Layouts from './Pages/Layout/Layout'

function RoutesComp() {

  return (
    <>
      <Routes>
        <Route element={<Layouts/>}>
        {/* <Route element={<Layouts />}> */}
          <Route path='/' element={<Home/>}></Route>
          <Route path='/prediction' element={<Predictions/>}></Route>
          <Route path='/contact-us' element={<Contact/>}></Route>
          <Route path='/about-us' element={<About/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default RoutesComp