import React from 'react'
import "./../../App.css"
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='mycard'>
         <div className="card auth-card input-field">
       <h2>
        Instagram
       </h2>
       <input type="text" placeholder='name' />
       <input type="text" placeholder='email' />
       <input type="text" placeholder='password' />
       <br /><br />
         <button className='btn waves-effect waves-light #64b5f6 blue lighten-1' >
            Signup
         </button>
         <br /><br />
         <h6>
        Already A User?  &nbsp;
            <Link to="/signin">
           click here
            </Link>
        </h6>
      </div>
    </div>
  )
}

export default Signup