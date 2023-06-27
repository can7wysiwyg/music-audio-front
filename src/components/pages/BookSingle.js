import React, { useEffect, useRef, useState } from 'react';
import "./styles/booksingle.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookSingle() {
    const{id} = useParams()
    const [fadeIn, setFadeIn] = useState(false);
    const[singleBook, setSingleBook] = useState({})
    const[writer, setWriter] = useState([])
    const bookDetailsRef = useRef(null);


    useEffect(() => {
      const getSingleBook = async () => {
        const res = await axios.get(`/audio/show_single/${id}`);
        setSingleBook(res.data.book);
      };
    
      getSingleBook();
    }, [id]);
    
    useEffect(() => {
      const getAuthors = async () => {
        const res = await axios.get(`/author/show_single/${singleBook.authorName}`);
        setWriter(res.data.result);
      };
    
      if (singleBook.authorName) {
        getAuthors();
      }
    }, [singleBook.authorName, id]);

    

  useEffect(() => {
    setFadeIn(true);
  }, [])

  if(Object.keys(singleBook).length < 8 ) {
    return(<>
     <h1 className='text-center'>please wait as audio loads</h1>
    
    </>)
  }

  if(Object.keys(writer).length < 8 ) {
    return(<>
     <h1 className='text-center'>please wait as writer loads loads</h1>
    
    </>)
  }

  function singleBookDisplay() {

    let audioPath = singleBook.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
    let imagePath = singleBook.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    if (audioPath.startsWith("uploads/")) {
      let audioUrl = `http://localhost:5000/${audioPath}`;
      let imageUrl = `http://localhost:5000/${imagePath}`;

      return (
        <>

<div
      className={`book-details ${fadeIn ? 'fade-in' : ''}`}
      ref={bookDetailsRef}
    >
      <h2>{singleBook.bookTitle}</h2>
      <img src={imageUrl} alt="Book Cover" />
      <p>Author: {writer?.AuthorName}</p>
      <p>Genre: Fiction</p>
      <p>
        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi vitae urna volutpat, tincidunt magna vel, malesuada purus.
      </p>
      <div className="audio-player">
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <a href="/" className="btn btn-primary">
        Buy Now
      </a>
    </div>

        
          
        </>
      );
    } else{
      let audioUrl = `http://localhost:5000${audioPath}`;
    let imageUrl = `http://localhost:5000${imagePath}`;

    return (
      <>

<div
      className={`book-details ${fadeIn ? 'fade-in' : ''}`}
      ref={bookDetailsRef}
    >
      <h2>{singleBook.bookTitle}</h2>
      <img src={imageUrl} alt="Book Cover" />
      <p>Author: {writer?.AuthorName}</p>
      <p>Genre: Fiction</p>
      <p>
        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi vitae urna volutpat, tincidunt magna vel, malesuada purus.
      </p>
      <div className="audio-player">
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <a href="/" className="btn btn-primary">
        Buy Now
      </a>
    </div>

      
        
      </>
    );


    }


  }
  

    return(<>

         
          { singleBookDisplay() }
    
    </>)
}

export default BookSingle