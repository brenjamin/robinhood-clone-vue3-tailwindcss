import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import { projectAuth } from './firebase/config'




let app;


projectAuth.onAuthStateChanged(() => {
    if (!app) {
        store.commit('setUser', projectAuth.currentUser)
        app = createApp(App).use(router).use(store).mount('#app')
    }
})

