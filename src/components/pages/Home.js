import React from 'react';
import "./styles/home.css"
import Hero2  from "../images/hh.png"
import localImage  from "../images/hello.avif"


function App() {
  return (
    <>
    <div className="d-sm-flex align-items-center justify-content-between w-100" style={{ height: '100vh' }}>
      <div className="col-md-4 mx-auto mb-4 mb-sm-0 headline" style={{margin: "3rem"}}>
    
        <h1 className="display-4 my-4 font-weight-bold" style={{margin: "2rem"}}>
          Welcome To <span style={{ color: '#9B5DE5' }}>Book Voices</span>
        </h1>
          

        <a href="/books" className="btn px-5 py-3 text-white mt-3 mt-sm-0" style={{ borderRadius: '30px', backgroundColor: '#9B5DE5' }}>
          Get Started
        </a>
      </div>
      <div
      className="col-md-8 h-100 clipped"
      style={{
        minHeight: '350px',
        backgroundImage: `url(${localImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    ></div>
      
    </div>
    <a href="https://componentity.com"  className="block">
      <img
        src={Hero2}
        width="120px"
        className="d-block mx-auto my-5"
        alt="Componentity Logo"
      />
    </a>
    </>
  );
}

export default App;
