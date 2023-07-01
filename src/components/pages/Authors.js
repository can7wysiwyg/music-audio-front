import axios from "axios";
import "./styles/authors.css";
import { useState, useEffect } from "react";
import { Row, Col, Pagination, Form, Container } from "react-bootstrap";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";

function Authors() {
  const [results, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

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
  // const currentAuthors = results.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter authors based on search term
  const filteredAuthors = results.filter((author) =>
    author.AuthorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update current authors based on search results
  const currentAuthorsFiltered = filteredAuthors.slice(
    indexOfFirstAuthor,
    indexOfLastAuthor
  );

  return (
    <Container>
      <div className="container d-flex justify-content-center align-items-center ">
        <div className="col-md-6">
          <Form>
            <Form.Group className="d-flex justify-content-center">
              <Form.Control
                type="text"
                placeholder="Search Authors"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form.Group>
          </Form>
        </div>
      </div>

      <br />

      <Row>
        {currentAuthorsFiltered.map((result, index) => (
          <Col key={index} md={4}>
            <DisplayAuthors result={result} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination className="mt-4 justify-content-center">
        {Array.from({
          length: Math.ceil(filteredAuthors.length / authorsPerPage),
        }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}

const DisplayAuthors = ({ result }) => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const[isAdmin] = state.userApi.isAdmin

  function authorsOnDisplay() {
    let imagePath = result.AuthorImage.authorImageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    if (imagePath.startsWith("uploads/")) {
      let imageUrl = `http://localhost:5000/${imagePath}`;
      return (
        <>
          <div className="author-card">
            <figure>
              <img
                className="author-pic"
                src={imageUrl}
                alt={result.AuthorName}
              />
            </figure>
            <div>
              <a
                href={`/author_single/${result._id}`}
                className="card-title"
                style={{ textDecoration: "none" }}
              >
                {result.AuthorName}
              </a>
              <p className="card-text">Email: {result.AuthorEmail}</p>
              <p className="card-text">
                Phone Number: {result.AuthorPhoneNumber}
              </p>
              <p className="card-text">Location: {result.AuthorLocation}</p>
              {isLogged === true && isAdmin === true ? (
             <p className="card-text">   <a
                  href={`/view_single/${result._id}`}
                  style={{ color: "blue" }}
                  
                >
                  manage user
                </a> </p>
              ) : (
                ""
              )}
              <a
                href={`/authors_books/${result._id}`}
                className="btn btn-primary"
              >
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
              <img
                className="author-pic"
                src={imageUrl}
                alt={result.AuthorName}
              />
            </figure>
            <div>
              <a
                href={`/author_single/${result._id}`}
                className="card-title"
                style={{ textDecoration: "none" }}
                
              >
                {result.AuthorName}
              </a>
              <p className="card-text">Email: {result.AuthorEmail}</p>
              <p className="card-text">
                Phone Number: {result.AuthorPhoneNumber}
              </p>
              <p className="card-text">Location: {result.AuthorLocation}</p>
              {isLogged === true && isAdmin === true ? (
               <p className="card-text"> <a
                  href={`/view_single/${result._id}`}
                  style={{ color: "blue" }}
                  
                >
                  manage user
                </a> </p>
              ) : (
                ""
              )}
              <a
                href={`/authors_books/${result._id}`}
                className="btn btn-primary"
              >
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
