import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";
import router from '@/router';

export const useMessageStore = defineStore("message", {
    state: () => ({
        messages: [],
        loading: false,
        error: null,
        success: false,
    }),

    actions: {
        async fetchMessages(){
            this.loading = true
            try{
                const response = await axiosInstance.get('messages')

                this.messages = response.data.data
            }catch(error){
                this.error = handleError(error)
                throw error
            }finally{
                this.loading = false
            }
        },

        async createMessage(payload){
            this.loading = true

            try{
                const response = await axiosInstance.post('message', payload)

                this.success = response.data.message

                router.push({ name: 'message' })
            }catch(error){
                this.error = handleError(error)
                throw error
            }finally{
                this.loading = false
            }
        }
    }
});