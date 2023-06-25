import { Link } from "react-router-dom";
import "./header.css"

function NavHeader() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark">
      <Link className="navbar-brand" to="/">Your Logo</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/authors">Authors</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">Books</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categories
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">Category 1</a>
              <a className="dropdown-item" href="/">Category 2</a>
              <a className="dropdown-item" href="/">Category 3</a>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact Us</Link>
          </li>
        </ul>
        <form className="form-inline search-form">
          <input type="text" placeholder="Search" />
        </form>
      </div>
    </nav>
    
  

        </>
  );
}

export default NavHeader;