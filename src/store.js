import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  files: [],
  selectedFiles: []
}

const mutations = {
  ADD_NUMBER(state, payload) {
    state.numbers.push(payload)
  }
}

const actions = {
  addNumber(context, number) {
    context.commit('ADD_NUMBER', number)
  }
}

const getters = {
  getNumbers(state) {
    return state.numbers
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
