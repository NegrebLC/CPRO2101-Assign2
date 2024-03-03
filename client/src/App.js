import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AddEditContactPage from "./pages/AddEditContactPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact/:id" element={<ContactPage />} />
          <Route path="/add" element={<AddEditContactPage />} />
          <Route path="/edit/:id" element={<AddEditContactPage />} />
          <Route path="/details/:id" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
