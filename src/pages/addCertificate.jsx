// import React from "react";
// import { certichainAddress } from "../../config";
// import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
// import Web3 from "web3";
// const web3 = new Web3(window.ethereum);
// const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);
// import { v4 as uuidv4 } from "uuid";

// const addCertificate = () => {
//   return <div>addCertificate</div>;
// };

// export default addCertificate;

// function generateRandomString() {
//   const uuid = uuidv4();
//   const segments = uuid.split("-").slice(0, 4);
//   const result = segments.map((segment) => segment.substr(0, 3)).join("-");

//   return result;
// }

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import { certichainAddress } from "../../config";

const provider = window.ethereum;
const web3 = new Web3(provider);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

function CertifyFile() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [details, setDetails] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  async function certifyFile() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const senderAddress = accounts[0];
      const transaction = await Certichain.methods
        .certifyFile(name, organization, details, studentAddress, ipfsHash)
        .send({
          from: senderAddress,
          value: web3.utils.toWei("0.01", "ether"),
          gas: 2000000,
        });
      console.log("transaction: ", transaction);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    certifyFile();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="organization">Organization: </label>
        <input
          type="text"
          id="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="details">Details: </label>
        <input
          type="text"
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="studentAddress">Student Address: </label>
        <input
          type="text"
          id="studentAddress"
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ipfsHash">IPFS Hash: </label>
        <input
          type="text"
          id="ipfsHash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
        />
      </div>
      <button type="submit">Certify File</button>
    </form>
  );
}

export default CertifyFile;
