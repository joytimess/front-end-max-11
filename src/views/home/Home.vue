<script setup>
import imgHeroSection from '/assets/home-hero-section.jpg';
import imgMainSection from '/assets/home-background.png';
import imgIcon from '/assets/icon-max.png';
import titleMaxKun from '/assets/max-kun-title.png';
import mascotPoseOne from '/assets/mascot-pose-1.png';
import mascotPoseTwo from '/assets/mascot-pose-2.png';
import mascotPoseThree from '/assets/mascot-pose-3.png';

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

import { ref, onMounted, computed } from 'vue';
import 'animate.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useGalleryStore } from '@/stores/gallery';
import { storeToRefs } from 'pinia';

const galleryStore = useGalleryStore()
const { galleries, loading } = storeToRefs(galleryStore)
const { fetchGalleries } = galleryStore

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

const sections = ref([])
const thumbnails = ref({})

const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
}

onMounted( async () => {
  sections.value = document.querySelectorAll('#scroll-animate')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp')
        entry.target.classList.remove('opacity-0')
      }
    })
  }, { threshold: 0.3 })
  
  sections.value.forEach(section => observer.observe(section))
  
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
})


const shuffleTop = computed(() => shuffleArray(galleries.value))
const shuffleBottom = computed(() => shuffleArray(galleries.value))
</script>

