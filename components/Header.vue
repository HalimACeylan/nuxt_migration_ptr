<template>
  <div class="bg-gray-800">
    <nav class="flex items-center justify-between mx-16 py-2">
      <div class="flex items-center text-xl">
        <NuxtLink to="/">
          <img
            class="w-32"
            src="~/assets/images/logo.png"
            alt="logo"
          />
        </NuxtLink>
        <div class="flex border-l pl-4 space-x-4">
          <NuxtLink
            class="text-white font-semibold hover:text-red-600"
            to="/"
          >
            Anasayfa
          </NuxtLink>
          <NuxtLink
            class="text-white font-semibold hover:text-red-600"
            to="/"
          >
            NFT Oluştur
          </NuxtLink>
        </div>
      </div>
      <div
        class="flex items-center bg-[#343338] rounded-xl px-2 py-1 w-1/3 h-12"
      >
      <Icon name="material-symbols:search" />
        <input
          class="bg-transparent text-white w-full placeholder-white outline-none"
          placeholder="Ara"
          type="Search"
        />
      </div>
      <div class="flex items-center space-x-4">
        <button
        v-if="isLogin"
          :onClick="Irem"
          class="bg-red-600 group hover:bg-gray-300 text-white px-4 py-3 rounded-lg flex flex-row items-center"
        >
          <span class="group group-hover:text-red-600 mr-2 text-lg">
            Hoşgeldiniz </span
          >
          <Icon name="material-symbols-light:wallet" />
        </button>
        <button
        v-else
          :onClick="Login"
          class="bg-red-600 group hover:bg-gray-300 text-white px-4 py-3 rounded-lg flex flex-row items-center"
        >
          <span class="group group-hover:text-red-600 mr-2 text-lg">
            Giriş Yap </span
          >
          <Icon name="material-symbols-light:wallet" />
        </button>
        <NuxtLink
          v-if="isLogin"
          to="/"
          class="bg-red-600 group hover:bg-gray-300 text-white px-4 py-3 rounded-lg flex flex-row items-center"
        >
          <span class="group group-hover:text-red-600 mr-1 text-lg">
            Envanter
          </span>
          <Icon name="solar:backpack-bold" />
        </NuxtLink>
        <button
        v-else
          class="bg-red-600  hover:bg-gray-300 text-white px-4 py-2.5 rounded-lg flex flex-row items-center disabled:bg-gray-400"
          disabled
        >
          <span class=" mr-0.5 text-lg"> Envanter </span>
          <Icon name="solar:backpack-bold" />
        </button>

      </div>
    </nav>
  </div>
</template>
<script setup>
import useEthProvider from '~/composables/useEthProvider';
const isLogin = ref(false);
const { initializeProvider } = await useEthProvider(window);
initializeProvider();
const Login =  async() => {
    const {  accountCheck , provider, signer, address, chainId, balance } = await initializeProvider();
    isLogin.value = accountCheck;  
}


</script>
