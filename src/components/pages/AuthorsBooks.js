import { Flipper, Flipped } from 'react-flip-toolkit';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles/books.css";


const AuthorsBooks = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://audiobooksapi.onrender.com/audio/show_author_books/${id}`);
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
    <div className="container" style={{marginTop: "6rem", marginBottom: "2rem"}}>
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
    const [isFlipped, setIsFlipped] = useState(false);

   const handleFlip = () => {
     setIsFlipped(!isFlipped);
   };
 
 
 


    useEffect(() => {
        const getAuthors = async () => {
          const res = await axios.get(`https://audiobooksapi.onrender.com/author/show_single/${id}`);
          setWriter(res.data.result);
        };
      
        
          getAuthors();
        
      }, [id]);
  


      function listBooksDisplay() {
             
          return (
            <>

<div>
      
<Flipper flipKey={isFlipped}>
  
  <div className="card flipping" onClick={handleFlip}>
    <div className="card-front">
      <Flipped flipId="card-front">
        <div className="card-body">
          <img src={result.audioImage} alt="Card Front" className="card-image" />
          <div className="card-details">
            <a href={`/book_single/${result._id}`} style={{ textDecoration: "none" }} className="card-title">{result.bookTitle}</a>
            <p className="card-text">{writer.AuthorName}</p>
          </div>
        </div>
      </Flipped>
    </div>

    <div className="card-back">
  <Flipped flipId="card-back">
    <div className="card-body">
      <a href={`/book_single/${result._id}`} style={{ textDecoration: "none" }} className="card-title">{result.bookTitle}</a>
      <div className="audio-container">
        <div className="audio-player">
          <audio controls>
            <source src={result.audioBook} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  </Flipped>
</div>


    
  </div>
</Flipper>

</div>







    
    {/* <div className="book-card">
      <div className="image-container">
        <img className="book-image" src={result.audioImage} alt="Book 1" />
      </div>
    
      <div className="card-content">
        <a href={`/book_single/${result._id}`} style={{ textDecoration: "none" }}>{result.bookTitle}</a>
        <p className="card-text">{writer.AuthorName}</p>
        { isLogged === true && isAdmin === true ? <p className='card-text'> <a href={`/view_single_book/${result._id}`}> manage book</a></p> : "" }
        <div className="audio-container">
          <audio controls>
            <source src={result.audioBook} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
    <br />
     */}
       
              
            </>

            
              
          );
        
      }
    
    

return(<>


{
    listBooksDisplay()
}

</>)

}

export default AuthorsBooks;