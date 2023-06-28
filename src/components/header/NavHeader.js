import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import "./header.css";
import axios from "axios";

function NavHeader() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;
  const [categories, setCategories] = useState([]);

useEffect(() => {

  const getGenres = async () => {
    const res = await axios.get('/genre/show_all');
    setCategories(res.data.results);
  };

  getGenres();



}, [])  

  const logoutUser = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  function Webname() {
    if (isLogged !== true) {
      return (
        <Link className="navbar-brand" to="/">
          Your Logo
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
    <>
      <Navbar bg="dark" expand="lg">
        {Webname()}
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          {AdminLogin()}
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/authors">Authors</Nav.Link>
            <Nav.Link href="/books">Books</Nav.Link>
            <NavDropdown title="Book Genres" id="basic-nav-dropdown"   >
              {
                categories?.map((category) => {
                  return  <NavDropdown.Item href={`/book_cat/${category._id}`}  key={category._id}>{category.bookGenre}</NavDropdown.Item>
                })
              } 
            </NavDropdown>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
          <Form inline className="search-form">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
          {isLogged ? loggedRouter() : ""}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavHeader;
