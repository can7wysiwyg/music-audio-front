
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Pagination } from "react-bootstrap";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);

    setTypingTimeout(timeout);
  };

  const performSearch = async (value) => {
    try {
      if (value.trim() === "") {
        setResults([]);
      } else {
        setIsLoading(true);
        setError(null);

        const response = await axios.get("/audio/show_all");
        const audioData = response.data.books;

        const filteredResults = audioData.filter((audio) => {
          const { bookTitle, authorName } = audio;

          return (
            bookTitle.toLowerCase().includes(value.toLowerCase()) ||
            authorName.toLowerCase().includes(value.toLowerCase())
          );
        });

        setResults(filteredResults);
        setCurrentPage(1);
      }
    } catch (error) {
      setError("An error occurred while fetching search results.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  return (
    <div className="container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="form-control mb-3"
        placeholder="Search for audio books..."
      />

      {error && <p className="text-danger">{error}</p>}

      {query && (
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : currentResults.length > 0 ? (
            currentResults.map((audio) => (
              <DisplayBooks key={audio._id} audio={audio} />
            ))
          ) : (
            <p>No books found.</p>
          )}

          <Pagination className="mt-3">
            {Array.from(Array(Math.ceil(results.length / resultsPerPage)), (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </div>
  );
}





const DisplayBooks = ({audio}) => {

    const[results, setAuthors] = useState([])
    const[newAuthors, setNew] = useState({})

    useEffect(() => {

        const getUsers = async() => {
          
            const res = await axios.get("/author/show_all")

            setAuthors(res.data.authors)

        }

        getUsers()


    }, [])

    useEffect(() => {

        if(audio.authorName) {

            results.forEach((result) => {
                if(result._id === audio.authorName) setNew(result)
            })
        }


    }, [audio.authorName, results])

    return(<>

<Card   className="mb-3">
                <Card.Body>
                  <Card.Title>{audio.bookTitle}</Card.Title>
                  <Card.Text>Author: {newAuthors.AuthorName}</Card.Text>
                  <Button variant="primary" href={`/book_single/${audio._id}`}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>

    
    
    
    
    </>)
}



export default SearchComponent;
