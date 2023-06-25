import "./styles/books.css"

function Books() {
    return(<>
    <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="book-card">
          <img class="book-image" src="book1.jpg" alt="Book 1" />
          <h5 class="card-title">Book 1</h5>
          <p class="card-text">Description for Book 1</p>
          <audio controls>
            <source src="audio1.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <div class="col-md-4">
        <div class="book-card">
          <img class="book-image" src="book2.jpg" alt="Book 2" />
          <h5 class="card-title">Book 2</h5>
          <p class="card-text">Description for Book 2</p>
          <audio controls>
            <source src="audio2.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <div class="col-md-4">
        <div class="book-card">
          <img class="book-image" src="book3.jpg" alt="Book 3" />
          <h5 class="card-title">Book 3</h5>
          <p class="card-text">Description for Book 3</p>
          <audio controls>
            <source src="audio3.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  </div>



    
    
    </>)
}

export default Books