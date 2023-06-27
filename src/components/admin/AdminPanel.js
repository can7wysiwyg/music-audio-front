import "./adminpanel.css"

function AdminPanel() {
    return(<>
    <div className="container">
    <div className="row">
      <div className="col-md-4">
        <div className="menu-card card-primary">
          <a href="/create_author" className="card-title" style={{color: "white"}}>Create Author</a>
          <p className="card-text" style={{color: "white"}}>Create New Author</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="menu-card card-secondary">
          <h5 className="card-title">Upload Books</h5>
          <p className="card-text">Description for Menu Item 2</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="menu-card card-success">
          <h5 className="card-title">Author Management</h5>
          <p className="card-text">Description for Menu Item 3</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="menu-card card-danger">
          <h5 className="card-title">Book Management</h5>
          <p className="card-text">Description for Menu Item 4</p>
        </div>
      </div>
    </div>
  </div>
  
    
    
    
    
    </>)
}

export default AdminPanel