<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

import imgHeroSection from '/assets/bg-header.png';

import sponsorSariRoti from '/assets/sponsor-sari-roti.png';
import sponsorIniPhotobooth from '/assets/sponsor-ini-photobooth.png';
import sponsorPandaboo from '/assets/sponsor-pandaboo.png';

import medpartUnasTv from '/assets/medpart-unastv.png';
import medpartKremmasi from '/assets/medpart-kremmasi.png';
import medpartRMB from '/assets/medpart-rmb.jpg';
import medpartEK from '/assets/medpart-event-kampus.png';
import medpartRut from '/assets/medpart-rut.png';
import medpartEB from '/assets/medpart-event-banget.png';
import medpartSM from '/assets/medpart-sm.png';
import medpartRM from '/assets/medpart-rm.png';
import medpartLewatLensa from '/assets/medpart-lewatlensa.png';
import medpartEraFM from '/assets/medpart-erafm.png';
import medpartSeni from '/assets/medpart-seni.jpg';
import medpartReallist from '/assets/medpart-reallist.png';
import medpartBvoice from '/assets/medpart-bvoice.png';
import medpartEnthus from '/assets/medpart-enthus.png';
import medpartPoliTV from '/assets/medpart-politv.png';
import medpartKetik from '/assets/medpart-ketik.jpg';
import medpartMarketeers from '/assets/medpart-marketeers.png';

import teamMaulana from '/assets/team-maulana.png';
import teamBambang from '/assets/team-bambang.png';
import teamAdryan from '/assets/team-adryan.png';
import teamIlyas from '/assets/team-ilyas.png';
import teamRaka from '/assets/team-raka.png';
import teamIvander from '/assets/team-ivander.png';

import supportFacility from '/assets/support-facility.png';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { ref, onMounted } from 'vue';

const sections = ref([])

const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
}

