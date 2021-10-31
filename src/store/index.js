import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


const store = createStore({
    state() {
        return {
            user: null,
            dark: false
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        toggleDark(state) {
            state.dark = !state.dark
        }
    },
    plugins: [createPersistedState()]
})

export default store