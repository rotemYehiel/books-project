import Vue from 'vue'
import Vuex from 'vuex'

import bookStore from '@/store/book.store.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    bookStore
  }
})

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })


/////if i need more then 1 store 



