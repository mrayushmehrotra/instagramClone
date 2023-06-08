import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const renderList = () =>{
    if(localStorage.getItem("jwt")){
      return [
        <li>
        <Link to="/profile">Profile</Link>
      </li>,
      
      <li>
        <Link to="/create">Create post</Link>
        
      </li>,
      <li>
      <button className="btn waves-effect waves-light #c62828 red darken-3" 
      onClick={()=>{
        localStorage.clear()
        window.location.href = "/signin"
      }}
      >Logout</button>
      </li>
      ]
    }else {
      return [ 
        <li>
        <Link to="/signup">Signup</Link>
      </li>,
      <li>
        <Link to="/signin">Signin</Link>
      </li>
      ]
    }
  }

  return (
    <>
      <nav>
        <div className="nav-wrapper white">
          <Link className="brand-logo left">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
