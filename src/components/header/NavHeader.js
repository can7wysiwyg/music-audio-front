import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import "./header.css"

function NavHeader() {
  const state = useContext(GlobalState);
    const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin; 

  const logoutUser = async () => {
    localStorage.removeItem('token')

     
    window.location.href = "/";

  

  };

function Webname() {
  if(isLogged !== true) {
    return(<>
    <nav>
    <Link className="navbar-brand" to="/">Your Logo</Link>
    </nav>
    
    </>)

  } else{

    return(<>
    <nav>
    <Link className="navbar-brand" to="/">Admin</Link>

    </nav>
    </>)

  }
  
}


  const loggedRouter = () => {
    return (
        <nav>
          
        
            <Link className="navbar-brand" to="/" onClick={logoutUser}>
            Logout
            </Link>
          
        </nav>
      );

  }

  

  const AdminRoute = () => {
    return(<>
    <nav>
    
    <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/admin_panel">Management</Link>
          </li>
          </ul>

    </nav>
    
    </>)
  }


  const AdminLogin = () => {
    if(isAdmin) {
      return AdminRoute()
  }   

  }




  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark">
      {Webname()}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {AdminLogin()}
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

      {
        isLogged ? (
          loggedRouter()
        ) : (
          ""
        )
      }
    </nav>
    
  

        </>
  );
}

export default NavHeader;