import "./styles/contact.css"

function Contact() {
    return(<>
    <div class="container">
    <div class="contact-section">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="contact-form">
            <h2>Contact Us</h2>
            <form>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Your Name" />
              </div>
              <div class="form-group">
                <input type="email" class="form-control" placeholder="Your Email" />
              </div>
              <div class="form-group">
                <textarea class="form-control" rows="5" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="address-section">
          <h2>Our Address</h2>
          <p>123 Main Street, City, Country</p>
        </div>
      </div>
    </div>
  
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="social-icons">
          <a href="/"><i class="fab fa-facebook"></i></a>
          <a href="/"><i class="fab fa-twitter"></i></a>
          <a href="/"><i class="fab fa-instagram"></i></a>
          <a href="/"><i class="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  </div>

    
    
    </>)
}

export default Contact