
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/store';
import {getPostDetail} from '@/axios/board';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('token')){
                next('/board');
            }else{
                alert('사용 권한이 없습니다. 로그인을 해주세요.');
                next('/login');
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../view/login.vue'),
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('token')){
                alert('로그인이 되어있습니다. 홈으로 돌아갑니다.');
                next('/');
            }else{
                next();
            }
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../view/signup.vue'),
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('token')){
                alert('로그인이 되어있습니다. 홈으로 돌아갑니다.');
                next('/');
            }else{
                next();
            }
        }
    },
    {
        path: '/board',
        name: 'board',
        component: () => import('../view/board.vue'),
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('token')){
                next();
            }else{
                alert('사용 권한이 없습니다. 로그인을 해주세요.');
                next('/login');
            }
        },
    },
    {
        path: '/readboard/:id',
        name: 'readboard',
        component: () => import('../view/readboard.vue'),
        beforeEnter: async (to, from, next) => {
            console.log(to);
            const data = await getPostDetail(to.params.id);
            store.commit('setPost',data); 
            next();
        }
    },
    {
        path: '/modifyboard',
        name: 'modifyboard',
        component: () => import('../view/modifyboard.vue')
    },
    {
        path: '/writeboard',
        name: 'writeboard',
        component: () => import('../view/boardwrite.vue')
    },
    {
        path: '/myinfo',
        name: 'myinfo',
        component: () => import('../view/myinfo.vue')
    }
    
    
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;