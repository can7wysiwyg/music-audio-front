import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import {
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";

import axios from "axios";

function NavHeader() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const getGenres = async () => {
      const res = await axios.get("https://audiobooksapi.onrender.com/genre/show_all");
      setCategories(res.data.results);
    };

    getGenres();
  }, []);

  const logoutUser = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  function Webname() {
    if (isLogged !== true) {
      return (
        <Link className="navbar-brand" to="/">
          Book Advertisers
        </Link>
      );
    } else {
      return (
        <Link className="navbar-brand" to="/">
          Admin
        </Link>
      );
    }
  }

  const loggedRouter = () => {
    return (
      <Nav>
        <Link className="nav-link" to="/" onClick={logoutUser}>
          Logout
        </Link>
      </Nav>
    );
  };

  const AdminRoute = () => {
    return (
      <Nav>
        <NavDropdown title="Management" id="basic-nav-dropdown">
          <NavDropdown.Item href="/admin_panel">Admin Panel</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  };

  const AdminLogin = () => {
    if (isAdmin) {
      return AdminRoute();
    }
  };

  return (

    <div className="container">
      <Navbar expand="lg" variant="warning" bg="warning" fixed="top">
        <div className="container">
          {Webname()}
          <Navbar.Toggle aria-controls="navbarResponsive" />
          <Navbar.Collapse id="navbarResponsive">
            {AdminLogin()}
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/authors">Authors</Nav.Link>
              <Nav.Link href="/books">Books</Nav.Link>
              <Nav.Link href="/search_books">Search Books</Nav.Link>
              <NavDropdown title="Book Genres" id="basic-nav-dropdown">
              {categories?.map((category) => {
                return (
                  <NavDropdown.Item
                    href={`/book_cat/${category._id}`}
                    key={category._id}
                  >
                    {category.bookGenre}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>

              
            </Nav>
            {isLogged ? loggedRouter() : ''}
          </Navbar.Collapse>
        </div>
      </Navbar>
     
    </div>
   




      
  );
}

export default NavHeader;
