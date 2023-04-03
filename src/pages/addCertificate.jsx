import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import { certichainAddress } from "../../config";

const provider = window.ethereum;
const web3 = new Web3(provider);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

function generateRandomString() {
  const uuid = uuidv4();
  const segments = uuid.split("-").slice(0, 4);
  const result = segments.map((segment) => segment.substr(0, 3)).join("-");

  return result;
}

function CertifyFile() {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [details, setDetails] = useState("");
  const [studentAddress, setStudentAddress] = useState("");

  async function certifyFile() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const senderAddress = accounts[0];
      const transaction = await Certichain.methods
        .certifyFile(
          name,
          organization,
          details,
          studentAddress,
          generateRandomString()
        )
        .send({
          from: senderAddress,
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
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ margin: "5px" }}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ margin: "5px" }}>
        <label htmlFor="organization">Organization: </label>
        <input
          type="text"
          id="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
      </div>
      <div style={{ margin: "5px" }}>
        <label htmlFor="details">Details: </label>
        <input
          type="text"
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div style={{ margin: "5px" }}>
        <label htmlFor="studentAddress">Student Address: </label>
        <input
          type="text"
          id="studentAddress"
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
        />
      </div>
      <button type="submit">Certify File</button>
    </form>
  );
}

export default CertifyFile;
