import { useState, useEffect } from "react";
import "./styles/books.css";
import axios from "axios";

function Books() {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/audio/show_all");

      setAudios(res.data.books);
    };

    getBooks();
  }, []);

  

  if (audios.length === 0) {
    return (
      <>
        <h1 className="text-center"> books are loading cutie 🙂🙂🙂</h1>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {audios?.map((audioItem, index) => (
            <div key={index} className="col-md-4">
              <DisplayBooks audioItem={audioItem} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const DisplayBooks = ({ audioItem }) => {

  const[writers, setWriters] = useState([])
  const[newWriters, setNewWriters] = useState({})

  useEffect(() => {

    const getAuthors = async() => {
      const res = await axios.get("/author/show_all");
      setWriters(res.data.authors);

    }

    getAuthors()

  }, [])

  

  useEffect(() => {
    if(audioItem.authorName) {

      writers.forEach((writer) => {
        if(writer._id === audioItem.authorName) {
          setNewWriters(writer)

        }
      })

    }

  }, [audioItem.authorName, writers])

  
  function listBooksDisplay() {
    let audioPath = audioItem.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
    let imagePath = audioItem.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    if (audioPath.startsWith("uploads/")) {
      let audioUrl = `http://localhost:5000/${audioPath}`;
      let imageUrl = `http://localhost:5000/${imagePath}`;

      return (
        <>

<div className="book-card">
  <div className="image-container">
    <img className="book-image" src={imageUrl} alt="Book 1" />
  </div>

  <div className="card-content">
    <a href={`/book_single/${audioItem._id}`} style={{ textDecoration: "none" }}>{audioItem.bookTitle}</a>
    <p className="card-text">{newWriters.AuthorName}</p>
    <div className="audio-container">
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  </div>
</div>
<br />

   
          
        </>
      );
    } else{
      let audioUrl = `http://localhost:5000${audioPath}`;
    let imageUrl = `http://localhost:5000${imagePath}`;

    return (
      <>

<div className="book-card">
  <div className="image-container">
    <img className="book-image" src={imageUrl} alt="Book 1" />
  </div>

  <div className="card-content">
    <a href={`/book_single/${audioItem._id}`} style={{ textDecoration: "none" }}>{audioItem.bookTitle}</a>
    <p className="card-text">{newWriters.AuthorName}</p>
    <div className="audio-container">
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  </div>
</div>
<br />

      
        
      </>
    );


    }
  }

  return( <>

  
  
  
  {listBooksDisplay()}
  
  
  
  </>)
};

export default Books;

