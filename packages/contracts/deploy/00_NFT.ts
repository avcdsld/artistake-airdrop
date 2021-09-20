const func = async (hre: any) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NFT", {
    from: deployer,
    // args: ["NFT Title", "SYMBOL", "url"],
    args: ["ArtiStake NFT", "ARTI", "https://ipfs.fleek.co/ipfs/QmR3ZHgFW74Jyqe5q5SfB1T5BwDLUxyakdN3BwwsDmRX1i/"],
    log: true,
  });
};

export default func;
module.exports.tags = ["NFT"];
