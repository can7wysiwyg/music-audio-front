import "./styles/authors.css"


function Authors() {
    return(<>

<div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="author-card">
          <img class="author-pic" src="author1.jpg" alt="Author 1" />
          <h5 class="card-title">Author 1</h5>
          <p class="card-text">Description for Author 1</p>
          <a href="/" class="btn btn-primary">Read More</a>
        </div>
      </div>
      <div class="col-md-4">
        <div class="author-card">
          <img class="author-pic" src="author2.jpg" alt="Author 2" />
          <h5 class="card-title">Author 2</h5>
          <p class="card-text">Description for Author 2</p>
          <a href="/" class="btn btn-primary">Read More</a>
        </div>
      </div>
      <div class="col-md-4">
        <div class="author-card">
          <img class="author-pic" src="author3.jpg" alt="Author 3" />
          <h5 class="card-title">Author 3</h5>
          <p class="card-text">Description for Author 3</p>
          <a href="/" class="btn btn-primary">Read More</a>
        </div>
      </div>
    </div>
  </div>




    
    
    </>)
}

export default Authors