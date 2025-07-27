import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Result from "./components/Result";
import History from "./components/History";
import ContactUs from './components/ContactUs';
import AboutUs from "./components/AboutUs";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<History />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        
      </Routes>
    </Router>
  );
}

export default App;
