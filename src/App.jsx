import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddCert from "./pages/addCertificate";
import Verify from "./pages/verifyCertificate";
import Home from "./pages/Home";
import Owner from "./pages/owner";
import Navbar from "./pages/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import Web3 from "web3";
const web3 = new Web3(window.ethereum);
const connectMetamask = async () => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    console.log("Metamask connected");
  } catch (error) {
    console.error(error);
  }
};

function App() {
  connectMetamask();

  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/add" element={<AddCert />} />
          <Route path="/owner" element={<Owner />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
