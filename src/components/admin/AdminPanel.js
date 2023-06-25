import "./adminpanel.css"

function AdminPanel() {
    return(<>
    <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="menu-card card-primary">
          <h5 class="card-title">Create Author</h5>
          <p class="card-text">Description for Menu Item 1</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="menu-card card-secondary">
          <h5 class="card-title">Upload Books</h5>
          <p class="card-text">Description for Menu Item 2</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="menu-card card-success">
          <h5 class="card-title">Author Management</h5>
          <p class="card-text">Description for Menu Item 3</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="menu-card card-danger">
          <h5 class="card-title">Book Management</h5>
          <p class="card-text">Description for Menu Item 4</p>
        </div>
      </div>
    </div>
  </div>
  
    
    
    
    
    </>)
}

export default AdminPanel