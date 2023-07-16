import { useState, useEffect } from "react";
import "./styles/books.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { GlobalState } from "../../GlobalState";
import { useSpring, animated } from 'react-spring';
import { Flipper, Flipped } from 'react-flip-toolkit';



function Books() {
  const [audios, setAudios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [audiosPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const fadeProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("https://audiobooksapi.onrender.com/audio/show_all");
      setAudios(res.data.books);
    };

    getBooks();
  }, []);

  useEffect(() => {
    // Perform the search logic here
    const filteredResults = audios.filter((audio) =>
      audio.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm, audios]);

  if (audios.length === 0) {
    return (
      <>
      <animated.div style={fadeProps}>
      <h1 className="text-center">books are loading cutie 🙂🙂🙂</h1>
    </animated.div>
        
        
      </>
    );
  }

  // Pagination logic
  const indexOfLastAudio = currentPage * audiosPerPage;
  const indexOfFirstAudio = indexOfLastAudio - audiosPerPage;
  const currentAudios = searchTerm !== "" ? searchResults : audios.slice(indexOfFirstAudio, indexOfLastAudio);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  return (
    <>
      <div  className="container d-flex justify-content-center align-items-center " >
      <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by book title..."
            value={searchTerm}
            className="form-control"
            onChange={handleSearch}
          />
        </div>
        </div>
        <br />
        


        <div className="row">
          {currentAudios?.map((audioItem, index) => (
            <div key={index} className="col-md-4">
              <DisplayBooks audioItem={audioItem} />
            </div>
          ))}
        </div>
  

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(audios.length / audiosPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

const DisplayBooks = ({ audioItem }) => {
  const [writers, setWriters] = useState([]);
  const [newWriters, setNewWriters] = useState({});
  const state = useContext(GlobalState)
  const [isLogged] = state.userApi.isLogged;
   const[isAdmin] = state.userApi.isAdmin
   const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };


  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get("https://audiobooksapi.onrender.com/author/show_all");
      setWriters(res.data.authors);
    };

    getAuthors();
  }, []);

  useEffect(() => {
    if (audioItem.authorName) {
      writers.forEach((writer) => {
        if (writer._id === audioItem.authorName) {
          setNewWriters(writer);
        }
      });
    }
  }, [audioItem.authorName, writers]);
 
  
    
  function listBooksDisplay() {

  

      
      
      return (
        <>

<div className="container d-flex justify-content-center my-4 mb-5">
<Flipper flipKey={isFlipped}>
  <div className="card" onClick={handleFlip}>
    <div className="card-front">
      <Flipped flipId="card-front">
        <div className="card-body">
          <img src={audioItem.audioImage} alt="Card Front" className="card-image" />
          <div className="card-details">
            <h5 className="card-title">{audioItem.title}</h5>
            <p className="card-text">{audioItem.description}</p>
          </div>
        </div>
      </Flipped>
    </div>
    <div className="card-back">
      <Flipped flipId="card-back">
        <div className="card-body">
          <h5 className="card-title">Book Audio</h5>
          <div className="audio-player">
  <audio controls>
    <source src={audioItem.audioBook} type="audio/mpeg" />
  </audio>
</div>

        </div>
      </Flipped>
    </div>
  </div>
</Flipper>



  
</div>




          {/* <div className="book-card">
            <div className="image-container">
              <img className="book-image" src={audioItem.audioImage} alt="Book 1" />
            </div>
  
            <div className="card-content">
              <a href={`/book_single/${audioItem._id}`} style={{ textDecoration: "none" }}>
                {audioItem.bookTitle}
              </a>
              <p className="card-text">{newWriters.AuthorName}</p>
              {isLogged === true && isAdmin === true ? <p className='card-text'> <a href={`/view_single_book/${audioItem._id}`}> manage book</a></p> : ""}
              <div className="audio-container">
                <audio controls>
                  <source src={audioItem.audioBook} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          </div>
          <br /> */}
        </>
      );
   
  }
  
  
  return <>{listBooksDisplay()}</>;
};

export default Books;
