import "./adminpanel.css"

function AdminPanel() {
    return(<>
    <div className="container">
    <div className="row">
      <div className="col-md-4">
        <div className="menu-card card-primary">
          <a href="/create_author" className="card-title" style={{color: "black"}}>Create Author</a>
          <p className="card-text" style={{color: "black"}}>Create New Author</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="menu-card card-secondary">
          <a href="/author_selector"  className="card-title" style={{color: "black"}}>Upload Books</a>
          <p className="card-text" style={{color: "black"}}>Upload Author's books</p>
        </div>
      </div>
      {/*  */}
      <div className="col-md-4">
        <div className="menu-card card-danger">
          <a href="/categories"  className="card-title" style={{color: "black"}}>Categories</a>
          <p className="card-text" style={{color: "black"}}>Create and manage categories</p>
        </div>
      </div>
      {/*  */}
      <div className="col-md-4">
        <div className="menu-card card-success">
          <h5 className="card-title">Author Management</h5>
          <p className="card-text">Description for Menu Item 3</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="menu-card card-danger">
          <a href="/book_edit" className="card-title" style={{color: "black"}}>Book Management</a>
          <p className="card-text" style={{color: "black"}}>Manage Books</p>
        </div>

      


      </div>
    </div>
  </div>
  
    
    
    
    
    </>)
}

export default AdminPanel