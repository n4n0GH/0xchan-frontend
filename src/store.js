import Vue from 'vue'
import Vuex from 'vuex'
import autosave from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    autosave()
  ],
  state: {
    login: false,
    hiddenThreads: [],
    grabFiles: false
  },
  getters: {
    getLogin: state => {
      return state.login
    },
    getHidden: state => {
      return state.hiddenThreads
    },
    getGrab: state => {
      return state.grabFiles
    }
  },
  mutations: {
    mutLogin: state => {
      state.login = !state.login
    },
    mutHidden: (state, payload) => {
      if(state.hiddenThreads.includes(payload)){
        state.hiddenThreads.splice(state.hiddenThreads.indexOf(payload), 1)
      }
      else {
        state.hiddenThreads.push(payload)
      }
    },
    mutGrab: state => {
      state.grabFiles = !state.grabFiles
    }
  },
  actions: {
    setLogin: context => {
      context.commit('mutLogin')
    },
    setHidden: (context, payload) => {
      context.commit('mutHidden', payload)
    },
    setGrab: context => {
      context.commit('mutGrab')
    }
  }
})
