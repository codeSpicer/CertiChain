// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateStore {
    address private owner;
    event FileCertified(address indexed certifier, address indexed student, string ipfsHash, uint timestamp);

    struct Certificate {
        address certifier;
        address student;
        string ipfsHash;
        uint timestamp;
    }

    mapping (address => bool) public authorizedCertifiers;                  // people who can certify a certificate
    mapping (address => Certificate[]) private certificatesByStudent;       // list of certificates mapped to a student

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addAuthorizedCertifier(address certifier) public onlyOwner {
        authorizedCertifiers[certifier] = true;                             // owner of contract can make new autherised personel
    }

    function removeAuthorizedCertifier(address certifier) public onlyOwner {
        authorizedCertifiers[certifier] = false;                            // remove certifiers 
    }

    function certifyFile(address student, string memory ipfsHash) public payable {
        require(authorizedCertifiers[msg.sender], "Only authorized certifiers can call this function.");
        require(student != address(0), "Invalid student address");
        Certificate memory newCertificate = Certificate(msg.sender, student, ipfsHash, block.timestamp);
        certificatesByStudent[student].push(newCertificate);
        emit FileCertified(msg.sender, student, ipfsHash, block.timestamp);
    }

    function getCertificatesByStudent(address student) public view returns (Certificate[] memory) {
        require( msg.sender == student, "Only the student can call this function.");     // access control
        return certificatesByStudent[student];
    }

    function revokeCertificate(address student, string memory ipfsHash) public{
        bool found = false;
        for (uint i = 0; i < certificatesByStudent[student].length; i++) {
            Certificate storage certificate = certificatesByStudent[student][i];
            if (keccak256(bytes(certificate.ipfsHash)) == keccak256(bytes(ipfsHash))) {
                if (msg.sender == certificate.certifier || msg.sender == owner) {
                    certificatesByStudent[student][i] = certificatesByStudent[student][certificatesByStudent[student].length - 1];
                    certificatesByStudent[student].pop();
                    found = true;
                    break;
                }
            }
        }
        require(found, "Certificate not found.");
    }

    // Function to get a certificate by its IPFS hash
    function getCertificateByHash(string memory ipfsHash) public view returns (Certificate memory) {
        for (uint i = 0; i < certificatesByStudent[msg.sender].length; i++) {
            Certificate memory certificate = certificatesByStudent[msg.sender][i];
            if (keccak256(bytes(certificate.ipfsHash)) == keccak256(bytes(ipfsHash))) {
                return certificate;
            }
        }
        revert("Certificate not found.");
    }

}