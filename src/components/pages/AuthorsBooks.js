
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles/books.css";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";


const AuthorsBooks = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(4);

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

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="row">
        {currentCards.map((result, index) => (
          <div key={index} className="col-md-4">
            <MyBooks result={result} id={id} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(cards.length / cardsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};


const MyBooks = ({result, id}) => {
    const[writer, setWriter] = useState([])
    const state = useContext(GlobalState);
   const [isLogged] = state.userApi.isLogged;
   const[isAdmin] = state.userApi.isAdmin


    useEffect(() => {
        const getAuthors = async () => {
          const res = await axios.get(`/author/show_single/${id}`);
          setWriter(res.data.result);
        };
      
        
          getAuthors();
        
      }, [id]);
  


      function listBooksDisplay() {
        const baseUrl = "http://localhost:5000";
        let audioPath = result.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
        let imagePath = result.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
      
        
        if (audioPath.startsWith("uploads/") || audioPath.startsWith("/uploads/")) {
          const audioUrl = audioPath.startsWith("/") ? `${baseUrl}${audioPath}` : `${baseUrl}/${audioPath}`;
          const imageUrl = imagePath.startsWith("/") ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;
      
          // console.log("imageUrl:", imageUrl);
          // console.log("audioUrl:", audioUrl);
      
          return (
            <>
    
    <div className="book-card">
      <div className="image-container">
        <img className="book-image" src={imageUrl} alt="Book 1" />
      </div>
    
      <div className="card-content">
        <a href={`/book_single/${result._id}`} style={{ textDecoration: "none" }}>{result.bookTitle}</a>
        <p className="card-text">{writer.AuthorName}</p>
        { isLogged === true && isAdmin === true ? <p className='card-text'> <a href={`/view_single_book/${result._id}`}> manage book</a></p> : "" }
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
        } else {
          let audioUrl = `${baseUrl}/${audioPath}`;
          let imageUrl = `${baseUrl}/${imagePath}`;
      
         
      
          return (
            <>
    
            <div className="book-card">
              <div className="image-container">
                <img className="book-image" src={imageUrl} alt="Book 1" />
              </div>
            
              <div className="card-content">
                <a href={`/book_single/${result._id}`} style={{ textDecoration: "none" }}>{result.bookTitle}</a>
                <p className="card-text">{writer.AuthorName}</p>
               { isLogged === true && isAdmin === true ? <p className='card-text'> <a href={`/view_single_book/${result._id}`}> manage book</a></p> : "" }
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