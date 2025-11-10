<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

import { ref, onMounted, watch, computed } from 'vue';
import feather from 'feather-icons';
import { useGalleryStore } from '@/stores/gallery';
import { debounce } from 'lodash';
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';

import imgHeroSection from '/assets/home-hero-section.jpg';
import loadingGif from '/assets/loading-white.gif';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const galleryStore = useGalleryStore()
const { galleries, loading } = storeToRefs(galleryStore)
const { fetchGalleries } = galleryStore

const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
}

function generateThumbnail(videoSrc, second = 5) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";


    video.addEventListener("loadeddata", () => {
      if (video.duration < second) second = 1;
      video.currentTime = second;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    });

    video.onerror = () => reject("Failed to load video");
  });
}

const thumbnails = ref({})

const filters = ref({
    search: '',
    category: '',
    date: '',
});

watch(filters, debounce( async () => {
    await fetchGalleries(filters.value)
}, 300), { deep: true })

onMounted( async () => {
    await fetchGalleries()

    for (const gallery of galleries.value) {
    if (gallery.category === "Video") {
      try {
        const poster = await generateThumbnail(
          `https://max-11-management.test/storage/${gallery.path_file}`,
          5
        );
        thumbnails.value[gallery.id] = poster;
      } catch (e) {
        thumbnails.value[gallery.id] = null; // fallback
      }
    }
  }

    feather.replace()
})

const shuffleLeft = computed(() => shuffleArray(galleries.value))
const shuffleMid = computed(() => shuffleArray(galleries.value))
const shuffleRight = computed(() => shuffleArray(galleries.value))
</script>

<template>
    <Navbar/>

    <section class="animate__animated animate__fadeInDown">
        <img :src="imgHeroSection" alt="hero-img-section" class="w-full h-[80vh] object-cover">
    </section>

    <!-- FOR SELECT OPTIONS -->
    <section class="px-20 my-10">
        <div class="bg-white rounded-xl shadow-lg border border-gray-100">
            <div class="p-5">
                <div class="flex justify-between gap-5">
                    <!-- SEARCH TITLE -->
                    <div class="relative w-full">
                        <input type="text" v-model="filters.search" placeholder="Cari Karya..."
                            class="w-full pl-10 pr-4 py-4 rounded-lg text-sm bg-gray-100"/>
                        <i data-feather="search" class="w-5 h-5 text-gray-400 absolute left-3 top-5"></i>
                    </div>
                </div>
                <div class="flex justify-between gap-5 mt-5">
                    <select v-model="filters.date"
                        class="border border-gray-200 rounded-lg px-4 py-5 text-sm focus:outline-none focus:border-purple-500 w-1/2">
                        <option value="">Semua Waktu</option>
                        <option value="latest">Terbaru</option>
                        <option value="oldest">Terlama</option>
                    </select>
                    <select v-model="filters.category"
                        class="border border-gray-200 rounded-lg px-4 py-5 text-sm focus:outline-none focus:border-purple-500 w-1/2">
                        <option value="">Semua Kategori</option>
                        <option value="Image">Image</option>
                        <option value="Video">Video</option>
                    </select>
                </div>
            </div>
        </div>
    </section>

    <div v-if="loading" class="flex justify-center">
        <img 
            :src="loadingGif" 
            alt="loading-animation"
            class="w-[100px]">
    </div>

    <div v-else-if="galleries.length === 0 ">
        <h1 class="text-center font-bold text-4xl py-10">Belum ada galeri ditampilkan</h1>
    </div>

    <!-- SWIPERS -->
    <section v-else class="px-20 flex gap-10 h-[250vh] my-10">
        <Swiper
            v-if="galleries.length"
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
            class="w-1/4"
        >
            <SwiperSlide
                v-for="gallery in shuffleLeft"
                :key="gallery.id"
                class="!m-0 !p-0 !h-auto !flex-none"
            >
                <router-link 
                    v-if="gallery.category === 'Video'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug }}"
                    >
                    <video
                        :poster="thumbnails[gallery.id]"
                        crossorigin="anonymous"
                        :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                        class="w-full h-full block rounded-xl object-cover mt-10"
                        preload="none"
                    ></video>
                </router-link>
                <router-link 
                    v-if="gallery.category === 'Image'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug}}">
                        <img
                            :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                            class="w-full h-auto block rounded-xl mt-10 bg-black"
                        />
                </router-link>
            </SwiperSlide>
        </Swiper>
        <Swiper
            v-if="galleries.length"
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
            class="w-1/2"
        >
            <SwiperSlide
                v-for="gallery in shuffleMid"
                :key="gallery.id"
                class="!m-0 !p-0 !h-auto !flex-none"
            >
                <router-link 
                    v-if="gallery.category === 'Video'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug }}">
                    <video
                        :poster="thumbnails[gallery.id]"
                        crossorigin="anonymous"
                        :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                        class="w-full h-full block rounded-xl object-cover mt-10"
                        preload="none"
                    ></video>
                </router-link>
                <router-link 
                    v-if="gallery.category === 'Image'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug}}">
                        <img
                            :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                            class="w-full h-auto block rounded-xl mt-10 bg-black"
                        />
                </router-link>
            </SwiperSlide>
        </Swiper>
        <Swiper
            v-if="galleries.length"
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
            class="w-1/4"
        >
            <SwiperSlide
                v-for="gallery in shuffleRight"
                :key="gallery.id"
                class="!m-0 !p-0 !h-auto !flex-none"
            >
                <router-link 
                    v-if="gallery.category === 'Video'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug }}">
                    <video
                        :poster="thumbnails[gallery.id]"
                        crossorigin="anonymous"
                        :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                        class="w-full h-full block rounded-xl object-cover mt-10"
                        preload="none"
                    ></video>
                </router-link>
                <router-link 
                    v-if="gallery.category === 'Image'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug}}">
                        <img
                            :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                            class="w-full h-auto block rounded-xl mt-10 bg-black"
                        />
                </router-link>
            </SwiperSlide>
        </Swiper>
    </section>

    <Footer/>
</template>