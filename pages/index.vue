<template>
  
  <div class="bg-gray-800 ">
    
    <div class=" flex py-2 overflow-x-auto mx-12">
      <button
        v-for="(text, index) in navbarText"
        :key="index"
        class="text-white hover:bg-red-600 px-4 rounded-xl py-2.5 text-xl"
      >
        {{ text }}
      </button>
    </div>
    <div
      class="grid grid-cols-5 gap-6 w-full bg-gray-800 px-16 py-8 min-h-[50vh]"
    >
      <div v-for="item in items">
        <UICard
          :key="item.itemIdInMarketplace"
          :onClick="purchase(item)"
          :src="stickLink(item.uri)"
          :name="item.inListItemIdInMarketplace.toString()"
          :price="item.price.toString()"
          alt="image"
          isInventory="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const items = ref([]);
const purchase = ref(null);
const navbarText = ["Hepsi", "Tarih", "Spor", "Bilim", "Müzik"];
const stickLink = (link) => {
  return "https://ipfs.io/ipfs/" + link;
};

onMounted(async () => {
  const { initializeProvider, Purchase } = useEthProvider(window);
  const {
    accountCheck,
    provider,
    signer,
    address,
    chainId,
    balance,
    itemsList,
  } = await initializeProvider();
  items.value = itemsList;
  purchase.value = Purchase;
});
</script>
