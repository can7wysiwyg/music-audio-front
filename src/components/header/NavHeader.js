function NavHeader() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark">
    <a className="navbar-brand" href="/">Your Logo</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/authors">Authors</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/books">Books</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/about">About Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/contact">Contact Us</a>
        </li>
      </ul>
    </div>
  </nav>
  

        </>
  );
}

export default NavHeader;