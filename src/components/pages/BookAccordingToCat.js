import { useEffect, useState } from "react";
import "./styles/bookcat.css";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookAccordingToCat() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [single, setSingle] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const bookSpec = async () => {
      const res = await axios.get(
        `/audio/show_according_to_genre/gnr?genre=${id}`
      );

      setItems(res.data.books);
    };

    bookSpec();
  }, [id]);

  useEffect(() => {
    const getSingle = async () => {
      const res = await axios.get(`/genre/show_single/${id}`);
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
    <>
      <h1 className="text-center"> {single.bookGenre} books... </h1>
      <div className="books-by-category">
        {currentAudios?.map((item, index) => {
          return <ListedBooks key={index} item={item} />;
        })}
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
    </>
  );
}

const ListedBooks = ({ item }) => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNew] = useState({});

  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get("/author/show_all");
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

    const baseUrl = "https://audiobooksapi.onrender.com";
    let audioPath = item.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
    let imagePath = item.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
  
    
    if (audioPath.startsWith("uploads/") || audioPath.startsWith("/uploads/")) {
      const audioUrl = audioPath.startsWith("/") ? `${baseUrl}${audioPath}` : `${baseUrl}/${audioPath}`;
      const imageUrl = imagePath.startsWith("/") ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;
  
    
      return (
        <>
          <Card className="book-card">
            <Card.Img variant="top" src={imageUrl} alt="Book Cover" />
            <Card.Body>
              <Card.Title>{newAuthor.AuthorName}</Card.Title>
              <Card.Link
                href={`/book_single/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                {item.bookTitle}
              </Card.Link>
              <Card.Text>{item.bookDescription}</Card.Text>
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Card.Body>
          </Card>
        </>
      );
    } else {
      let audioUrl = `${baseUrl}/${audioPath}`;
      let imageUrl = `${baseUrl}/${imagePath}`;
  
      
      return (
        <>
          <Card className="book-card">
            <Card.Img variant="top" src={imageUrl} alt="Book Cover" />
            <Card.Body>
              <Card.Title>{newAuthor.AuthorName}</Card.Title>
              <Card.Link
                href={`/book_single/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                {item.bookTitle}
              </Card.Link>
              <Card.Text>{item.bookDescription}</Card.Text>
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Card.Body>
          </Card>
        </>
      );
    }
  }

  return <>{ToDisplay()}</>;
};

export default BookAccordingToCat;
