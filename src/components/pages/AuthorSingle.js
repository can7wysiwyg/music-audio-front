import React, { useEffect, useRef, useState } from 'react';
import "./styles/authorsingle.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';

function AuthorSingle() {
    const{id} = useParams()
    const state = useContext(GlobalState)
    const[isLogged] = state.userApi.isLogged
    const[isAdmin] = state.userApi.isAdmin
    const [fadeIn, setFadeIn] = useState(false);
    const[writer, setWriter] = useState([])
    const authorDetailsRef = useRef(null);


    useEffect(() => {
      const getAuthors = async () => {
        const res = await axios.get(`https://audiobooksapi.onrender.com/author/show_single/${id}`);
        setWriter(res.data.result);
      };
    
      
        getAuthors();
      
    }, [ id]);




  useEffect(() => {
    setFadeIn(true);
  }, []);

  if(Object.keys(writer).length < 8 ) {
    return(<>
     <h1 className='text-center'>please wait as writer loads loads</h1>
    
    </>)
  }



  function displaySingleAuthor() {
    
      return (
        <>
        <div className={`author-details ${fadeIn ? 'fade-in' : ''}`} ref={authorDetailsRef}>
  <h2>{writer.AuthorName}</h2>
  <img src={writer.AuthorImage} alt="Author Avatar" />
  <p className="text-dark">location: {writer.AuthorLocation}</p>
  <p className="text-dark">email: {writer.AuthorEmail}</p>
  <p className="text-dark">phone number: {writer.AuthorPhoneNumber}</p>
  {isLogged === true && isAdmin === true ? (
    <a href={`/view_single/${writer._id}`} style={{ color: "blue" }}>manage user</a>
  ) : (
    ""
  )}
  <div className="social-icons">
    <a href="/"><i className="fab fa-facebook"></i></a>
    <a href="/"><i className="fab fa-twitter"></i></a>
    <a href="/"><i className="fab fa-instagram"></i></a>
    <a href="/"><i className="fab fa-linkedin"></i></a>
  </div>
</div>

        

        </>)






    



  }


    return(<>
    

    {
      displaySingleAuthor()
    }
    
    </>)
}

export default AuthorSingle