import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


const store = createStore({
    state() {
        return {
            user: null,
            dark: false,
            listModalIsOpen: false,
            activeList: null,
            editOrDeleteList: ''
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        toggleDark(state) {
            state.dark = !state.dark
        },
        openListModal(state) {
            state.listModalIsOpen = true
        },
        closeListModal(state) {
            state.listModalIsOpen = false
        },
        updateActiveList(state, list = null) {
            state.activeList = list
        },
        updateModifyMode(state, mode = '') {
            state.editOrDeleteList = mode
        }
    },
    plugins: [createPersistedState({
        paths: ['dark']
    })]
})

export default store