import React, { useEffect, useRef, useState } from "react";
import "./styles/booksingle.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";

function BookSingle() {
  const { id } = useParams();
  const [fadeIn, setFadeIn] = useState(false);
  const [singleBook, setSingleBook] = useState({});
  const [writer, setWriter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genres, setGenre] = useState({});
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
      const res = await axios.get(
        `/author/show_single/${singleBook.authorName}`
      );
      setWriter(res.data.result);
    };

    if (singleBook.authorName) {
      getAuthors();
    }
  }, [singleBook.authorName, id]);

  useEffect(() => {
    const getGenres = async () => {
      const res = await axios.get("/genre/show_all");
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
    let audioPath = singleBook.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
    let imagePath = singleBook.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    if (audioPath.startsWith("uploads/")) {
      let audioUrl = `http://localhost:5000/${audioPath}`;
      let imageUrl = `http://localhost:5000/${imagePath}`;

      return (
        <>
          <div
            className={`book-details ${fadeIn ? "fade-in" : ""}`}
            ref={bookDetailsRef}
          >
            <h2>{singleBook.bookTitle}</h2>
            <img src={imageUrl} alt="Book Cover" />
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
    } else {
      let audioUrl = `http://localhost:5000${audioPath}`;
      let imageUrl = `http://localhost:5000${imagePath}`;

      return (
        <>
          <div
            className={`book-details ${fadeIn ? "fade-in" : ""}`}
            ref={bookDetailsRef}
          >
            <h2>{singleBook.bookTitle}</h2>
            <img src={imageUrl} alt="Book Cover" />
            <a
              href={`/author_single/${writer._id}`}
              className="card-title"
              style={{ textDecoration: "none" }}
            >
              {writer?.AuthorName}
            </a>
            {/* <p>Author: {writer?.AuthorName}</p> */}
            <p>Genre: {genres.bookGenre}</p>
            <p>Description: {singleBook.bookDescription}</p>
            <p>Released On: {moment(singleBook.released).format("MMM Do YYYY") }</p>
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

  return <>{singleBookDisplay()}</>;
}

export default BookSingle;
