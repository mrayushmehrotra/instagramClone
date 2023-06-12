import React ,{useState, useEffect} from 'react'
import "./../../App.css"
import { Link, useNavigate } from 'react-router-dom'
import M from "materialize-css"

const Signin = () => {  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const signuptNavigation = (e) => {
    navigate(e); // Replace '/other-route' with the desired path
  };
  

  const PostData = () =>{
    fetch("/signin", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        password,email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error, classes: "#c62828 red darken-3"})
              }
              else {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.savedUser))
                M.toast({html: "signed in successfully",classes: "#43a047 green darken-1"})
                window.location.href = "/"
              }
    }).catch(e=>console.log(e))
  }
  
  useEffect(() => {
    removePasswordFromLocalStorage();
  }, []);

  const removePasswordFromLocalStorage = () => {
    try {
      const storedData = localStorage.getItem('myData');
      if (!storedData) {
        return; // No data in localStorage, exit function
      }

      const parsedData = JSON.parse(storedData);
      delete parsedData.password;
      
      localStorage.setItem('myData', JSON.stringify(parsedData));
     
    } catch (error) {
      console.error('Error removing password:', error);
    }
  };
  return (
    <div className='mycard'>
         <div className="card auth-card input-field">
       <h2>
        Instagram
       </h2>
       <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
       <input type="text" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
       <br /> <br/>
         <button  onClick={PostData} className='btn waves-effect waves-light #64b5f6 blue darken-1' >
            Login
         </button>
         <br /><br />
         <h6>
        Don't Have An Account?  &nbsp;
            <Link to="/signup">
           click here
            </Link>
        </h6>
      </div>
    
    </div>
  )
}

export default Signin