import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles/books.css";

const AuthorsBooks = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/audio/show_author_books/${id}`);
        setCards(response.data.books);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (cards.length === 0) {
    return (
      <div className="container">
        <h1 className="text-center">Books are loading...</h1>
      </div>
    );
  }

  return (
    <>
    <div className="container">
      <div className="row">
        {cards.map((result, index) => (
          <div key={index} className="col-md-4">
            <MyBooks result={result} />
            </div>
))}
</div>
</div>

    
    
    </>
      );
};

const MyBooks = ({result}) => {


    function listBooksDisplay() {
        let audioPath = result.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
        let imagePath = result.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
    
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
        <a href={`/book_single/${result._id}`} style={{ textDecoration: "none" }}>{result.bookTitle}</a>
        {/* <p className="card-text">{result.AuthorName}</p> */}
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
        <a href={`/book_single/${result._id}`} style={{ textDecoration: "none" }}>{result.bookTitle}</a>
        {/* <p className="card-text">{newWriters.AuthorName}</p> */}
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
    

return(<>


{
    listBooksDisplay()
}

</>)

}

export default AuthorsBooks;
