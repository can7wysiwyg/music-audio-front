import { useEffect, useState } from "react";
import "./styles/bookcat.css"
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import axios from "axios";


function BookAccordingToCat() {
  const{id} = useParams()
  const[items, setItems] = useState([])

  useEffect(() => {

    const bookSpec = async() => {
           const res = await axios.get(`/audio/show_according_to_genre/gnr?genre=${id}`)

           setItems(res.data.books);

    }

    bookSpec()

  }, [id])
   
        return(<>
    <div className="books-by-category">

      {
        items?.map((item, index) => {
          return <ListedBooks key={index} item={item} />
        })
      }
      
    </div>
    
    </>)
}


const ListedBooks = ({item}) => {

  function ToDisplay() {

    let audioPath = item.audioBook.audioLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes
    let imagePath = item.audioImage.imageLink.replace(/\\/g, "/"); // Convert backslashes to forward slashes

    if (audioPath.startsWith("uploads/")) {
      let audioUrl = `http://localhost:5000/${audioPath}`;
      let imageUrl = `http://localhost:5000/${imagePath}`;


      return(<>

<Card  className="book-card">
          <Card.Img variant="top" src={imageUrl} alt="Book Cover" />
          <Card.Body>
            <Card.Title>{item.bookTitle}</Card.Title>
            <Card.Text>{item.bookDescription}</Card.Text>
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Card.Body>
        </Card>
      
      
      
      
      </>)




    } else{

      let audioUrl = `http://localhost:5000${audioPath}`;
      let imageUrl = `http://localhost:5000${imagePath}`;

      return(<>

        <Card  className="book-card">
                  <Card.Img variant="top" src={imageUrl} alt="Book Cover" />
                  <Card.Body>
                    <Card.Title>{item.bookTitle}</Card.Title>
                    <Card.Text>{item.bookDescription}</Card.Text>
                    <audio controls>
                      <source src={audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </Card.Body>
                </Card>
              
              
              
              
              </>)
        
        
  



    }



  }


  return(<>

  {
    ToDisplay()
  }

  
  
  
  </>)
}

export default BookAccordingToCat