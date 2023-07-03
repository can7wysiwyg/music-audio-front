import "./styles/contact.css";

function Contact() {
  return (
    <div className="container">
      <div className="contact-section">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form">
              <h2>Email Us</h2>
              <form action="mailto:hugostoltz12@protonmail.me">
                
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <br />
                <button type="submit" className="btn btn-primary" disabled>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="address-section">
            <h2>Our Address</h2>
            <p>Limbe, Blantyre, Malawi</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="social-icons">
            <a href="https://facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com">
              <i className="fab fa-instagram"></i>
              </a>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
