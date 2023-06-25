import img1 from "../images/img1.jpg"
import img2 from "../images/img2.jpg"
import "animate.css/animate.css"
import "./styles/home.css"
import { Link } from 'react-router-dom';



function Home() {
  return (
   < >
   <header className="header-image">
   <div className="header-text">
  <h1 className="animated fadeInDown spin-animation">Discover the World of Audio Books</h1>
</div>

      </header>

      <section className="container">
        <div className="row">
          <div className="col-md-6 animated fadeInLeft">
            <img src={img1} alt="Image1" className="img-fluid" />
          </div>
          <div className="col-md-6 animated fadeInRight">
            <h2>Why Should Authors Advertise With Us?</h2>
            <p>
              "Are you an author looking to reach a wider audience and boost your book sales? 
              Look no further! Advertising your books with us offers unparalleled benefits.
              Our platform is specifically designed to connect authors with eager readers 
              who are actively seeking new and captivating stories. With our targeted marketing strategies,
              we ensure that your books reach the right audience, increasing your chances of success.
              Our dedicated team of professionals will work closely with you to create compelling ad campaigns
              that showcase the unique essence of your books. Gain exposure, build your author brand,
              and watch your readership soar by advertising with us!"
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 animated fadeInLeft">
            <h2>Why Should You Read?</h2>
            <p>
              "Immerse yourself in the enchanting world of books and unlock a myriad of possibilities. 
              Reading is not just a hobby; 
              it's a transformative experience that broadens your horizons and enriches your life.
              With books, 
              you can travel to far-off lands,
              explore diverse cultures,
              and embark on thrilling adventures—all from the comfort of your favorite reading spot. 
              Books inspire, educate, and ignite the imagination,
              allowing you to escape the mundane and discover new perspectives."
            </p>
          </div>
          <div className="col-md-6 animated fadeInRight">
            <img src={img2} alt="Image2" className="img-fluid" />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12 text-center">
            <Link to="/books" className="btn btn-warning">Browse Books</Link>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Home;