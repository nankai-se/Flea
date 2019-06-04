import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: '1',
    isLogin: false,
    userInfo: {'username': '',
      'headPortrait': '' },
    msgNum: 0,
    msgInfo: [],
    curGoodId: ''
  },
  mutations: {
    setuserId (state, userId) {
      state.userId = userId
    },
    setLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    setUserName (state, username) {
      state.userInfo['username'] = username
    },
    setUserPortrait (state, headPortrait) {
      state.userInfo['headPortrait'] = headPortrait
    },
    setCurGoodId (state, goodId) {
      state.curGoodId = goodId
    }
  }
})
export default store
