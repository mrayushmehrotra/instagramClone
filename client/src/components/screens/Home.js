import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)        
         setData(result.posts);
      });
  }, []);

  const likePost = (id) => {

    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json()).then(result => {
      const newData = data.map(item => {
        if (item._id === result._id) {
          return result;
        } else {
          return item;
        }
      });
      // Use the updated newData variable here or set it to the state if applicable
    }).catch(err => console.log(err));
  };
  
const unlikePost = (id) =>{

  fetch("/unlike", {
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res=>res.json()).then(result=>{
    const newData = data.map(item=>{
      if(item._id ===result._id){
        return result
      } else {
        return item
      }
    })
    setData(newData)
  }).catch(err=>console.log(err))
}
const jwtWhileLogin = localStorage.getItem("user")
const parseData = JSON.parse(jwtWhileLogin)
const userId = parseData._id

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item.postedBy._id} >
         
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="photo" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
            
              {item.likes.includes(userId)
              ? <button onClick={()=> unlikePost(item._id)}><i  className="material-icons">thumb_down</i></button>
              : 
              <button onClick={() => likePost(item._id)}><i className="material-icons">thumb_up</i></button>    
              }
              
              <h6>{item.likes.length} Likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add Comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};






export default Home;
