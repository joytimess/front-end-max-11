<script setup>
import maxLogo from '/assets/max-logo.png';
import bgHeader from '/assets/bg-header.png';
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>


<template>
    <header 
        :style="{
            backgroundImage: `url(${bgHeader})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'top',   
        }"
        class="fixed top-0 left-0 w-full px-20 py-5 flex justify-between items-center z-50">
        <div>
            <RouterLink :to="{ name: 'home'}">
                <img :src="maxLogo" alt="max-logo.png" class="w-[125px]">
            </RouterLink>
        </div>
        <div 
            class="flex gap-10 font-bold text-white"
            >
            <RouterLink :to="{ name: 'home'}" class="duration-200 hover:text-purple-500">
                Home
            </RouterLink>
            <RouterLink :to="{ name: 'gallery'}" class="duration-200 hover:text-purple-500">
                Gallery
            </RouterLink>
            <RouterLink :to="{ name: 'create.message'}" class="duration-200 hover:text-purple-500">
                Message & Impression
            </RouterLink>
            <RouterLink :to="{ name: 'guestStar'}" class="duration-200 hover:text-purple-500">
                Guest Star
            </RouterLink>
            <RouterLink :to="{ name: 'about'}" class="duration-200 hover:text-purple-500">
                About
            </RouterLink>
        </div>
    </header>
</template>