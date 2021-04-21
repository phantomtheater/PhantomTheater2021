// imports for the Nav Bar -----------------
import React, {useState} from "react";
import Burger from './Burger.js'
import "./BurgerNav.css";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import Menu from 'react-burger-menu/lib/menus/slide'


// Nav Bar functionality with links to home, about , artists, season and reserve components

const BurgerNav = (props) => {
 

  return(
    <div className="burgerNavBar">
          {/*menu */}
            <nav
            className='menu'
          >
            <li onClick={props.handleModal}><Link to="/">Home</Link></li>
            <li onClick={props.handleModal}><Link to="/About">About</Link></li>
            <li onClick={props.handleModal}><Link to="/AllArtist">Featured</Link></li>
            <li onClick={props.handleModal}><Link to="/Season">Season</Link></li>
            <li onClick={props.handleModal}><Link to="/AllArtist">Artists</Link></li>
    
    
            </nav>
          </div >
  )
}


//------export the component---------
export default BurgerNav;
