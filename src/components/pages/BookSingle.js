import React, { useEffect, useRef, useState } from 'react';
import "./styles/booksingle.css"

function BookSingle() {
    const [fadeIn, setFadeIn] = useState(false);
  const bookDetailsRef = useRef(null);

  useEffect(() => {
    setFadeIn(true);
  }, [])

    return(<>
    <div
      className={`book-details ${fadeIn ? 'fade-in' : ''}`}
      ref={bookDetailsRef}
    >
      <h2>Book Title</h2>
      <img src="book-cover.jpg" alt="Book Cover" />
      <p>Author: John Doe</p>
      <p>Genre: Fiction</p>
      <p>
        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi vitae urna volutpat, tincidunt magna vel, malesuada purus.
      </p>
      <div className="audio-player">
        <audio controls>
          <source src="book-audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <a href="/" className="btn btn-primary">
        Buy Now
      </a>
    </div>

    
    </>)
}

export default BookSingle