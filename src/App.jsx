import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddCert from "./pages/addCertificate";
import Verify from "./pages/verifyCertificate";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verify" element={<Verify />} />
        <Route path="/add" element={<AddCert />} />
      </Routes>
    </Router>
  );
}

export default App;
