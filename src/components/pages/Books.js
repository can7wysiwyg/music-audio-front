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
    <h5 className="card-title"> {audioItem.bookTitle} </h5>
    <p className="card-text">Description for Book 1</p>
    <audio controls>
      <source src={audioUrl} type="audio/mpeg" />
    </audio>
  </div>
</div>

          
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
    <a href={`/book_single/${audioItem._id}`} className="card-title" style={{ textDecoration: "none"}}>{audioItem.bookTitle}</a>
    <p className="card-text">{audioItem.authorName}</p>
    
    <audio controls>
      <source src={audioUrl} type="audio/mpeg" />
    </audio>

    
  </div>
</div>

        
      </>
    );


    }
  }

  return( <>

  
  
  
  {listBooksDisplay()}
  
  
  
  </>)
};

export default Books;

