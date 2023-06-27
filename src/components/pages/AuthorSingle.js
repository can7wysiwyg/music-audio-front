import React, { useEffect, useRef, useState } from 'react';
import "./styles/authorsingle.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AuthorSingle() {
    const{id} = useParams()
    const [fadeIn, setFadeIn] = useState(false);
    const[writer, setWriter] = useState([])
    const authorDetailsRef = useRef(null);


    useEffect(() => {
      const getAuthors = async () => {
        const res = await axios.get(`/author/show_single/${id}`);
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
    let imagePath = writer.AuthorImage.authorImageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    if (imagePath.startsWith("uploads/")) {
      let imageUrl = `http://localhost:5000/${imagePath}`;

      return (
        <>
        <div
      className={`author-details ${fadeIn ? 'fade-in' : ''}`}
      ref={authorDetailsRef}>

<h2>{ writer.AuthorName }</h2>
      <img src={imageUrl} alt="Author Avatar" />
      <p>Genre: Fiction</p>
      <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae urna volutpat, tincidunt magna vel, malesuada purus.</p>
      <p>Website: <a href="https://www.authorwebsite.com">www.authorwebsite.com</a></p>
      <div className="social-icons">
        <a href="/"><i className="fab fa-facebook"></i></a>
        <a href="/"><i className="fab fa-twitter"></i></a>
        <a href="/"><i className="fab fa-instagram"></i></a>
        <a href="/"><i className="fab fa-linkedin"></i></a>
      </div>




    </div>


        </>)






    } else{
      let imageUrl = `http://localhost:5000${imagePath}`;

      return (
        <>

<div
      className={`author-details ${fadeIn ? 'fade-in' : ''}`}
      ref={authorDetailsRef}>

<h2>{ writer.AuthorName }</h2>
      <img src={imageUrl} alt="Author Avatar" />
      <p>Genre: Fiction</p>
      <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae urna volutpat, tincidunt magna vel, malesuada purus.</p>
      <p>Website: <a href="https://www.authorwebsite.com">www.authorwebsite.com</a></p>
      <div className="social-icons">
        <a href="/"><i className="fab fa-facebook"></i></a>
        <a href="/"><i className="fab fa-twitter"></i></a>
        <a href="/"><i className="fab fa-instagram"></i></a>
        <a href="/"><i className="fab fa-linkedin"></i></a>
      </div>




    </div>



        </>)


    }




  }


    return(<>
    

    {
      displaySingleAuthor()
    }
    
    </>)
}

export default AuthorSingle