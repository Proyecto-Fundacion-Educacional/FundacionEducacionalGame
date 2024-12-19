import { useState } from 'react'

import viteLogo from '/vite.svg'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LevelSelector} from './Components/LevelSelector/LevelSelector'

import Game2 from './Components/Game2/Game2'
import Game3 from './Components/Game3/Game3'
import Game1 from './Components/Game1/Game1'
import Game5 from './Components/Game5/Game5'
import Game6 from './Components/Game6/Game6'
import Game7 from './Components/Game7/Game7'
import Game4 from './Components/Game4/Game4'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<LevelSelector />} />
        <Route path="lvl3" element={<Game3/>}/>
        <Route path='lvl2' element={<Game2/>}/>
        <Route path='lvl4' element={<Game4/>}/>
        <Route path="lvl1" element={<Game1/>}/>
        <Route path="lvl5" element={<Game5/>}/>
        <Route path="lvl6" element={<Game6/>}/>
        <Route path="lvl7" element={<Game7/>}/>
  
  
      </Routes>
    </>
  )
}

export default App
