<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { capitalize, debounce } from 'lodash';
import { DateTime } from 'luxon';
import feather from 'feather-icons';
import { useRoute } from 'vue-router';
import { useGalleryStore } from '@/stores/gallery';
import { slice } from 'lodash';

import templateUserIcon from '/assets/templates_user_icon.png';
import loadingGif from '/assets/loading-white.gif';

const galleryStore = useGalleryStore()
const { error, loading, galleries } = storeToRefs(galleryStore)
const { fetchGallery, fetchGalleries } = galleryStore

const route = useRoute()
const gallery = ref({})

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

const fetchGalleryDetail = async () => {
    const response = await fetchGallery(route.params.slug)

    gallery.value = response
}

watch(() => route.params.slug, async (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
        await fetchGalleryDetail()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
})

onMounted( async () => {
    await fetchGalleryDetail()
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
</script>

<template>
    <Navbar/>
    <!-- BACK TO MAIN GALLERY -->
    <section class="mt-[120px] px-20">
        <RouterLink :to="{name: 'gallery'}"
            class="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
            <i data-feather="arrow-left" class="w-5 h-5 mr-2"></i>
            Back to Gallery
        </RouterLink>
    </section>

    <div v-if="loading" class="flex justify-center">
        <img 
            :src="loadingGif" 
            alt="loading-animation"
            class="w-[100px]">
    </div>

    <!-- DETAIL N MORE -->
    <section class="px-40 flex items-start justify-center gap-20 py-5">
        <!-- THE DETAIL -->
        <div class="w-3/4">
            <!-- VIDEO OR IMG FROM API GALLERIES -->
            <video
                v-if="gallery.category === 'Video'" 
                :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                class="w-full h-auto block rounded-xl"
                controls>
            </video>
            <img
                v-if="gallery.category === 'Image'" 
                :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                class="w-full h-[600px] rounded-xl object-contain">
            <!-- FOR IDENTITY ARTIST -->
            <div
                v-if="!loading" 
                class="flex items-center gap-5 py-5 mt-10">
                <img :src="templateUserIcon" class="w-[125px] h-[125px]">
                <div>
                    <h1 class="text-4xl font-semibold">{{ gallery.title }}</h1>
                    <h1 class="text-2xl font-semibold">{{ gallery.artist }}</h1>
                    <h1 class="text-lg font-medium">{{ gallery.nim }}</h1>
                </div>
            </div>
            <!-- V-IF OF CATEGORY -->
            <div 
                v-if="!loading"
                class="flex gap-5">
                <p 
                    v-if="gallery.category === 'Image'"
                    class="inline-block px-10 py-2 bg-white border rounded-lg font-bold">Image</p>
                <p
                    v-if="gallery.category === 'Video'"
                    class="inline-block px-10 py-2 bg-white border rounded-lg font-bold">Video</p>
            </div>
            <!-- FOR DESCRIPTION -->
            <div class="py-10">
                <p class="whitespace-break-spaces text-justify">{{ gallery.description }}</p>
            </div>
        </div>
        <!-- MORE GALLERIES -->
        <div 
            v-if="!loading"
            class="w-1/4 h-[110vh] overflow-scroll overflow-x-hidden">
            <h1 class="font-bold text-4xl">Gallery Lainnya</h1>
            <div class="mt-5">
                <div
                    v-for="moreGallery in galleries" 
                    :key="moreGallery.id" 
                    class="cursor-pointer w-full mb-5 px-5">
                    <router-link
                        :to="{name : 'gallery.detail', params: {slug: moreGallery.slug}}">
                        <video 
                            v-if="moreGallery.category === 'Video'"
                            :src="`https://max-11-management.test/storage/${moreGallery.path_file}`"
                            class="w-full rounded-xl block"
                            :poster="thumbnails[moreGallery.id]"
                            crossorigin="anonymous"
                            preload="none">
                        </video>

                        <img 
                            v-if="moreGallery.category === 'Image'"
                            :src="`https://max-11-management.test/storage/${moreGallery.path_file}`"
                            class="w-full h-[250px] object-contain rounded-xl block">
                        
                        <div>
                            <h1 class="text-xl font-bold">{{ moreGallery.title }}</h1>
                            <p class="text-lg">By <span class="font-semibold">{{ moreGallery.artist }}</span></p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>

    <Footer/>
</template>