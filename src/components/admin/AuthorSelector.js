import axios from "axios";
import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./authorselector.css";

function AuthorSelector() {
  const [results, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);

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
        <h1 className="text-center">😏😏😎😎😁😁 Loading...</h1>
      </>
    );
  }

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = results.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Select Author You Would Like To Upload A Book For</h1>
      <div className="row">
        <ul className="list-group">
          {currentCards.map((result, index) => (
            <AuthorsList key={index} result={result} />
          ))}
        </ul>
      </div>
      <Pagination className="mt-4">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {Array.from({ length: Math.ceil(results.length / cardsPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={indexOfLastCard >= results.length}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}




const AuthorsList = ({result}) => {

    const buttonRedirect = () => {
        window.location.href = `/book_upload_form/${result._id}`
    }

     function listAuthorsDisplay() {
        let imagePath = result.AuthorImage.authorImageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    if (imagePath.startsWith("uploads/")) {
      let imageUrl = `http://localhost:5000/${imagePath}`;
      return (
        <>
        <li className="list-group-item d-flex align-items-center p-3">
  <div className="avatar-container me-3">
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{result.AuthorName}</Tooltip>}
    >
      <div className="avatar-wrapper">
        <img
          className="avatar"
          src={imageUrl}
          alt={result.AuthorName}
        />
      </div>
    </OverlayTrigger>
  </div>
  <div className="content">
    <h5 className="mb-1">{result.AuthorName}</h5>
    <p className="mb-1">{result.AuthorEmail}</p>
    <p className="mb-1">{result.AuthorPhoneNumber}</p>
    <p className="mb-1">{result.AuthorLocation}</p>
  </div>
  <div className="ms-auto">
    
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip>Upload Book</Tooltip>}
    >
      <button className="btn btn-link" onClick={buttonRedirect}>
        <FaUpload />
      </button>
    </OverlayTrigger>
    
  </div>
</li>

       
        
        
        
        
        </>



      )} else {
        let imageUrl = `http://localhost:5000${imagePath}`;

        return (
            <>
            <li className="list-group-item d-flex align-items-center p-3">
  <div className="avatar-container me-3">
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{result.AuthorName}</Tooltip>}
    >
      <div className="avatar-wrapper">
        <img
          className="avatar"
          src={imageUrl}
          alt={result.AuthorName}
        />
      </div>
    </OverlayTrigger>
  </div>
  <div className="content">
    <h5 className="mb-1">{result.AuthorName}</h5>
    <p className="mb-1">{result.AuthorEmail}</p>
    <p className="mb-1">{result.AuthorPhoneNumber}</p>
    <p className="mb-1">{result.AuthorLocation}</p>
  </div>
  <div className="ms-auto">
    
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip>Upload Book</Tooltip>}
    >
      <button className="btn btn-link" onClick={buttonRedirect}>
        <FaUpload />
      </button>
    </OverlayTrigger>
    
  </div>
</li>
            
            
            
            
            </>
    
    
    
          )


      }

     }

    return(<>

    {
        listAuthorsDisplay()
    }
         
    
    </>)
}

export default AuthorSelector;
