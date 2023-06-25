import "./authormanagement.css"
import { Card, Button } from 'react-bootstrap';


function AuthorManagement() {

    const authors = [
        {
          id: 1,
          name: 'John Doe',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          books: ['Book 1', 'Book 2', 'Book 3'],
          image: 'john-doe.jpg',
        },
        {
          id: 2,
          name: 'Jane Smith',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          books: ['Book 4', 'Book 5', 'Book 6'],
          image: 'jane-smith.jpg',
        },
        // Add more authors as needed
      ];
    
    
    return(<>
    <div className="author-list">
      {authors.map((author) => (
        <Card key={author.id} className="author-card">
          <Card.Img variant="top" src={author.image} alt={author.name} />
          <Card.Body>
            <Card.Title>{author.name}</Card.Title>
            <Card.Text>{author.bio}</Card.Text>
            <div className="btn-group">
              <Button variant="primary">View Books</Button>
              <Button variant="secondary">Edit</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
    
    
    </>)
}

export default AuthorManagement