import { useFetch } from "nuxt/app"

export default defineEventHandler((event) => {
return useFetch('https://api.pinata.cloud/pinning/pinFileToIPFS',{headers: {Authorization: `Bearer ${process.env.pinataApiKey}`}, method: 'POST', body: JSON.stringify({pinataMetadata: {name: 'test'}, pinataOptions: {cidVersion: 0}})
    }) 
})