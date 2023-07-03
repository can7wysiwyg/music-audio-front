import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';

const Categories = () => {
  const state = useContext(GlobalState);
  const token = state.token;
  const [bookGenre, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;

  useEffect(() => {
    const getGenres = async () => {
      const res = await axios.get('https://audiobooksapi.onrender.com/genre/show_all');
      setCategories(res.data.results);
    };

    getGenres();
  }, []);


  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (bookGenre.trim() !== '') {
      setCategories([...categories, bookGenre]);
      setCategoryName('');
    }

    await axios.post('https://audiobooksapi.onrender.com/genre/create_genre', { bookGenre }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCurrentPage(1);

    window.location.href = "/categories"
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  return (
    <div className="container">
      <h1>Category Management</h1>

      {/* Form */}
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                name="bookGenre"
                value={bookGenre}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Category</button>
          </form>
        </div>
      </div>

      {/* Category List */}
      <div className="mt-4">
        <ul className="list-group">
          {currentCategories.map((cat, index) => (

            <ListedCats key={index}  cat={cat} />
            
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(categories.length / categoriesPerPage) }).map((_, index) => (
            <li
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              key={index + 1}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const ListedCats = ({cat}) => {
  const state = useContext(GlobalState);
  const token = state.token;
  const[audios, setAudios] = useState([])
  const[toDelete, setToDelete] = useState({})

  useEffect(() => {

    const getProds = async() => {
const res = await axios.get("https://audiobooksapi.onrender.com/audio/show_all")

setAudios(res.data.books)
 

    }

    getProds()


  }, [])


  useEffect(() => {

if(cat._id) {

  audios.forEach((audio) => {
 if(audio.audioGenre === cat._id) setToDelete(audio)

  })

}



  }, [cat._id, audios])

const deleteCat = async() => {

  const res = await axios.delete(`https://audiobooksapi.onrender.com/genre/delete_genre/${cat._id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  alert(res.data.msg)

  window.location.href = "/categories"


}

  return(<>

<li className="list-group-item d-flex justify-content-between align-items-center" >
              {cat.bookGenre}
        {toDelete.audioGenre === cat._id ?   "" :   <button className="btn btn-danger" onClick={deleteCat}>Delete</button> }
            </li>
  
  
  
  </>)

}

export default Categories;
