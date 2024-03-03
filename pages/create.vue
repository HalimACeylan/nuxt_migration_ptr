<template>
   <div class="bg-gray-800">
    <Warn v-if="!accountCheck"/>
    
     <div v-else class="flex flex-col w-8/12 bg-gray-800  mx-auto">
        <div class="container mx-auto my-10">
          <h1 class="text-3xl font-bold mb-5 text-white text-center">NFT Oluştur</h1>
          <form class='flex flex-col items-center'>
            <div class='w-full h-max-92 max-h-max m-6'>
            <UIPreviews  />
            </div>
              <input
                class='w-full h-10 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                type="text"
                v-model="name"
                placeholder="İsim"
              />
              <textarea
                class='w-full h-40 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                placeholder="Açıklama"
                v-model="description"
              ></textarea>

              <input
                type="number"
                class='w-full h-10 m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700'
                v-model="price"
              />
              <button onClick={request} class=' m-2 rounded-xl shadow-lg box-border p-4 text-white border-gray-600 bg-gray-700'>
                NFT Oluştur ve Listele!
              </button>
              <button data-id="${testChain}" onClick={testChain} class=' m-2 rounded-xl shadow-lg box-border p-4 text-white border-gray-600 bg-gray-700'>
                Test Chain
              </button>
          </form>
        </div>
      </div>
    </div>

</template>

<script setup>

const name = ref('');
const description = ref('');
const price = ref('');
const files = ref(null);
const JWT = ref(null);



const { initializeProvider, Purchase } = useEthProvider(window);
const {
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
  } = await initializeProvider();

// TO DO Bir ara düzelt :)
// const pinFileToIPFS = async () => {
//     try {
//       if (files.length < 0) {
//         console.error("File is null");
//         return;
//       }
  
//       const formData = new FormData();
//       formData.append('file', files[0]);
  
//       const pinataMetadata = {
//         name: name,
//         keyvalues: {
//           'Description': description,
//           'Price': price,
//         },
//       };
  
//       formData.append('pinataMetadata', JSON.stringify(pinataMetadata));
//       formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));
  
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${JWT}`,
//         },
//       };
  
//       const res = await axios.post(
//         'https://api.pinata.cloud/pinning/pinFileToIPFS',
//         formData,
//         config
//       );
//       if(res.status !== 200 ){
//         toast('NFT oluşturulamadı');
//       }else{
//         if(res.data?.isDuplicate){
//           toast('Bu NFT zaten IPFS üzerinde mevcut Yeniden oluşturuluyor');
//           frontCreateNFT(res.data.IpfsHash,price)
//       }else{
//         frontCreateNFT(res.data.IpfsHash,price);
//       }
//     }
//     } catch (error) {
//       console.error(error);
//     }
//   };

    // TODO: Add few checks, such as failing to upload IPFS, user should be warned
    const frontCreateNFT = async (tokenURI,price) => {
    if(provider){
      try{
        const tx = await NFTContract.createNFT(tokenURI);
        await tx.wait();
        if(tx.data){
          try{
            const txMarket = await NFTContract.setApprovalForAll(MarketPlaceContract, true);
            await txMarket.wait();
          }catch(error){
            console.error(error);
            toast('NFT oluştuşturulurken bir hata oluştu');
          }
  
          try{
            await (await MarketPlaceContract.makeItem(NFTAddress.address, NFTContract.tokenCount(), price)).wait();
            toast('NFT başarıyla oluşturuldu');
            route.push('/');
  
          }catch(error){
            console.error(error);
            toast('NFT oluştuşturulken bir hata oluştu');
  
          } 
        }
      }catch(error){
        console.error(error);
        toast('NFT oluştuşturulurken bir hata oluştu');
      }
          
    }
  };

  const testChain = async (e) => {
    console.log('TestChain pressed');
    e.preventDefault();
    try {
      console.log('Printed pressed.');
      await TestContract.printAllItemsAndMetadata();
      console.log("Check hardhat if it is printed.");
    } catch (error) {
      console.error(error);
    }
  };
  

  const request = async (e) => {
    console.log('Create NFT is pressed');
    e.preventDefault();
    try {
      //await pinFileToIPFS();
      console.log('NFT created successfully');
    } catch (error) {
      toast('NFT oluştuşturulken bir hata oluştu');
    }
  };

</script>