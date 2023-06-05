import React, {useState} from 'react'
import "./../../App.css"
import { Link, useNavigate} from 'react-router-dom'
import M from "materialize-css"


const Signup = () => {
  
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const signuptNavigation = (e) => {
    navigate(e); // Replace '/other-route' with the desired path
  };
  

  const PostData = () =>{
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name,password,email
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error, classes: "#c62828 red darken-3"})
              }
              else {
                M.toast({html: data.message,classes: "#43a047 green darken-1"})
                signuptNavigation("/signin");
              }
    }).catch(e=>console.log(e))
  }
  

  return (
    <div className='mycard'>
         <div className="card auth-card input-field">
       <h2>
        Instagram
       </h2>
       <input type="text" placeholder='name' onChange={(e)=>{
        setName(e.target.value)
       }} value={name}/>
       <input type="text" placeholder='email' onChange={(e)=>{
        setEmail(e.target.value)
       }}  value={email} />
       <input type="text" placeholder='password' onChange={(e)=>{
        setPassword(e.target.value)
       }} value={password} />
       <br /><br />
         <button className='btn waves-effect waves-light #64b5f6 blue darken-1' onClick={PostData} >
            Register
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