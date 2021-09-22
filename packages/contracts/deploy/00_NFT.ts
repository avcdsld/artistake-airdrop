const func = async (hre: any) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NFT", {
    from: deployer,
    // args: ["NFT Title", "SYMBOL", "url"],
    // args: ["ArtiStake ARTIST NFT", "ARTI", "https://ipfs.fleek.co/ipfs/bafybeiexsh7jzsvcqgbmbkblfjqzhotgrb2jmp7nbqsmxqvw63p3yoqfi4"],
    args: ["ArtiStake THANKS NFT", "ATHX", "https://ipfs.fleek.co/ipfs/bafybeig2qnac7pkhnhbawatlybl7ss4iu5fcctmjrgayrvzu34gwseyuzq"],
    log: true,
  });
};

export default func;
module.exports.tags = ["NFT"];
