import React, { useEffect, useRef, useState } from 'react';
import "./styles/authorsingle.css"

function AuthorSingle() {
    const [fadeIn, setFadeIn] = useState(false);
  const authorDetailsRef = useRef(null);

  useEffect(() => {
    setFadeIn(true);
  }, []);

    return(<>
    <div
      className={`author-details ${fadeIn ? 'fade-in' : ''}`}
      ref={authorDetailsRef}>

<h2>Author Name</h2>
      <img src="author-avatar.jpg" alt="Author Avatar" />
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

export default AuthorSingle