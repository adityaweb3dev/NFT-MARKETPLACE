import hre from "hardhat";

async function main() {
    console.log("🚀 Starting Deployment to Sepolia...");

    const [deployer] = await hre.ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    console.log(`Deploying contracts with the account: ${deployerAddress}`);

    // 1. Deploy NexaNFT
    console.log("Deploying NexaNFT...");
    const NexaNFT = await hre.ethers.getContractFactory("NexaNFT");
    const nexaNFT = await NexaNFT.deploy(deployerAddress);
    await nexaNFT.waitForDeployment();
    const nftAddress = await nexaNFT.getAddress();
    console.log(`✅ NexaNFT deployed to: ${nftAddress}`);

    // 2. Deploy NexaMarketplace
    console.log("Deploying NexaMarketplace...");
    const NexaMarketplace = await hre.ethers.getContractFactory("NexaMarketplace");
    const nexaMarketplace = await NexaMarketplace.deploy(deployerAddress);
    await nexaMarketplace.waitForDeployment();
    const marketplaceAddress = await nexaMarketplace.getAddress();
    console.log(`✅ NexaMarketplace deployed to: ${marketplaceAddress}`);

    console.log("\n🎉 Deployment Complete!");
    console.log("-----------------------------------------");
    console.log(`NFT Address: ${nftAddress}`);
    console.log(`Marketplace Address: ${marketplaceAddress}`);
    console.log("-----------------------------------------");
    console.log("Next Step: Update src/lib/contracts.ts with these addresses.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
