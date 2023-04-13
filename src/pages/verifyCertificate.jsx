import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import { certichainAddress } from "../../config";
import Web3 from "web3";
// import fs from "fs";

const web3 = new Web3(window.ethereum);
const Certichain = new web3.eth.Contract(certichain.abi, certichainAddress);

function VerifyCertificate() {
  const [ipfsHash, setIpfsHash] = useState("");
  const [address, setAddress] = useState("");
  const [formState, setFormState] = useState({
    stuname: "",
    organization: "",
    details: "",
    certifier: "",
    student: "",
    hash: "",
  });

  useEffect(() => {
    console.log("formstate is:", formState);
  }, [formState]);
  async function getCertificate(ipfsHash, address) {
    try {
      const certificate = await Certichain.methods
        .getCertificateByHash(ipfsHash, address)
        .call();
      console.log("certificate object is :", certificate);
      setFormState({
        ...formState,
        stuname: certificate.name,
        organization: certificate.organization,
        details: certificate.details,
        certifier: certificate.certifier,
        student: certificate.student,
        hash: certificate.ipfsHash,
      });

      console.log(" formstate is =" + formState);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getCertificate(ipfsHash, address);
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
        <label htmlFor="ipfsHash">IPFS Hash: </label>
        <input
          type="text"
          id="ipfsHash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
        />
      </div>
      <div style={{ margin: "5px" }}>
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button style={{ margin: "5px" }} type="submit">
        Get Certificate
      </button>
      <PdfCreator {...formState} />
    </form>
  );
}

function PdfCreator({
  stuname,
  organization,
  details,
  certifier,
  student,
  hash,
}) {
  const [pdfData, setPdfData] = useState(null);

  async function createPdf() {
    console.log(stuname, organization, details, certifier, student, hash);
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage();

    page.drawText(stuname, { x: 100, y: 500 });
    page.drawText(organization, { x: 100, y: 400 });
    page.drawText(details, { x: 245, y: 650 });
    page.drawText(certifier, { x: 20, y: 230 });
    page.drawText(student, { x: 20, y: 330 });
    page.drawText(hash, { x: 420, y: 10 });

    const pdfBytes = await pdfDoc.save();
    setPdfData(pdfBytes);
  }

  function downloadPdf() {
    const blob = new Blob([pdfData], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "example.pdf");
    document.body.appendChild(link);
    link.click();
  }

  return (
    <div>
      <button onClick={createPdf}>Create PDF</button>
      {pdfData && <button onClick={downloadPdf}>Download PDF</button>}
    </div>
  );
}

export default VerifyCertificate;
