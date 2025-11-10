<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

import imgHeroSection from '/assets/bg-guest.png';
import seminarAttar from '/assets/seminar-attar.png';
import talkshowFacility from '/assets/talkshow-facility.png';
import performerPms from '/assets/performer-pms.png';
import performerStone from '/assets/performer-stone-urine.png';
import performerSunskerta from '/assets/performer-sunskerta.png';
import performerTheCalls from '/assets/performer-the-calls.png';

import 'animate.css';

</script>
<template>
    <Navbar/>
    <section
        :style="{
            backgroundImage: `url(${imgHeroSection})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'top',
        }"
        class="mt-[100px] animate__animated animate__fadeInDown">
        <!-- SEMINAR & TALKSHOW -->
        <section class="py-20">
            <h1 class="font-gulya text-5xl uppercase font-white text-center text-white">seminar & talkshow</h1>
            <div class="flex justify-center gap-20 mt-10">
                <img 
                    :src="seminarAttar" 
                    alt="image-seminar-attar"
                    class="h-[415px]"
                >
                <img 
                    :src="talkshowFacility" 
                    alt="image-talkshow-facility"
                    class="h-[415px]"
                >
            </div>
        </section>
        
        <!-- PERFORMER -->
        <section class="pb-20">
            <h1 class="font-gulya text-5xl uppercase font-white text-center text-white">PERFORMER</h1>
            <div class="flex justify-center gap-20 mt-10">
                <img 
                    :src="performerPms" 
                    alt="performer-pms"
                    class="h-[200px]"
                >
                <img 
                    :src="performerStone" 
                    alt="performer-stone-urine"
                    class="h-[200px]"
                >
                <img 
                    :src="performerSunskerta" 
                    alt="performer-sunskerta"
                    class="h-[200px]"
                >
                <img 
                    :src="performerTheCalls" 
                    alt="performer-the-calls"
                    class="h-[200px]"
                >
            </div>
        </section>
    </section>
    <Footer/>
</template>