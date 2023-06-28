import axios from "axios";
import "./styles/authors.css";
import { useState, useEffect } from "react";

function Authors() {
  const [results, setAuthors] = useState([]);

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

  return (
    <div className="container">
      <div className="row">
        {results.map((result, index) => (
          <div key={index} className="col-md-4">
            <DisplayAuthors result={result} />
          </div>
        ))}
      </div>
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
