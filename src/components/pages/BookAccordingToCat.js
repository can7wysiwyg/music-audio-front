import "./styles/bookcat.css"
import { Card } from 'react-bootstrap';


function BookAccordingToCat() {
    const books = [
        {
          id: 1,
          title: 'Book 1',
          category: 'Fiction',
          image: 'book1.jpg',
          audio: 'book1-audio.mp3',
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 2,
          title: 'Book 2',
          category: 'Non-fiction',
          image: 'book2.jpg',
          audio: 'book2-audio.mp3',
          info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 3,
            title: 'Book 2',
            category: 'Non-fiction',
            image: 'book2.jpg',
            audio: 'book2-audio.mp3',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            id: 4,
            title: 'Book 2',
            category: 'Non-fiction',
            image: 'book2.jpg',
            audio: 'book2-audio.mp3',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
    
      ];
    
    return(<>
    <div className="books-by-category">
      {books.map((book) => (
        <Card key={book.id} className="book-card">
          <Card.Img variant="top" src={book.image} alt="Book Cover" />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.info}</Card.Text>
            <audio controls>
              <source src={book.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Card.Body>
        </Card>
      ))}
    </div>
    
    </>)
}

export default BookAccordingToCat