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
      const res = await axios.get('/genre/show_all');
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

    await axios.post('/genre/create_genre', { bookGenre }, {
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
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              {cat.bookGenre}
              <button className="btn btn-danger">Delete</button>
            </li>
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

export default Categories;
