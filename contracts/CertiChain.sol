// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateStore {
    address private owner;
    event FileCertified(address indexed certifier, address indexed student, string ipfsHash, uint timestamp);

    struct Certificate {
        string name;
        string organization;
        string details;
        address certifier;
        address student;
        string ipfsHash;
        uint timestamp;
    }
    mapping (address => bool) private authorizedCertifiers;                  // people who can certify a certificate
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

    function certifyFile(string memory name , string memory organization ,string memory details , address student, string memory ipfsHash) public payable {
        require(authorizedCertifiers[msg.sender], "Only authorized certifiers can call this function.");
        require(student != address(0), "Invalid student address");
        Certificate memory newCertificate = Certificate(name , organization, details ,msg.sender, student, ipfsHash, block.timestamp);
        certificatesByStudent[student].push(newCertificate);
        emit FileCertified(msg.sender, student, ipfsHash, block.timestamp);
    }


    // for student 
    function getCertificatesByStudent() public view returns (Certificate[] memory) {
        // require( msg.sender == student, "Only the student can call this function.");     // access control
        return certificatesByStudent[msg.sender];
    }

    // student or verifier
    function getCertificateByHash(string memory ipfsHash , address person) public view returns (Certificate memory) {
        for (uint i = 0; i < certificatesByStudent[person].length; i++) {
            Certificate memory certificate = certificatesByStudent[person][i];
            if (keccak256(bytes(certificate.ipfsHash)) == keccak256(bytes(ipfsHash))) {
                return certificate;
            }
        }
        revert("Certificate not found.");
    }

}