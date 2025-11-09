<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/footer.vue';

import imgHeroSection from '/assets/bg-header.png';
import accentImg from '/assets/accent-pose-input.png';

import { ref, onMounted } from 'vue';
import feather from 'feather-icons';
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';

const messageStore = useMessageStore()
const { success, error, loading } = storeToRefs(messageStore)
const { createMessage } = messageStore

const badWords = [
    'anjing', 'kontol', 'babi', 'ngentot', 'memek', 'jembut', 'nigga', 'bangsat', 'titit', 'penis', 'vagina', 'tolol', 'dongo', 'dungu', 'idiot', 'anjeng', 'cuki', 'puki'
]


function checkBadWords(text) {
  if (!text) return false
  text = text.toLowerCase()
  return badWords.some(word => text.includes(word))
}

const form = ref({
    name: '',
    message: '',
})

const handleSubmit = async () => {
    if(checkBadWords(form.value.name) || checkBadWords(form.value.message)){
        Swal.fire({
            title: 'Tidak Bisa Diinput!',
            text: 'Jangan gunakan kata-kata kasar yah pls bgt woe!',
            icon: 'error',
            confirmButtonColor: '#d33'
        });
        return false;
    }

    await createMessage(form.value)
}

onMounted( async() => {
    feather.replace()
})

</script>

<template>
    <Navbar/>
    <div>
        <!-- MAIN TITLE PAGE -->
        <section
            :style="{
                backgroundImage: `url(${imgHeroSection})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'top',   
            }"
            class="py-40 animate__animated animate__fadeInDown">
            <h1 class="uppercase font-gulya text-8xl text-center tracking-wide text-white">Kesan & Pesan</h1>
            <p class="text-4xl font-gulya text-white text-center">MAX 11</p>
        </section>

        <!-- SECTION INPUT MESSAGE -->
        <section class="flex items-center h-screen gap-20 animate__animated animate__fadeInUp">
            <!-- LEFT FOR IMAGE -->
            <div class="w-1/3">
                <img 
                    :src="accentImg" 
                    alt="pose-icon-input"
                    class="w-full h-screen object-cover">
            </div>
            <!-- RIGHT FOR INPUT MESSAGE -->
            <div class="w-2/3 px-20">
                <h1 class="text-4xl font-bold capitalize">Kirim kami pesan & kesan kali ya!!!</h1>
                <p class="text-2xl mt-5">Tuliskan pesan & kesan tentang MAX 11</p>
                <form @submit.prevent="handleSubmit" class="mt-10">
                    <!-- FOR INPUT NAME -->
                    <div>
                        <label for="name" class="block text-xl font-semibold">Nama</label>
                        <input type="text" id="name" v-model="form.name" placeholder="Masukan Nama..."
                            class="w-full mt-2 px-4 py-2 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    </div>
                    <!-- FOR INPUT MESSAGE -->
                    <div class="mt-5">
                        <label for="message" class="block text-xl font-semibold">Bagaimana Pesan dan Kesan Anda?</label>
                        <textarea id="message" v-model="form.message" rows="10" placeholder="Masukan Pesan dan Kesan Anda..."
                            class="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-50">
                        </textarea>
                    </div>

                    <!-- FOR BUTTONS -->
                    <div class="flex justify-end items-center gap-10 mt-2">
                        <RouterLink :to="{ name: 'message'}" class="text-lg font-medium">
                            Lewati
                        </RouterLink>
                        <button
                            type="submit"
                            class="px-[60px] py-2 bg-[#1B203D] font-semibold text-white cursor-pointer rounded-xl text-lg duration-200 hover:bg-black">
                            <span v-if="!loading">
                                Kirim
                            </span>
                            <span v-else>
                                Mengirim...
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
    <Footer/>
</template>