onMounted(() => {
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
})
</script>
<template>
    <Navbar/>
    <!-- MAIN TITLE PAGE -->
    <section
        :style="{
            backgroundImage: `url(${imgHeroSection})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'top',   
        }"
        class="py-40 animate__animated animate__fadeInDown">
        <h1 class="uppercase font-gulya text-8xl text-center tracking-wide text-white">About</h1>
        <p class="text-4xl font-gulya text-white text-center">MAX 11</p>
    </section>

    <!-- SPONSOR SECTION -->
    <section
        id="scroll-animate"
        class="py-20 opacity-0"
        >
        <h1 class="text-6xl uppercase text-center font-gulya text-[#2CCA4A]">Sponsor</h1>
        <div class="flex justify-center items-center gap-5 w-full">
            <img 
                :src="sponsorPandaboo" 
                alt="image-sponsor-pandaboo"
                class="w-[200px] h-full object-cover"
            >
            <img 
                :src="sponsorSariRoti" 
                alt="image-sponsor-sari-roti"
                class="w-[200px] h-full object-cover"
            >
            <img 
                :src="sponsorIniPhotobooth" 
                alt="image-sponsor-sari-roti"
                class="w-[200px] h-full object-cover"
            >
        </div>
    </section>

    <!-- MEDIA PARTNER SECTION -->
    <section 
        id="scroll-animate"
        class="py-10 opacity-0">
        <h1 class="text-6xl uppercase text-center font-gulya text-[#82E6FF]">Media Partner</h1>
        <div class="flex justify-center">
            <div class="w-[1400px] flex justify-between gap-20 flex-wrap mt-10">
                <img 
                    :src="medpartUnasTv" 
                    alt="media-partner-unas-tv"
                    class="h-[120px]">
                <img 
                    :src="medpartKremmasi" 
                    alt="media-partner-kremmasi"
                    class="h-[120px]">
                <img 
                    :src="medpartEK" 
                    alt="media-partner-event-kampus"
                    class="h-[120px]">
            </div>
        </div>
        <div class="flex justify-center mt-5">
            <div class="w-[1400px] flex justify-between gap-[60px] flex-wrap">
                <img 
                    :src="medpartRut" 
                    alt="media-partner-event-radio-universitas-tarumagara"
                    class="h-20">
                <img 
                    :src="medpartEB" 
                    alt="media-partner-event-event-banget"
                    class="h-20">
                <img 
                    :src="medpartSM" 
                    alt="media-partner-event-suara-mahasiswa"
                    class="h-20">
                <img 
                    :src="medpartRM" 
                    alt="media-partner-event-ruang-mahasiswa"
                    class="h-20">
            </div>
        </div>
        <div class="flex justify-center mt-5">
            <div class="w-[1400px] flex justify-between gap-[60px] flex-wrap">
                <img 
                    :src="medpartBvoice" 
                    alt="media-partner-bVoice"
                    class="h-[120px]">
                <img 
                    :src="medpartReallist" 
                    alt="media-partner-reallist"
                    class="h-[120px]">
                <img 
                    :src="medpartSeni" 
                    alt="media-partner-poster-seni"
                    class="h-[120px]">
                <img 
                    :src="medpartLewatLensa" 
                    alt="media-partner-lewat-lensa"
                    class="h-[120px]">
            </div>
        </div>
        <div class="flex justify-center mt-5">
            <div class="w-[1400px] flex justify-between gap-[60px] flex-wrap">
                <img 
                    :src="medpartEraFM" 
                    alt="media-partner-era-fm"
                    class="h-[120px]">
                <img 
                    :src="medpartKetik" 
                    alt="media-partner-ketik"
                    class="h-[120px]">
                <img 
                    :src="medpartEnthus" 
                    alt="media-partner-enthus"
                    class="h-[120px]">
                <img 
                    :src="medpartPoliTV" 
                    alt="media-partner-polimedia-tv"
                    class="h-[120px]">
            </div>
        </div>
        <div class="flex justify-center mt-5">
            <div class="w-[1400px] flex justify-center gap-[60px] flex-wrap">
                <img 
                    :src="medpartMarketeers" 
                    alt="media-partner-marketeers"
                    class="h-[120px] bg-black px-5">
            </div>
        </div>
    </section>

    <!-- SUPPORTED SECTION -->
    <section
        id="scroll-animate" 
        class="py-20 opacity-0">
        <h1 class="text-6xl uppercase text-center font-gulya text-[#2CCA4A]">Supported By</h1>
        <div class="flex justify-center mt-10">
            <img 
                :src="supportFacility" 
                alt="support-facility"
                class="h-20">
        </div>
    </section>

    <!-- THE TEAMS SECTION -->
    <section 
        id="scroll-animate"
        class="py-10 opacity-0">
        <h1 class="text-center">
            <span class="text-6xl uppercase font-gulya text-[#82E6FF]">
                Our
            </span>
            <span class="text-6xl uppercase font-bold text-[#2CCA4A]">
                Team
            </span>
        </h1>
        <p class="text-2xl font-bold text-center text-[#2CCA4A]  tracking-wide capitalize">Di balik proses dan pengerjaan yang panjang <br>dari pembuatan website max 11</p>

        <Swiper
            :modules="[Navigation, Pagination, Autoplay]"
            :slides-per-view="5"
            :space-between="0"
            :loop="true"
            :autoplay="{
                delay:0,
                disableOnInteraction: false,
            }"
            :speed="2000"
            class="mt-10">
            <SwiperSlide>
                <img 
                    :src="teamMaulana" 
                    alt="team-maulana"
                    class="h-[400px]">
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    :src="teamBambang" 
                    alt="team-bambang"
                    class="h-[400px]">
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    :src="teamAdryan" 
                    alt="team-adryan"
                    class="h-[400px]">
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    :src="teamIlyas" 
                    alt="team-ilyas"
                    class="h-[400px]">
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    :src="teamIvander" 
                    alt="team-ivander"
                    class="h-[400px]">
            </SwiperSlide>
            <SwiperSlide>
                <img 
                    :src="teamRaka" 
                    alt="team-raka"
                    class="h-[400px]">
            </SwiperSlide>
        </Swiper>
    </section>
    <Footer/>
</template>