import { useState, useEffect } from "react";
import "./styles/books.css";
import axios from "axios";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";


function Books() {
  const [audios, setAudios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [audiosPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/audio/show_all");
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
        <h1 className="text-center"> books are loading cutie 🙂🙂🙂</h1>
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


  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get("/author/show_all");
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
              <a href={`/book_single/${audioItem._id}`} style={{ textDecoration: "none" }}>
                {audioItem.bookTitle}
              </a>
              <p className="card-text">{newWriters.AuthorName}</p>
              { isLogged === true && isAdmin === true ? <p className='card-text'> <a href={`/view_single_book/${audioItem._id}`}> manage book</a></p> : "" }
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
      let audioUrl = `http://localhost:5000${audioPath}`;
      let imageUrl = `http://localhost:5000${imagePath}`;

      return (
        <>
          <div className="book-card">
            <div className="image-container">
              <img className="book-image" src={imageUrl} alt="Book 1" />
            </div>

            <div className="card-content">
              <a href={`/book_single/${audioItem._id}`} style={{ textDecoration: "none" }}>
                {audioItem.bookTitle}
              </a>
              <p className="card-text">{newWriters.AuthorName}</p>
              { isLogged === true && isAdmin === true ? <p className='card-text'> <a href={`/view_single_book/${audioItem._id}`}> manage book</a></p> : "" }
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

  return <>{listBooksDisplay()}</>;
};

export default Books;