<template>
    <Navbar/>
    <!-- FIRST SECTION -->
    <section class="animate__animated animate__fadeInDown">
        <img 
            :src="imgHeroSection" alt="background-image-section-hero" class="w-full h-[80vh] object-cover">
    </section>
    <!-- MAIN SECTION -->
    <section
      :style="{
            backgroundImage: `url(${imgMainSection})`, 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top',   
      }">
      <!-- SECTION EXPLAIN MAX-11 -->
      <div 
        id="scroll-animate"
        class="overflow-hidden whitespace-nowrap bg-[#181A30] py-10 opacity-0">
          <p class="inline-block animate-marquee text-white text-6xl font-bold font-gulya tracking-wider">
              MEDIA ART EXHIBITION &nbsp; MEDIA ART EXHIBITION &nbsp; MEDIA ART EXHIBITION &nbsp; MEDIA ART EXHIBITION &nbsp; MEDIA ART EXHIBITION &nbsp; MEDIA ART EXHIBITION &nbsp; MEDIA ART EXHIBITION &nbsp;
          </p>
      </div>
      <div
        id="scroll-animate"
        class="opacity-0">
          <p class="text-2xl text-justify font-semibold mt-2 text-white px-40 py-20">Media Art Exhibition (MAX) adalah pameran tahunan yang di inisiasi oleh mahasiswa Program Studi Rekayasa Multimedia, Politeknik Negeri Media Kreatif Jakarta. Acara ini menghadirkan karya mahasiswa yang menggabungkan teks, gambar, audio, animasi, dan video, sebagai representasi perkembangan multimedia dengan cara yang menarik, kreatif, dan imajinatif. Tidak hanya sekedar pameran, MAX 11 juga menjadikannya wadah untuk apresiasi seni, eksplorasi teknologi, sekaligus kolaborasi.</p>
      </div>

      <!-- SECTION MASCOT MAX-11 -->
      <div
        id="scroll-animate" 
        class="bg-[#181A30] rounded-4xl px-40 py-20 opacity-0">
        <h1 class="font-gulya text-center text-8xl font-bold text-white tracking-wider">KENALAN DULU YUK!</h1>
        <div class="flex items-center justify-between gap-20">
          <!-- IMG MASCOT -->
          <img 
            :src="imgIcon" 
            alt="icon-mascot-max-11"
            class="w-1/3">
          <!-- DESC MASCOT -->
          <div
            class="w-2/3">
            <img 
              :src="titleMaxKun" 
              alt="max-kun-title"
              class="w-full"
              >
            <p class="text-white mt-5 text-2xl text-justify font-medium">Maskot Max-kun melambangkan panasea digital yang hadir dengan wujud robotik yang futuristik. Warna putih-biru sebagai simbol ketenangan, serta bintang bercahaya di tubuhnya, Max-kun merepresentasikan harapan, kebebasan berekspresi, dan ruang aman bagi siapa saja yang lelah. Senyum ramah dan gerak lincahnya menggambarkan bahwa teknologi dapat menjadi sahabat yang meringankan, menghibur, dan menyembuhkan melalui media kreatif, visual, suara, dan interaksi.</p>
          </div>
        </div>
        <!-- POSES OF MASCOT -->
        <div class="w-full flex justify-between gap-10 mt-[60px]">
          <img 
            :src="mascotPoseOne" 
            alt="mascot-pose-one"
            class="w-1/3">
          <img 
            :src="mascotPoseTwo" 
            alt="mascot-pose-two"
            class="w-1/3">
          <img 
            :src="mascotPoseThree" 
            alt="mascot-pose-three"
            class="w-1/3">
        </div>
      </div>

      <!-- SECTION MOTION VIDEO OF MAX-11 -->
      <div 
        id="scroll-animate"
        class="p-20 opacity-0">
        <div class="w-full h-[600px] bg-red-300 rounded-xl flex items-center justify-center">
          <p class="text-center text-white">ini video nya mana coeg</p>
        </div>
      </div>

      <!-- CONDITION OF API -->
      <div v-if="loading">
        <h1 class="text-center font-bold text-4xl py-10">Wait A Moment...</h1>
      </div>
      
      <div v-else-if="galleries.length === 0 ">
        <h1 class="text-center font-bold text-4xl py-10">Belum ada galeri ditampilkan</h1>
      </div>

      <!-- SECTION SLIDER OF GALLERIES -->
      <div 
        id="scroll-animate" 
        class="opacity-0 w-full px-20 pb-20 block">
        <!-- TOP SWIPER -->
        <Swiper
            v-if="galleries.length"
            :modules="[Navigation, Pagination, Autoplay]"
            :slides-per-view="2"
            :space-between="0"
            :loop="true"
            :autoplay="{
                delay: 0,
                disableOnInteraction: false,
            }"
            :speed="2000"
            class="h-[400px]"
            >
            <SwiperSlide 
              v-for="gallery in shuffleTop"
              :key="gallery.id">
                <router-link 
                    v-if="gallery.category === 'Video'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug }}"
                    >
                    <video
                      :poster="thumbnails[gallery.id]"
                      crossorigin="anonymous"
                      :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                      class="w-full h-full block rounded-xl object-cover"
                      preload="none"
                    ></video>
                </router-link>
                <router-link 
                    v-if="gallery.category === 'Image'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug}}">
                        <img
                            :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                            class="w-full h-full block rounded-xl object-contain"
                        />
                </router-link>
            </SwiperSlide>
        </Swiper>
        <!-- BOTTOM SWIPER -->
        <Swiper
            v-if="galleries.length"
            :modules="[Navigation, Pagination, Autoplay]"
            :slides-per-view="5"
            :space-between="50"
            :loop="true"
            :autoplay="{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
            }"
            :speed="2000"
            class="h-[400px] mt-10"
            >
            <SwiperSlide 
              v-for="gallery in shuffleBottom"
              :key="gallery.id">
                <router-link 
                    v-if="gallery.category === 'Video'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug }}"
                    >
                    <video
                      :poster="thumbnails[gallery.id]"
                      crossorigin="anonymous"
                      :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                      class="w-full h-full block rounded-xl object-cover"
                      preload="none"
                    ></video>
                </router-link>
                <router-link 
                    v-if="gallery.category === 'Image'"
                    :to="{name : 'gallery.detail', params: {slug: gallery.slug}}">
                        <img
                            :src="`https://max-11-management.test/storage/${gallery.path_file}`"
                            class="w-full h-full block rounded-xl object-cover"
                        />
                </router-link>
            </SwiperSlide>
        </Swiper>
      </div>
    </section>
    
    <Footer/>
</template>

<style>

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 15s linear infinite;
}

</style>