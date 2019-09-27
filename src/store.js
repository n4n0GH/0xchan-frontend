import Vue from 'vue'
import Vuex from 'vuex'
import autosave from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    autosave()
  ],
  state: {
    login: false,                               // store if user logged in with MM
    hiddenThreads: [],                          // array of threads hidden by user
    grabFiles: false,                           // sfw on (false) or off (true)
    autoSwitch: true,                           // switch theme if sfw mode toggles
    theme: 'YotsubaB',                          // current theme selected
    disclaimer: true,                           // show disclaimer on index page
    customCSS: '',                              // store user's custom CSS
    forceAnon: false,                           // replace user names with Anonymous
    userBoards: [],                             // array of custom board list
    showAlert: true,                            // show alert on voting page
    comfyMode: false,                           // compact mode on/off (t/f)
    userPayment: 'none',                        // preferred payment method
    ecoMode: false,                             // limit autodownload to n MB
    // below data is for dev purpose only
    // when users create a board, the object
    // is written into the "boards" array on
    // the smartcontract. at the same time a
    // new array is created in the "threads"
    // object, where the object key equals
    // the board ticker specified by the user
    demo: {                                     // fake smart contract storage
      boards:[                                  // array to store boards with 1 board premined
        {
          "ticker": "b",
          "punchline": "random",
          "postcounter": 0
        }
      ],
      threads: {                               // collection of objects each holding an array
        b: [
          // see json-examples.json
          // for reference on how to
          // structure this array
        ]
      }                                
    },
    reports: []
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
    },
    getAutoSwitch: state => {
      return state.autoSwitch
    },
    getTheme: state => {
      return state.theme
    },
    getCustomCss: state => {
      return state.customCSS
    },
    getDisclaimer: state => {
      return state.disclaimer
    },
    getForceAnon: state => {
      return state.forceAnon
    },
    getUserBoards: state => {
      return state.userBoards
    },
    getShowAlert: state => {
      return state.showAlert
    },
    getReports: state => {
      return state.reports
    },
    getComfy: state => {
      return state.comfyMode
    },
    getPayment: state => {
      return state.userPayment
    },
    getEco: state => {
      return state.ecoMode
    },
    getDemo: state => {
      return state.demo
    }
  },
  mutations: {
    mutLogin: (state, payload) => {
      state.login = payload
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
    },
    mutAuto: state => {
      state.autoSwitch = !state.autoSwitch
    },
    mutTheme: (state, payload) => {
      state.theme = payload
    },
    mutDisclaimer: state => {
      state.disclaimer = !state.disclaimer
    },
    mutCss: (state, payload) => {
      state.customCSS = payload
    },
    mutAnon: state => {
      state.forceAnon = !state.forceAnon
    },
    mutBoardList: (state, payload) => {
      state.userBoards = payload
    },
    mutBoardListReset: state => {
      state.userBoards.length = 0
    },
    mutAlert: state => {
      state.showAlert = !state.showAlert
    },
    mutReports: (state, payload) => {
      state.reports.push(payload)
    },
    mutReportsRemove: (state, payload) => {
      state.reports.splice(state.reports.indexOf(payload), 1)
    },
    mutComfy: state => {
      state.comfyMode = !state.comfyMode
    },
    mutPayment: (state, payload) => {
      state.userPayment = payload
    },
    mutEco: state => {
      state.ecoMode = !state.ecoMode
    }
  },
  actions: {
    setBool: (context, payload) => {            // universal action for all boolean
       context.commit(payload)                  // mutations, use mut name as payload
    },
    setLogin: context => {
      context.commit('mutLogin', true)
    },
    setLogout: context => {
      context.commit('mutLogin', false)
    },
    setHidden: (context, payload) => {
      context.commit('mutHidden', payload)
    },
    setTheme: (context, payload) => {
      context.commit('mutTheme', payload)
    },
    setCss: (context, payload) => {
      context.commit('mutCss', payload)
    },
    setBoardListReset: context => {
      context.commit('mutBoardListReset')
    },
    setBoardList: (context, payload) => {
      context.commit('mutBoardList', payload)
    },
    setReports: (context, payload) => {
      context.commit('mutReports', payload)
    },
    setReportsRemove: (context, payload) => {
      context.commit('mutReportsRemove', payload)
    },
    setPayment: (context, payload) => {
      context.commit('mutPayment', payload)
    }
  }
})
