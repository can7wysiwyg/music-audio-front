import React, { useState, useEffect } from "react";
import "./styles/home.css";
import Hero2 from "../images/hh.png";
import localImage from "../images/hello.avif";
import axios from "axios";







function Home() {

  const [trendingVoices, setTrendingVoices] = useState([]);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const res = await axios.get("https://audiobooksapi.onrender.com/author/show_all");
        const authors = res.data.authors || []; // Set default value as an empty array
        const lastThreeAuthors = authors.slice(-3); // Get the last 3 authors
        setTrendingVoices(lastThreeAuthors);
      } catch (error) {
        console.log(error);
      }
    };

    getAuthors();
  }, []);


  


    const [hoveredCard, setHoveredCard] = useState(null);
  
    const handleCardHover = (index) => {
      setHoveredCard(index);
    };
  
    const handleCardLeave = () => {
      setHoveredCard(null);
    };
  
    const isCardHovered = (index) => {
      return hoveredCard === index;
    };

  
  
  return (
    <>
      <div
        className="d-sm-flex align-items-center justify-content-between w-100"
        style={{ height: "100vh" }}
      >
        <div
          className="col-md-4 mx-auto mb-4 mb-sm-0 headline"
          style={{ margin: "3rem" }}
        >
          <h1
            className="display-4 my-4 font-weight-bold"
            style={{ margin: "2rem" }}
          >
            Welcome To <span style={{ color: "#9B5DE5" }}>Book Voices</span>
          </h1>

          <a
            href="/books"
            className="btn px-5 py-3 text-white mt-3 mt-sm-0"
            style={{ borderRadius: "30px", backgroundColor: "#9B5DE5" }}
          >
            Get Started
          </a>
        </div>
        <div
          className="col-md-8 h-100 clipped"
          style={{
            minHeight: "350px",
            backgroundImage: `url(${localImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <a href="https://componentity.com" className="block">
        <img
          src={Hero2}
          width="120px"
          className="d-block mx-auto my-5"
          alt="Componentity Logo"
        />
      </a>

      {/* trending section */}

      <section className="trending-section">
  <div className="container">
    <h2 className="section-title text-center" style={{ fontStyle: "oblique" }}>
      Trending Voices
    </h2>

    <div className="container py-5">
      <div className="row justify-content-center">
        {trendingVoices.map(voice => (
          <div className="col-12 col-lg-4" key={voice._id}>
            <div className="card box-shadow mx-auto my-5 feat" style={{ width: "18rem" }}>
            <div className="feat-image-container">
              <img src={voice.AuthorImage} className="card-img-top" alt="..." />
              </div>
              <div className="card-body d-flex flex-column justify-content-between feat-body" style={{ height: "100%" }}>
                <div>
                  <h5 className="card-title feat-title">

                  <a
                  href={`/view_single/${voice._id}`}
                  style={{ color: "blue", textDecoration: "none" }}
                  
                >{voice.AuthorName}</a>
             

                  </h5>
                  <hr />
                  <p className="card-text">{voice.AuthorEmail}</p>
                  <hr />
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,90.7C672,64,768,64,864,85.3C960,107,1056,149,1152,186.7C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  </svg>
                  <a href={`/authors_books/${voice._id}`}>
                    <i className="fas fa-play ikon"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

     
      
          {/*end trending voices  */}
        
      <div className="services" style={{ marginTop: "1rem", background: "linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%)" }}>
      <h1 className="text-center" style={{ fontFamily: "fantasy", fontStyle: "revert" }}>
        <span>Our</span> <span style={{ color: "red" }}>Serv</span>
        <span style={{ color: "green" }}>ices</span>{" "}
      </h1>
      <div className="container" style={{ fontFamily: "Times New Roman"}}>
        <div className="row" >
          <div
            className="col-md-4"
            onMouseEnter={() => handleCardHover(0)}
            onMouseLeave={handleCardLeave}
            style={{  marginBottom: "2rem"}}
          >
            <div
              className={`card ${isCardHovered(0) ? 'hovered' : ''}`}
              style={{ width: "18rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="card-body">
                <h5 className="card-title text-center">
                  <i className="fas fa-headphones fa-3x"></i>
                </h5>
                <h3 className="card-title mb-2 text-muted">Book Adertising</h3>
                <p className="card-text">
                  We use audio excerpts to advertise your books. Get in touch with us!! And we will give you a bestseller..
                </p>
              </div>
            </div>
          </div>

          <div
            className="col-md-4"
            onMouseEnter={() => handleCardHover(1)}
            onMouseLeave={handleCardLeave}
            style={{  marginBottom: "2rem"}}
          >
            <div
              className={`card ${isCardHovered(1) ? 'hovered' : ''}`}
              style={{ width: "18rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="card-body">
                <h5 className="card-title text-center">
                  <i className="fas fa-dollar-sign fa-3x"></i>
                </h5>
                <h3 className="card-title mb-2 text-muted">Book Selling</h3>
                <p className="card-text">
                  We have a full-fledged e-commerce site for selling books. We sell your books for free!!
                </p>
              </div>
            </div>
          </div>

          <div
            className="col-md-4"
            onMouseEnter={() => handleCardHover(2)}
            onMouseLeave={handleCardLeave}
            style={{  marginBottom: "2rem"}}
          >
            <div
              className={`card ${isCardHovered(2) ? 'hovered' : ''}`}
              style={{ width: "18rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="card-body">
                <h5 className="card-title text-center">
                  <i className="fas fa-book fa-3x"></i>
                </h5>
                <h3 className="card-title mb-2 text-muted">Book Library</h3>
                <p className="card-text">
                  Are you looking to borrow books? Well, we got you covered.. We also have an online library.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* contact us section */}


    <section id="contact">
      <div className="container">
        <h3 className="text-center text-uppercase">contact us</h3>
        <p className="text-center w-75 m-auto">
         Get in touch with us for more in-person information...
        </p>
        <div className="row">
          <div className="col-md-4">
            <div className="card border-0 xyz">
              <div className="card-body text-center">
                <i className="fa fa-phone fa-5x mb-3 ion" aria-hidden="true"></i>
                <h4 className="text-uppercase mb-5">call us</h4>
                <p>+2659968xxx,+2658823xxxx</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 xyz">
              <div className="card-body text-center">
                <i className="fa fa-map-marker fa-5x mb-3 ion" aria-hidden="true"></i>
                <h4 className="text-uppercase mb-5">office location</h4>
                <address>Limbe, Blantyre 4, Malawi</address>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 ">
            <div className="card border-0 xyz">
              <div className="card-body text-center">
                <i className="fa fa-globe fa-5x mb-3 ion" aria-hidden="true"></i>
                <h4 className="text-uppercase mb-5">email</h4>
                <p>hugostoltz12@proton.me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>






    {/* end contact us section... */}

      
      

          </>
  );
} 

export default Home;
