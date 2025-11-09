import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";
import router from "@/router";

export const useGalleryStore = defineStore("gallery", {
    state: () => ({
        galleries: [],
        loading: false,
        error: null,
        success: false,
    }),

    actions: {
        async fetchGalleries(params){
            this.loading = true
            try{
                const response = await axiosInstance.get('works', { params })

                this.galleries = response.data.data
            }catch(error){
                this.error = handleError(error)
                throw error
            }finally{
                this.loading = false
            }

        },

        async fetchGallery(slug){
            this.loading = true

            try{
                const response = await axiosInstance.get(`/work/${slug}`)

                return response.data.data
            }catch(error){
                this.error = handleError(error)
                throw error
            }finally{
                this.loading = false
            }
        },

        shuffleArray(array) {
            const shuffled = array.slice()
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            }
            return shuffled
        }
    }
});