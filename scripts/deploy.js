// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";
import fs from "fs";

async function main() {
  const Certichain = await hre.ethers.getContractFactory("CertificateStore");
  const certichain = await Certichain.deploy();

  await certichain.deployed();

  console.log(`Certichain Contract deployed to `, certichain.address);
  fs.writeFileSync(
    "./config.js",
    `export const certichainAddress = "${certichain.address}"`
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
