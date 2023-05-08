# CertiChain

This project uses blockchain technology to store and verify certificates that can be provided by an organization. It stores all the data related to certificates in a custom struct in smart contracts which can be added by an authorized certifier. End users can get all their certificates or send the hash of the certificate to employers for them to verify using the frontend.

The frontend is a basic React app where the owner or deployer of the smart contract can authorize certifiers and then they can proceed to add certificates. We are also using `react-pdf` to generate the certificates and make them downloadable for the end user.

## Getting Started

To run this project:

1. The user needs to have `Node.js` installed on their system.
2. Git clone the project
3. Change into the project directory: `cd project-name`
4. Run `npm install`
5. In another terminal, start the hardhat node in the local system by running `npx hardhat node`
6. In the same directory, run the following:
   ```shell
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network localhost
   ```

This will compile and deploy the smart contract to local blockchain.

7. In another terminal in the same directory, run` npm run dev`.

The user needs to have Metamask installed in their browser and also needs to import the private keys of the first hardhat address because that is the owner account. They can then add new certifiers and certify certificates to users.

Technologies Used
Blockchain
Solidity
React
react-pdf
hardhat
