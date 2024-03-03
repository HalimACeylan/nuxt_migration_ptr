<template>
  <div class="bg-gray-800 border-t text-white">
    <div class="flex flex-row px-16 justify-between">
      <div class="flex flex-row items-center w-1/2">
        <NuxtLink to="/">
          <img class="w-32" src="~/assets/images/logo.png" alt="logo" />
        </NuxtLink>
        <span> PTR - ParlaTR is a project of CENG 3550. </span>
      </div>
      <div class="flex flex-col w-1/3 items-right ml-8">
        <h1 class="text-2xl text-left ml-auto py-3 text-red-600">
          Kısa Bağlantılar
        </h1>
        <div class="w-full flex flex-row-reverse">
          <div class="flex flex-col flex-1">
            <NuxtLink
              v-for="idx in bottomLinkTitles.length"
              :to="bottomRoutes[idx]"
              :key="idx"
              class="border-b w-3/4 p-2 ml-auto hover:bg-red-600 rounded-xl"
            >
              {{ bottomLinkTitles[idx] }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-700 py-4 text-center bottom-0 mt-3">
      <p>2024 - Muğla Sıtkı Koçman University - All Rights Reserved</p>
    </div>
  </div>
</template>
<script setup>
const bottomLinkTitles = ref(["Hakkında", "NFT Oluştur", "SSS", "Biz Kimiz?"]);
const bottomRoutes = ref(["/about", "/create-nft", "/sss", "/whoweare"]);
</script>
