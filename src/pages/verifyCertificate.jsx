import React from "react";
import { useState } from "react";

import { certichainAddress } from "../../config";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import Web3 from "web3";

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
const web3 = new Web3(provider);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

async function getCertificate(ipfsHash, address) {
  try {
    const certificate = await Certichain.methods
      .getCertificateByHash(ipfsHash, address)
      .call();
    console.log(certificate);
  } catch (error) {
    console.error(error);
  }
}

function verifyCertificate() {
  const [ipfsHash, setIpfsHash] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    getCertificate(ipfsHash, address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ipfsHash">IPFS Hash:</label>
        <input
          type="text"
          id="ipfsHash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button type="submit">Get Certificate</button>
    </form>
  );
}

export default verifyCertificate;
