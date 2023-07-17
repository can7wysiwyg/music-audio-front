import React from "react";
import { useParams } from "react-router-dom";


const UpdateList = () => {
    const{id} = useParams()
    
  return (
    <div className="container" style={{marginTop: "3rem", textAlign: "center"}}>
      <h1 style={{fontFamily: "cursive"}}>What would you like to update?</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <a href={`/book_title/${id}`}>Book Title</a>
        </li>
        <li className="list-group-item">
          <a href={`/book_description/${id}`}>Book Description</a>
        </li>
        <li className="list-group-item">
          <a href={`/book_release/${id}`}>Book Release Date</a>
        </li>
      </ul>
    </div>
  );
};

export default UpdateList;
