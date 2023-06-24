import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer";
import NavHeader from "./components/header/NavHeader";
import Home from "./components/pages/Home";


function App() {
  return (
    < div  className="container">    
    <Router>
    <NavHeader />
    <div className="py-3">
      <Routes>
    <Route path="/" element={  <Home /> } />


      </Routes>
      
 
      
    </div>
    <Footer />
    </Router>

    </ div>

  );
}

export default App;
