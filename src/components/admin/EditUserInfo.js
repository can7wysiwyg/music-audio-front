import { useParams } from "react-router-dom";


function EditUserInfo() {
    const{id} = useParams()

    return(<>

<div className="container">
      <h1>What would you like to update?</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <a href={`/author_name/${id}`}>Author Name</a>
        </li>
        <li className="list-group-item">
          <a href={`/author_email/${id}`}>Author Email</a>
        </li>
        <li className="list-group-item">
          <a href={`/author_location/${id}`}>Author Location</a>
        </li>
        <li className="list-group-item">
          <a href={`/author_phone/${id}`}>Author Phone Number</a>
        </li>
      </ul>
    </div>
    
    
    
    
    </>)
}

export default EditUserInfo