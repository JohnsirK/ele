import Vue from 'vue'
import Vuex from 'vuex'
import localsession from '@/utils/localsession'
Vue.use(Vuex)
//引入其他vuex 文件
//定义vuex变量
import state from './state'
//vuex计算属性
import getters from './getters'
//同步方法，mutations，只有在这里面才能修改state的值。
import mutations from './mutations'
//异步方法。通过dispatch()分发。通过commit调用mutations里的方法
import actions from './actions'

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
