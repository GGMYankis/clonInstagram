
import React from 'react';
import {Link} from "react-router-dom";
import "./Header.css";
import RightHeader from "./RightHeader";
import Search from './Search/Search';

function Header() {

  return (
    <div className='header'>
      
       <Link to="/">TU CHAT</Link>
       <div>
        <Search/>
       </div>
       <div>
        <RightHeader/>
       </div>
    </div>
  )

}

export default Header
