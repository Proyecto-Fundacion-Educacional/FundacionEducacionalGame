import React from 'react'
import { Link } from 'react-router-dom'



export const LevelSelector = () => {
  return (<>    
    <div>LevelSelector</div>
    <Link to="lvl1" >Juego 1</Link>
    <Link to="lvl2" >Juego 2</Link>
    <Link to="lvl3" >Juego 3</Link>
    </>

  )
}
