import axios from "axios";
import "./styles/authors.css";
import { useState, useEffect } from "react";
import { Row, Col, Pagination, Form, Container } from "react-bootstrap";

function Authors() {
  const [results, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAuthors = async () => {
      const res = await axios.get("https://audiobooksapi.onrender.com/author/show_all");
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
            <div className=" justify-content-center ">
              <br />
              <br />
              <br />
             
        <div className="col-md-6">
          <Form style={{marginBottom: "3rem!important"}}>
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
  
  function authorsOnDisplay() {
    
      return (
        <>


<div className="container py-5">
  <div className="row">
    <div className="col-md-4">
      <div className="card box-shadow mx-auto my-5 feat" style={{ width: "18rem" }}>
        <div className="feat-image-container">
          <img src={result.AuthorImage} className="card-img-top" alt="..." />
        </div>
        <div className="card-body d-flex flex-column justify-content-between feat-body">
          <div>
            <h5 className="card-title feat-title"> 
              <a
                  href={`/view_single/${result._id}`}
                  style={{ color: "blue", textDecoration: "none" }}
                  
                >{result.AuthorName}</a>
                
                
                </h5>
            <hr />
            <p className="card-text">{result.AuthorEmail}</p>
            <hr />
            <p className="card-text"> {result.AuthorLocation}</p>
            <hr />


          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,90.7C672,64,768,64,864,85.3C960,107,1056,149,1152,186.7C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <a href={`/authors_books/${result._id}`}>
              <i className="fas fa-play ikon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
      );
   
  }

  return <>
  
  {authorsOnDisplay()}
  
  </>;
};

export default Authors;
