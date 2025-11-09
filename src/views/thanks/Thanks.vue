<script setup>
import mascotThanks from '/assets/mascot-thanks.png';
import bgThanks from '/assets/bg-thanks.png';

import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter()

onMounted(() => {
    setTimeout(() => {
        router.push({ name: 'home'})
    }, 120000);
})

</script>

<template>
    <section
        :style="{
            backgroundImage: `url(${bgThanks})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'top',   
        }"
        class="h-screen animate__animated animate__fadeInDown flex flex-col justify-between">
        <h1 class="text-6xl font-gulya text-white uppercase text-center mt-40">terimakasih telah <br>berpartisipasi</h1>
        <div class="flex justify-center">
            <img 
                :src="mascotThanks" 
                alt="mascot-thanks"
                class="w-1/2">
        </div>
    </section>
</template>