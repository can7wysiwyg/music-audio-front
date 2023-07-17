import { useEffect, useState } from "react";
import "./styles/books.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Flipper, Flipped } from 'react-flip-toolkit';

function BookAccordingToCat() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [single, setSingle] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const bookSpec = async () => {
      const res = await axios.get(
        `https://audiobooksapi.onrender.com/audio/show_according_to_genre/gnr?genre=${id}`
      );

      setItems(res.data.books);
    };

    bookSpec();
  }, [id]);

  useEffect(() => {
    const getSingle = async () => {
      const res = await axios.get(`https://audiobooksapi.onrender.com/genre/show_single/${id}`);
      setSingle(res.data.result);
    };

    getSingle();
  }, [id]);

  // Pagination logic
  const indexOfLastAudio = currentPage * itemsPerPage;
  const indexOfFirstAudio = indexOfLastAudio - itemsPerPage;
  const currentAudios = items.slice(indexOfFirstAudio, indexOfLastAudio);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{marginBottom: "2rem"}}>
      <br />
      <br />
      <h1 className="text-center"> {single.bookGenre} books... </h1>
      <div className="row">
        {currentAudios?.map((item, index) => (
          <div className="col-md-4">
          <ListedBooks key={index} item={item} />
          </div>
        ))}
      </div>


      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, index) => (
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
}

const ListedBooks = ({ item }) => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNew] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };


  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get("https://audiobooksapi.onrender.com/author/show_all");
      setAuthors(res.data.authors);
    };

    getAuthors();
  }, []);

  useEffect(() => {
    if (item.authorName) {
      authors.forEach((author) => {
        if (author._id === item.authorName) setNew(author);
      });
    }
  }, [item.authorName, authors]);


  function ToDisplay() {

    return(<>
    <div>
      
<Flipper flipKey={isFlipped}>
  
  <div className="card flipping" onClick={handleFlip}>
    <div className="card-front">
      <Flipped flipId="card-front">
        <div className="card-body">
          <img src={item.audioImage} alt="Card Front" className="card-image" />
          <div className="card-details">
            <a href={`/book_single/${item._id}`} style={{ textDecoration: "none" }} className="card-title">{item.bookTitle}</a>
            <p className="card-text">{newAuthor.AuthorName}</p>
          </div>
        </div>
      </Flipped>
    </div>

    <div className="card-back">
  <Flipped flipId="card-back">
    <div className="card-body">
      <a href={`/book_single/${item._id}`} style={{ textDecoration: "none" }} className="card-title">{item.bookTitle}</a>
      <div className="audio-container">
        <div className="audio-player">
          <audio controls>
            <source src={item.audioBook} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  </Flipped>
</div>


    
  </div>
</Flipper>

</div>

    
    
    
    
    </>)
  
  }




  
  return <>{ToDisplay()}</>;
};

export default BookAccordingToCat;
