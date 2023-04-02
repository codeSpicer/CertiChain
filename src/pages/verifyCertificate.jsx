import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import certichain from "../../artifacts/contracts/CertiChain.sol/CertificateStore.json";
import { certichainAddress } from "../../config";
import Web3 from "web3";

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
const web3 = new Web3(provider);
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
      <button type="submit">Get Certificate</button>
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
    const page = pdfDoc.addPage([800, 800]);
    page.drawText(stuname, { x: 50, y: 750 });
    page.drawText(organization, { x: 50, y: 650 });
    page.drawText(details, { x: 50, y: 550 });
    page.drawText(certifier, { x: 50, y: 450 });
    page.drawText(student, { x: 50, y: 350 });
    page.drawText(hash, { x: 50, y: 250 });
    const pngImageBytes = await fetch("src/pages/certificate.png").then((res) =>
      res.arrayBuffer()
    );
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    page.drawImage(pngImage, { x: 100, y: 250, width: 300, height: 200 });
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
