import "./bookmanagement.css"
import { Card, Button } from 'react-bootstrap';

function BookManagement() {
    const books = [
        {
          id: 1,
          title: 'Book 1',
          author: 'John Doe',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: 'book1.jpg',
        },
        {
          id: 2,
          title: 'Book 2',
          author: 'Jane Smith',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          image: 'book2.jpg',
        },
        // Add more books as needed
      ];
    



    return(<>
    <div className="book-list">
      {books.map((book) => (
        <Card key={book.id} className="book-card">
          <Card.Img variant="top" src={book.image} alt={book.title} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
            <Card.Text>{book.description}</Card.Text>
            <div className="btn-group">
              <Button variant="primary">Details</Button>
              <Button variant="secondary">Add to Cart</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>

    
    
    </>)
}

export default BookManagement