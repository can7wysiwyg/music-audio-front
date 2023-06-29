import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

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
      }
    } catch (error) {
      console.error(error);
    }
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

      {query && (
        <div>
          {results.length > 0 ? (
            results.map((audio) => (
              <Card key={audio._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{audio.bookTitle}</Card.Title>
                  <Card.Text>Author: {audio.authorName}</Card.Text>
                  <Button variant="primary" href={`/book_single/${audio._id}`}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
