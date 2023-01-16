import { createRouter, createWebHistory } from 'vue-router'



// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {   path: '/',
        name: "blank",
        component: () => import('@/views/HelloWorld.vue'),
        meta: {requiresAuth: false, layout: 'content'}
    },
    {   path: '/login',
        name: "login",
        component: () => import('@/views/LoginPage.vue'),
        meta: {requiresAuth: false, layout: 'blank'}
    },
    {   path: '/home',
        name: "home",
        component: () => import('@/views/HomePage.vue'),
        meta: {requiresAuth: true, layout: 'content'}
    },
    {   path: '/:pathMatch(.*)*',
        name: "error-404",
        component: () => import('@/views/Error404.vue'),
        meta: {requiresAuth: false, layout: 'blank'}
    },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach(async(to,from,next)=>{
    //let now = Date.now();
    //let default_time_out=600;
    const loggedIn = localStorage.getItem('user');
    if(to.meta.requiresAuth && !loggedIn){
        next({name: "login"})
    }else if(to.name ==="login" && loggedIn){
        next({name: from.name})
    }else{
        next()
    }
    //TODO gestion du timeOUT

})

export default router;