import React , {useState, useEffect} from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";

const Createpost = () => {
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        if(url){
        fetch("/createpost", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,body,pic:url})
         }).then(res=>res.json())
         .then(data=>{
            
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            } else {
                
                M.toast({html: "Posted Successfully", classes:"#43a047 green darken-1"})
                navigate("/")
            }
         }).catch(err=>console.log(err))
        }
    }, [url])

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "blfym6an"); // Corrected parameter name
        data.append("cloud_name", "diill0m3d");
        
        fetch("https://api.cloudinary.com/v1_1/diill0m3d/image/upload", {
          method: "POST",
          body: data
        })
          .then(res => res.json())
          .then(data => setUrl(data.url))
          .catch(err => console.log(err));
     
    
        };
    

  return (
    <div className="card input-field"
    style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding: "20px",
        textAlign:"center"      
    }}>
    <input  type="text" placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
    <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} />
    <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
            <span>Upload Image</span>
           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className='file-path-wrapper'>
            <input className="file-path validate" type="text"/>
        </div>
    </div>

    <button
    onClick={()=>{postDetails()}} className="btn waves-effect waves-light #64b5f6 blue darken-1">
        Submit Post
    </button>
    </div>
  )
}

export default Createpost