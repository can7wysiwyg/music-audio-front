function Footer() {
    return(<>

<footer className="bg-dark text-white text-center py-12">
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <h5>About Us</h5>
        <p>We believe in the power of words to captivate, inspire, 
            and transform lives. 
            We are dedicated to connecting readers with the stories
             that ignite their imagination and leave a lasting impact. </p>
      </div>
      <div className="col-md-4">
        <h5>Contact</h5>
        <p>Email: info@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
      <div className="col-md-4">
        <h5>Follow Us</h5>
        <div className="social-icons">
        <a href="/" className="mr-3 text-secondary"><i className="fab fa-facebook-f"></i></a>
          <a href="/" className="mr-3 text-info"><i className="fab fa-twitter"></i></a>
          <a href="/" className="text-danger"><i className="fab fa-instagram"></i></a>

          
        </div>
      </div>
    </div>
  </div>
</footer>


    
    
    </>)
}

export default Footer