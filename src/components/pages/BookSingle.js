import React, { useEffect, useRef, useState } from "react";
import "./styles/booksingle.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";


function BookSingle() {
  const { id } = useParams();
  const [fadeIn, setFadeIn] = useState(false);
  const [singleBook, setSingleBook] = useState({});
  const [writer, setWriter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genres, setGenre] = useState({});
  const bookDetailsRef = useRef(null);
  const state = useContext(GlobalState)
  const [isLogged] = state.userApi.isLogged;
   const[isAdmin] = state.userApi.isAdmin


  useEffect(() => {
    const getSingleBook = async () => {
      const res = await axios.get(`https://audiobooksapi.onrender.com/audio/show_single/${id}`);
      setSingleBook(res.data.book);
    };

    getSingleBook();
  }, [id]);

  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get(
        `https://audiobooksapi.onrender.com/author/show_single/${singleBook.authorName}`
      );
      setWriter(res.data.result);
    };

    if (singleBook.authorName) {
      getAuthors();
    }
  }, [singleBook.authorName, id]);

  useEffect(() => {
    const getGenres = async () => {
      const res = await axios.get("https://audiobooksapi.onrender.com/genre/show_all");
      setCategories(res.data.results);
    };

    getGenres();
  }, []);

  useEffect(() => {
    if (singleBook.audioGenre) {
      categories.forEach((category) => {
        if (category._id === singleBook.audioGenre) setGenre(category);
      });
    }
  }, [singleBook.audioGenre, categories]);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  if (Object.keys(singleBook).length < 8) {
    return (
      <>
        <h1 className="text-center">please wait as audio loads</h1>
      </>
    );
  }

  if (Object.keys(writer).length < 8) {
    return (
      <>
        <h1 className="text-center">please wait...</h1>
      </>
    );
  }

  

  function singleBookDisplay() {

    
      return (
        <>
          <div
            className={`book-details ${fadeIn ? "fade-in" : ""}`}
            ref={bookDetailsRef}
          >
            <h2>{singleBook.bookTitle}</h2>
            <img src={singleBook.audioImage} alt="Book Cover" />
            <a
              href={`/author_single/${writer._id}`}
              className="card-title"
              style={{ textDecoration: "none" }}
            >
              {writer?.AuthorName}
            </a>
            {/* <p>Author: {writer?.AuthorName}</p> */}
            <p>Genre: {genres.bookGenre} </p>
            <p>Description: {singleBook.bookDescription}</p>
            <p>Released On: {moment(singleBook.released).format("MMM Do YYYY")}</p>
            { isLogged === true && isAdmin === true ? <p className='card-text'> <a href={`/view_single_book/${singleBook._id}`}> manage book</a></p> : "" }
            <div className="audio-player">
              <audio controls>
                <source src={singleBook.audioBook} type="audio/mpeg" />
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

  return <>{singleBookDisplay()}</>;
}

export default BookSingle;
