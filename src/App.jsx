import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/header/Navbar'
import { routes } from './helpers/routes'
import './assets/styles/Main.css'
const App = () => {
  return (
    <div className='wrapper'>
      <Navbar />
      <Routes>
        {routes.map((item) => (
          <Route path={item.path} element={item.element} key={item.path} />
        ))}
      </Routes>
    </div>
  )
}

export default App