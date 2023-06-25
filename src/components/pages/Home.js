import img1 from "../images/img1.jpg"
import img2 from "../images/img2.jpg"

function Home() {
  return (
   < >
   
   <header className="header-image">
    <div className="header-text">
      <h1 className="animate__animated animate__fadeInDown" >Discover the World of Audio Books</h1>
      <p className="animate__animated animate__fadeInUp" >Explore captivating stories, immerse yourself in new adventures, and unlock knowledge with our extensive collection of audio books.</p>
    </div>
  </header>
<br />
  <section className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="animate__animated animate__fadeInLeft">
          <img src={img1} alt="Image1" className="img-fluid" />
        </div>
      </div>
      <div className="col-md-6">
        <div className="animate__animated animate__fadeInRight">
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
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="animate__animated animate__fadeInLeft">
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
      </div>
      <div className="col-md-6">
        <div className="animate__animated animate__fadeInRight">
          <img src={img2} alt="Image2" className="img-fluid" />
        </div>
      </div>
    </div>
  </section>
  <br />

      
    </>
  );
}

export default Home;