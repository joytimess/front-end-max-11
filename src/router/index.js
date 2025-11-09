import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import Gallery from "@/views/gallery/Gallery.vue";
import GalleryDetail from "@/views/gallery/GalleryDetail.vue";
import Message from "@/views/message/Message.vue";
import CreateMessage from "@/views/message/CreateMessage.vue";
import About from "@/views/about/About.vue";
import Thanks from "@/views/thanks/Thanks.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        // HOME
        {
            path: '/',
            component: Home,
            name: 'home',
            meta: {
                title: 'Home',
            },
        },
        {
            path: '/gallery',
            component: Gallery,
            name: 'gallery',
            meta: {
                title: 'Gallery',
            }
        },
        {
            path: '/gallery/:slug',
            component: GalleryDetail,
            name: 'gallery.detail',
            meta: {
                title: 'Gallery Detail',
            }
        },
        {
            path: '/message/create',
            component: CreateMessage,
            name: 'create.message',
            meta: {
                title: 'Create Message'
            }
        },
        {
            path: '/message',
            component: Message,
            name: 'message',
            meta: {
                title: 'Messages'
            }
        },
        {
            path: '/about',
            component: About,
            name: 'about',
            meta: {
                title: 'About',
            }
        },
        {
            path: '/thanks',
            component: Thanks,
            name: 'thanks',
            meta: {
                title: 'Terimakasih Telah Berpartisipasi',
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const defaultTitle = 'MAX 11';
    document.title = to.meta.title ? `${defaultTitle} | ${to.meta.title}` : defaultTitle;
    next();
});

export default router