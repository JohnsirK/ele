import axios from 'axios'
import store from '@/store/index'
import qs from 'qs'
axios.defaults.withCredentials = true;  //允许axios请求携带cookie等凭证

//定义接口地址
const server = axios.create({
	//接口地址
	baseURL:'https://elm.cangdu.org',
	//响应时长
	timeout:3000*10,
	//请求头
	headers:{'content-type':'application/x-www-form-urlencoded'}
})

//请求数据之前
server.interceptors.request.use((config)=>{
	config.withCredentials = true
	//数据未出来之前做些什么
	//加载动画
	store.commit('startLoading')
	return config
},(err)=>{
	console.log('数据请求发生错误！请重试')
	return Promise.reject(err)
})

//数据响应时候
server.interceptors.response.use((res)=>{
	//数据出现之后做些什么
	//结束加载动画
	store.commit('endLoading')
	return res.data
},(err)=>{
	console.log('数据请求发生错误！请重试')
	return Promise.reject(err)
})
 
export default server

//封装axios
//get请求
export function get(url,param){
	return new Promise((resolve,reject) => {
		axios.get(url,{
			params:param
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			console.log(err)
			reject(err)
		})
	})
}
//post请求
export function post(url,data){
	return new Promise((resolve,reject) => {
		axios.post(url,data).then(res=>{
			//此处如果需要qs序列化的话可以写成
			//axios.post(url,{
			// 	data:qs.stringify(data)
			//}).then(res => {
			resolve(res.data)
		},{
        // 单独配置
        withCredentials: true
    }).catch(err => {
			console.log(err)
			reject(err)
		})
	})
}
//delete请求
export function del(url,data){
	return new Promise((resolve,reject) => {
		axios.delete(url,data).then(res=>{
			resolve(res.data)
		}).catch(err => {
			console.log(err)
			reject(err)
		})
	})
}