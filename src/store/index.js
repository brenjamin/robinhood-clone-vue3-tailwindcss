import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state() {
    return {
      user: null,
      dark: false,
      listModalIsOpen: false,
      activeList: null,
      modalMode: '',
      showNotification: false,
      activeStock: null,
      allLists: null,
      notificationType: null,
      recentlyUpdatedLists: null,
      notificationMessage: ''
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
      state.modalMode = mode
    },
    showNotification(state) {
      state.showNotification = true
    },
    hideNotification(state) {
      state.showNotification = false
    },
    setActiveStock(state, stock) {
      state.activeStock = stock
    },
    setLists(state, lists) {
      state.allLists = lists
    },
    updateNotificationType(state, updateType) {
      state.notificationType = updateType
    },
    setRecentlyUpdatedLists(state, lists) {
      state.recentlyUpdatedLists = lists
    },
    setNotificationMessage(state, message) {
      state.notificationMessage = message
    }
  },
  plugins: [
    createPersistedState({
      paths: ['dark']
    })
  ]
})

export default store
