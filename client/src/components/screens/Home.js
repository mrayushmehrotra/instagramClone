import React, { useState, useEffect } from "react";
import M from "materialize-css"

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
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData)
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  }
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: postId,
        text: text,
      }),
    }).then(console.log(postId, text))
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) {
          
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        console.log(newData)
      })
      .catch(err => console.log(err));
  };
  
  
  const jwtWhileLogin = localStorage.getItem("user");
  const parseData = JSON.parse(jwtWhileLogin);
  const userId = parseData._id;

  
  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name} <span>  <i className="material-icons delete-icon deleteIcon">delete</i></span></h5> 
          

            <div className="card-image">
              <img src={item.photo} alt="photo" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>

              {item.likes.includes(userId) ? (
                <button onClick={() => unlikePost(item._id)}>
                  <i className="material-icons">thumb_down</i>
                </button>
              ) : (
                <button onClick={() => likePost(item._id)}>
                  <i className="material-icons">thumb_up</i>
                </button>
              )}

              <h6>{item.likes.length} Likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {
                item.comment.map(records=>{
                  return <h6><span style={{fontWeight:"500"}}>{records.postedBy.name}:</span>
                  {records.text}</h6>
                })
              }
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                 makeComment(e.target[0].value, item._id)
                }}
              >
                <input type="text" placeholder="add Comment" />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
