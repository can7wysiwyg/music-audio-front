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
import AuthorManagement from "./components/admin/AuthorManagement";
import BookManagement from "./components/admin/BookManagement";
import BookEdit from "./components/admin/BookEdit";
import AuthorEdit from "./components/admin/AuthorEdit";
import BookAccordingToCat from "./components/pages/BookAccordingToCat";
import Login from "./components/admin/Login";
import Testo from "./components/pages/Testo";
import AuthorCreate from "./components/admin/AuthorCreate";
import AuthorSelector from "./components/admin/AuthorSelector";




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
    <Route path="/book_single" element={<BookSingle />} />
    <Route path="/author_single" element={<AuthorSingle />} />
    <Route path="/author_management" element={<AuthorManagement />} />
    <Route path="/book_management" element={<BookManagement />} />
    <Route path="/book_edit" element={ <BookEdit /> } />
    <Route path="/author_edit" element={<AuthorEdit />} />
    <Route path="/book_cat" element={<BookAccordingToCat />} />
    <Route path="/smogazboard" element={<Login />} />
    <Route path="/testo"element={ <Testo /> } />
    <Route path="/create_author" element={ <AuthorCreate />} />
    <Route path="/author_selector" element={<AuthorSelector />} />
    


      </Routes>
      
 
      
    </div>
    <Footer />
    </Router>

    </ div>

  );
}

export default App;
