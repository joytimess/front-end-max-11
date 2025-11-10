<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

import { ref, onMounted, watch, computed } from 'vue';
import feather from 'feather-icons';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import loadingGif from '/assets/loading-white.gif';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const router = useRouter()

const messageStore = useMessageStore()
const { messages, loading } = storeToRefs(messageStore)
const { fetchMessages } = messageStore


const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
}

onMounted( async () => {
    await fetchMessages()
    feather.replace()

    setTimeout(() => {
        router.push({ name: 'thanks'})
    }, 120000); // 2000 = 2 detik, 20000 = 20 detik, 60000 = 60 detik, 120000 = 120 detik
})

const shuffleLeft = computed(() => shuffleArray(messages.value))
const shuffleMid = computed(() => shuffleArray(messages.value))
const shuffleRight = computed(() => shuffleArray(messages.value))
</script>

<template>
    <Navbar/>
    <!-- <<section class="animate__animated animate__fadeInDown">
        <img :src="imgHeroSection" alt="hero-img-section" class="w-full h-[80vh] object-cover">
    </section>> -->

    <section class="animate__animated animate__fadeInDown mt-[120px]">
        <div
            class="flex justify-center">
            <div>
                <h1 class="uppercase text-center font-gulya text-6xl text-[#2CCA4A]">Kesan & Pesan</h1>
                <p class="text-[#06731B] text-center font-medium text-2xl mt-5">Kesan & dan Pesan kalian sangat berharga bagi kami <br> Terima kasih telah meluangkan waktu untuk mengunjungi MAX 11</p>
            </div>
        </div>
    </section>

    <div v-if="loading" class="flex justify-center">
        <img 
            :src="loadingGif" 
            alt="loading-animation"
            class="w-[100px]">
    </div>


    <div v-else-if="messages.length === 0" class="py-10">
        <h1 class="text-center font-bold text-4xl">Tidak Ada Pesan dan Kesan!</h1>
    </div>

    
    <section
        v-else
        class="flex justify-between gap-10 px-10 h-screen mt-10 mb-10">
        <!-- LEFT SECTION -->
        <Swiper
            v-if="messages.length"
            :modules="[Autoplay]"
            direction="vertical"
            loop="true"
            slides-per-view="auto"
            space-between="0"
            allow-touch-move="false"
            :autoplay="{
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: true,
            }"
            speed="6000"
            class="w-1/4">
            <SwiperSlide
                v-for="message in shuffleLeft"
                :key="message.direction"
                class="!m-0 !p-0 !h-auto !flex-none">
                <div class="mt-5 p-5 bg-gray-200 rounded-xl w-full">    
                    <h1 class="font-bold text-2xl text-center">{{ message.name }}</h1>
                    <p class="text-lg wrap-break-word text-center mt-3">{{ message.message }}</p>
                </div>
            </SwiperSlide>
        </Swiper>

        <!-- MID SECTION -->
        <Swiper
            v-if="messages.length"
            :modules="[Autoplay]"
            direction="vertical"
            loop="true"
            slides-per-view="auto"
            space-between="0"
            allow-touch-move="false"
            :autoplay="{
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: false,
            }"
            speed="6000"
            class="w-1/2">
            <SwiperSlide
                v-for="message in shuffleMid"
                :key="message.direction"
                class="!m-0 !p-0 !h-auto !flex-none">
                <div class="mt-5 p-5 bg-gray-200 rounded-xl w-full">    
                    <h1 class="font-bold text-2xl text-center">{{ message.name }}</h1>
                    <p class="text-lg wrap-break-word text-center mt-3">{{ message.message }}</p>
                </div>
            </SwiperSlide>
        </Swiper>

        <!-- RIGHT SECTION -->

        <Swiper
            v-if="messages.length"
            :modules="[Autoplay]"
            direction="vertical"
            loop="true"
            slides-per-view="auto"
            space-between="0"
            allow-touch-move="false"
            :autoplay="{
                delay: 1,
                disableOnInteraction: false,
                reverseDirection: true,
            }"
            speed="6000"
            class="w-1/4">
            <SwiperSlide
                v-for="message in shuffleRight"
                :key="message.direction"
                class="!m-0 !p-0 !h-auto !flex-none">
                <div class="mt-5 p-5 bg-gray-200 rounded-xl w-full">    
                    <h1 class="font-bold text-2xl text-center">{{ message.name }}</h1>
                    <p class="text-lg wrap-break-word text-center mt-3">{{ message.message }}</p>
                </div>
            </SwiperSlide>
        </Swiper>
    </section>

    <Footer/>
</template>