import React, { useEffect, useState } from "react";
import { certichainAddress } from "../../config";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import Web3 from "web3";

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
const web3 = new Web3(provider);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

const Home = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const result = await Certichain.methods
          .getCertificatesByStudent()
          .call();
        setCertificates(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (certificates.length === 0) {
    return <div>No certificates found!</div>;
  }

  return (
    <div>
      {certificates.map((certificate, index) => (
        <div key={index} className="certificate">
          <p>Name: {certificate.name}</p>
          <p>IPFS Hash: {certificate.ipfsHash}</p>
          <p>Organization: {certificate.organization}</p>
          <p>Title: {certificate.details}</p>
          <p>Issued By: {certificate.certifier}</p>
          <p>Issued To: {certificate.student}</p>
        </div>
      ))}
    </div>
  );
};
export default Home;
