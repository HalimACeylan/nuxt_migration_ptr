<template><div class="flex flex-col w-8/12 bg-gray-800 mx-auto h-screen">
    <div class="container mx-auto my-10">
      <h1 class="text-3xl font-bold mb-5 text-white text-center    "> {{ title }}</h1>
        <p class='w-full m-2 rounded-xl shadow-lg box-border p-2 text-white border-gray-600 bg-gray-700 text-center'> {{ content }}
        </p>
    </div>
  </div>
  </template>

  <script setup >
  const props = defineProps({
    title: String,
    content:String,

  })
</script>

