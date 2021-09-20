const fs = require("fs");
const numberOfTokens = 9999;
const imageCid = "bafybeifkyrfqwjyqbpafmkb6y2zre2axgkninv7fpl4sdsv3723ytnmznu";
const generativeArtCid = "QmbT85ghtUQTL5Zhij5ocMXHLFxR7BAKJ6PnEpQrLXkaM1/";

const createFile = () => {
  for (i = 0; i < numberOfTokens; i++) {
    const obj = {
      name: "ArtiStake NFT",
      description: "ArtiStake Memorial NFT 2021.09 - Fracton Incubation 2021 Selection Memorial.",
      image: `https://ipfs.fleek.co/ipfs/${imageCid}`,
      animation_url: `https://ipfs.fleek.co/ipfs/${generativeArtCid}`,
      external_url: "https://twitter.com/marimosphere/status/1437999923455152129"
    };
    const toJSON = JSON.stringify(obj);
    fs.writeFile(`./metadata_created/${i}`, toJSON, (err) => {
      if (err) console.log(err);
      if (!err) {
        console.log(`JSONファイルを生成しました`);
      }
    });
  }
};

createFile();
