import { ethers } from "ethers";
import "vue3-toastify/dist/index.css";

export default function useEthProvider(window) {
  var provider = null;
  var signer = null;
  var address = null;
  var chainId = null;
  var balance = null;
  var accountCheck = false;
  var MarketPlaceContract = { address: null, abi: null };
  var MarketPlaceAddress = { address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" };
  var MarketPlaceAbi = { abi: null };
  var NFTAddress = { address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" };
  var NFTAbi = { abi: null };
  var TestAddress = { address: "0x0165878A594ca255338adfa4d48449f69242Eb8F" };
  var TestAbi = { abi: null };
  var NFTContract = { address: null, abi: null };
  var TestContract = { address: null, abi: null };
  var itemCount = 0;
  var itemsList = [];
  var account = null;

  if (window && window.ethereum) {
    window.ethereum.on("accountsChanged", async function (accounts) {
      if (accounts.length > 0) {
        provider = await new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        MarketPlaceContract = await new ethers.Contract(
          MarketPlaceAddress.address,
          MarketPlaceAbi.abi,
          signer
        );
        NFTContract = await new ethers.Contract(
          NFTAddress.address,
          NFTAbi.abi,
          signer
        );
        TestContract = await new ethers.Contract(
          TestAddress.address,
          TestAbi.abi,
          signer
        );
        accounts = await provider.send("eth_requestAccounts", []);
        account = accounts[0];
        window.location.reload();
      }
      accountCheck = accounts.length > 0;
    });
  }

  const initializeProvider = async () => {
    try {
      if (window && window.ethereum) {
        provider = await new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        if(MarketPlaceAbi.abi !== null && MarketPlaceAddress.address !== null){
          MarketPlaceContract = await new ethers.Contract(
            MarketPlaceAddress.address,
            MarketPlaceAbi.abi,
            signer
          );
        }
        if(NFTAbi.abi !== null && NFTAddress.address !== null){
          NFTContract = await new ethers.Contract(
            NFTAddress.address,
            NFTabi.abi,
            signer
          );
        }
        if(TestAbi.abi !== null && TestAddress.address !== null){
          test = await new ethers.Contract(
            TestAddress.address,
            TestAbi.abi,
            signer
          );
        }
        address = await signer.getAddress();
        chainId = (await provider.getNetwork()).chainId;
        if (
          MarketPlaceAbi.abi !== null &&
          MarketPlaceAddress.address !== null
        ) {
          itemCount = await MarketPlaceContract.itemCount();
          for (let i = 1; i <= itemCount; i++) {
            let item = await MarketPlaceContract.items(i);
            let uri = await NFTContract.tokenURI(item.tokenIdInNFT);
            let totalPrice = await MarketPlaceContract.getTotalPrice(
              item.itemIdInMarketplace
            );
            if (!item.sold) {
              itemsList.push({
                inListItemIdInMarketplace: item.itemIdInMarketplace,
                inListTokenIdInNFT: item.tokenIdInNFT,
                uri: uri,
                owner: item.owner,
                price: totalPrice.toString(),
              });
            }
          }
        }

        accountCheck = true;
      } else {
        accountCheck = false;
      }
    } catch (error) {
      console.error("Error initializing provider:", error);
      accountCheck = false;
    }
    return {
      accountCheck,
      provider,
      signer,
      address,
      chainId,
      balance,
      itemsList,
      NFTAddress,
      NFTContract,
      MarketPlaceContract,
      TestContract,
    };
  };
  const Purchase = async (item) => {
    async function buy() {
      if (item.owner.toLowerCase() === account.toLowerCase()) {
        return;
      } else {
        if (
          MarketPlaceAddress.address === null ||
          MarketPlaceAbi.abi === null
        ) {
          return;
        }
        const tx = await MarketPlaceContract.purchaseItem(
          item.inListItemIdInMarketplace,
          { value: item.price }
        );
        await tx.wait().catch((error) => {
          console.error("Transaction failed:", error);
        });
      }
    }
    return buy;
  };
  return {
    initializeProvider,
    //Purchase,
  };
}
