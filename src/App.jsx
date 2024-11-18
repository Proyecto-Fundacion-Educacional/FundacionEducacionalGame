import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LevelSelector } from './Components/LevelSelector/LevelSelector'
import Game1 from './Components/Game1/Game1'
import Game2 from './Components/Game2/Game2'
import Game3 from './Components/Game3/Game3'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<LevelSelector />} />
        <Route path="lvl1" element={<Game1/>}/>
        <Route path="lvl2" element={<Game2/>}/>
        <Route path="lvl3" element={<Game3/>}/>
  
  
      </Routes>
    </>
  )
}

export default App
