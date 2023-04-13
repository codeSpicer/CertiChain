// import React, { useState, useEffect } from "react";
// import Web3 from "web3";
// import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
// import { certichainAddress } from "../../config";

// const provider = window.ethereum;
// const web3 = new Web3(provider);
// const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

// function owner(params) {}

// export default owner;

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import { certichainAddress } from "../../config";

const provider = window.ethereum;
const web3 = new Web3(provider);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

function Owner() {
  const [certifier, setCertifier] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCertifier = async (event) => {
    event.preventDefault();
    try {
      await Certichain.methods
        .addAuthorizedCertifier(certifier)
        .send({ from: window.ethereum.selectedAddress });
      setMessage(`Added ${certifier} as an authorized certifier.`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to add authorized certifier.");
    }
  };

  const handleRemoveCertifier = async (event) => {
    event.preventDefault();
    try {
      await Certichain.methods
        .removeAuthorizedCertifier(certifier)
        .send({ from: window.ethereum.selectedAddress });
      setMessage(`Removed ${certifier} as an authorized certifier.`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to remove authorized certifier.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Add or Remove Authorized Certifier</h2>
      <form onSubmit={handleAddCertifier}>
        <label>
          Address of Certifier:
          <input
            type="text"
            value={certifier}
            onChange={(e) => setCertifier(e.target.value)}
          />
        </label>
        <button style={{ margin: "5px" }} type="submit">
          Add Authorized Certifier
        </button>
      </form>
      <form onSubmit={handleRemoveCertifier}>
        <label>
          Address of Certifier:
          <input
            type="text"
            value={certifier}
            onChange={(e) => setCertifier(e.target.value)}
          />
        </label>
        <button style={{ margin: "5px" }} type="submit">
          Remove Authorized Certifier
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Owner;
