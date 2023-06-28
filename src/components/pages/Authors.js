import axios from "axios";
import "./styles/authors.css";
import { useState, useEffect } from "react";

function Authors() {
  const [results, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(6);

  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get("/author/show_all");
      setAuthors(res.data.authors);
    };

    getAuthors();
  }, []);

  if (results.length === 0) {
    return (
      <>
        <h1 className="text-center">😏😏😎😎😁😁 loading... </h1>
      </>
    );
  }

  // Pagination logic
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = results.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="row">
        {currentAuthors.map((result, index) => (
          <div key={index} className="col-md-4">
            <DisplayAuthors result={result} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(results.length / authorsPerPage) }).map((_, index) => (
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



const DisplayAuthors = ({ result }) => {
  function authorsOnDisplay() {
    let imagePath = result.AuthorImage.authorImageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    if (imagePath.startsWith("uploads/")) {
      let imageUrl = `http://localhost:5000/${imagePath}`;
      return (
        <>
        <div className="author-card">
  <figure>
    <img className="author-pic" src={imageUrl} alt={result.AuthorName} />
  </figure>
  <div>
  <a href={`/author_single/${result._id}`} className="card-title" style={{textDecoration: "none"}}>{result.AuthorName}</a>
    <p className="card-text">Email: {result.AuthorEmail}</p>
    <p className="card-text">Phone Number: {result.AuthorPhoneNumber}</p>
    <p className="card-text">Location: {result.AuthorLocation}</p>
    <a href={`/authors_books/${result._id}`} className="btn btn-primary">
      View Author's Books
    </a>
  </div>
</div>
<br />

          
        </>
      );
    } else {
      let imageUrl = `http://localhost:5000${imagePath}`;

      return (
        <>
        <div className="author-card">
  <figure>
    <img className="author-pic" src={imageUrl} alt={result.AuthorName} />
  </figure>
  <div>
    <a href={`/author_single/${result._id}`} className="card-title" style={{textDecoration: "none"}}>{result.AuthorName}</a>
    <p className="card-text">Email: {result.AuthorEmail}</p>
    <p className="card-text">Phone Number: {result.AuthorPhoneNumber}</p>
    <p className="card-text">Location: {result.AuthorLocation}</p>
    <a href={`/authors_books/${result._id}`} className="btn btn-primary">
      View Author's Books
    </a>
  </div>
</div>
<br />

         
        </>
      );
    }
  }

  return <>{authorsOnDisplay()}</>;
};

export default Authors;
