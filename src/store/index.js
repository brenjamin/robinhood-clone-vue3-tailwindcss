import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


const store = createStore({
    state() {
        return {
            user: null,
            dark: false,
            listModalIsOpen: false
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        toggleDark(state) {
            state.dark = !state.dark
        },
        toggleListModal(state) {
            state.listModalIsOpen = !state.listModalIsOpen
        }
    },
    plugins: [createPersistedState({
        paths: ['dark']
    })]
})

export default store