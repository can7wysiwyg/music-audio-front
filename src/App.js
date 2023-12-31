import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer";
import NavHeader from "./components/header/NavHeader";
import Home from "./components/pages/Home";
import AdminPanel from "./components/admin/AdminPanel";
import Authors from "./components/pages/Authors";
import Books from "./components/pages/Books";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import BookSingle from "./components/pages/BookSingle";
import AuthorSingle from "./components/pages/AuthorSingle";
import BookEdit from "./components/admin/BookEdit";
import AuthorEdit from "./components/admin/AuthorEdit";
import BookAccordingToCat from "./components/pages/BookAccordingToCat";
import Login from "./components/admin/Login";
import AuthorCreate from "./components/admin/AuthorCreate";
import AuthorSelector from "./components/admin/AuthorSelector";
import BookUploadForm from "./components/admin/BookUploadForm";
import Categories from "./components/admin/Categories";
import AuthorsBooks from "./components/pages/AuthorsBooks";
import SearchComponent from "./components/pages/SearchComponent";
import UpdateList from "./components/admin/UpdateList";
import BookDateUpdate from "./components/admin/BookDateUpdate";
import BookDescriptionUpdate from "./components/admin/BookDescriptionUpdate";
import BookTitleUpdate from "./components/admin/BookTitleUpdate";
import EditUserInfo from "./components/admin/EditUserInfo";
import AuthorNameEdit from "./components/admin/AuthorNameEdit";
import AuthorEmailEdit from "./components/admin/AuthorEmailEdit";
import AuthorLocationEdit from "./components/admin/AuthorLocationEdit";
import AuthorPhoneEdit from "./components/admin/AuthorPhoneEdit";
import ViewSingle from "./components/admin/ViewSingle";
import BookDeleteAll from "./components/admin/BookDeleteAll";
import UpdateUserImage from "./components/admin/UpdateUserImage";
import BookUpdatePicture from "./components/admin/BookUpdatePicture";
import UpdateBookAudio from "./components/admin/UpdateBookAudio";
import BookLink from "./components/admin/BookLink";




function App() {
  return (
    < div  className="container">    
    <Router>
    <NavHeader />
    <div className="py-3">
      <Routes>
    <Route path="/" element={  <Home /> } />
    <Route path="/admin_panel" element={<AdminPanel />} />
    <Route path="/authors" element={<Authors /> } />
    <Route path="/books" element={ <Books /> } />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/book_single/:id" element={<BookSingle />} />
    <Route path="/author_single/:id" element={<AuthorSingle />} />
    <Route path="/edit_info/:id" element={<EditUserInfo />} />
    <Route path="/book_edit" element={ <BookEdit /> } />
    <Route path="/author_edit" element={<AuthorEdit />} />
    <Route path="/book_cat/:id" element={<BookAccordingToCat />} />
    <Route path="/smogazboard" element={<Login />} />
    <Route path="/create_author" element={ <AuthorCreate />} />
    <Route path="/author_selector" element={<AuthorSelector />} />
    <Route path="/book_upload_form/:id" element={ <BookUploadForm /> } />
    <Route path="/categories" element={ <Categories /> }  />
    <Route path="/authors_books/:id" element={ <AuthorsBooks /> } />
    <Route path="/search_books" element={<SearchComponent /> } />
    <Route path="/book_update_info/:id" element={<UpdateList /> } />
    <Route path="/book_release/:id" element={ <BookDateUpdate /> } />
    <Route path="/book_description/:id" element={<BookDescriptionUpdate />} />
    <Route path="/book_title/:id" element={<BookTitleUpdate />} />
    <Route path="/author_name/:id" element={<AuthorNameEdit /> } />
    <Route path="/author_email/:id" element={<AuthorEmailEdit />} />
    <Route path="/author_location/:id"  element={<AuthorLocationEdit />} />
    <Route path="/author_phone/:id" element={<AuthorPhoneEdit />} />
    <Route path="/view_single/:id" element={<ViewSingle />} />
    <Route path="/book_delete_all/:id" element={ <BookDeleteAll /> } />
    <Route path="/update_user_image/:id" element={<UpdateUserImage />} />
    <Route path="/book_update_picture/:id" element={<BookUpdatePicture />} />
    <Route path="/book_update_audio/:id" element={<UpdateBookAudio />} />
    <Route path="/book_update_sell_link/:id" element={<BookLink />} />
    


      </Routes>
      
 
      
    </div>
    <Footer />
    </Router>

    </ div>

  );
}

export default App;
