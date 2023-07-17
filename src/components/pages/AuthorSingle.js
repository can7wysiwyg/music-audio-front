import React, { useEffect, useRef, useState } from "react";
import "./styles/authorsingle.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function AuthorSingle() {
  const { id } = useParams();
  const [fadeIn, setFadeIn] = useState(false);
  const [writer, setWriter] = useState([]);
  const authorDetailsRef = useRef(null);

  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get(
        `https://audiobooksapi.onrender.com/author/show_single/${id}`
      );
      setWriter(res.data.result);
    };

    getAuthors();
  }, [id]);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  if (Object.keys(writer).length < 8) {
    return (
      <div style={{marginTop: "5rem", marginBottom: "5rem"}}>
        <h1 className="text-center">please wait as writer loads loads</h1>
      </div>
    );
  }

  function displaySingleAuthor() {
    return (
      <>
        <div
          className={`author-details ${fadeIn ? "fade-in" : ""}`}
          ref={authorDetailsRef}
          style={{ marginTop: "3rem", textAlign: "center", fontFamily: "Helvetica" }}
        >
          <a
            className="h3"
            href={`/authors_books/${writer._id}`}
            style={{ color: "blue" }}
          >
            {writer.AuthorName}
          </a>
          <div style={{ marginBottom: "1rem" }}></div>
          <img
            src={writer.AuthorImage}
            alt="Author Avatar"
            style={{ width: "100%", height: "30vh", objectFit: "contain" }}
          />
          <div style={{ marginBottom: "1rem" }}></div>
          <p className="text-dark">location: {writer.AuthorLocation}</p>
          <p className="text-dark">email: {writer.AuthorEmail}</p>
          <p className="text-dark">phone number: {writer.AuthorPhoneNumber}</p>
          <div className="social-icons">
            <a href="/">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </>
    );
  }

  return <>{displaySingleAuthor()}</>;
}

export default AuthorSingle;
