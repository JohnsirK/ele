//封装一下sessionStorage和localStorage方便其他页面使用
//sessionStorage和localStorage的区别:
//保存数据的声明周期不同，在客户端中保存，
//sessionStorage是生命周期是会话结束，也就是关闭当前页面或浏览器后清除
//localStorage是永久保存，除非自己手动清除
export default{
	//获取根据参数name传进来的名称的值
	getSession:function(name){
		if(!name){
			return
		}
		return window.sessionStorage.getItem(name)
	},
	//根据传进来的参数名称name和内容content设置值
	setSession:function(name,content){
		if(!name){
			return
		}
		//如果传进来的内容不是字符串内容的话
		//就将它从js对象转换成JSON对象保存
		if(content !== 'String'){
			content = JSON.stringify(content)
		}
		//降传进来的content保存到name下
		window.sessionStorage.setItem(name,content)
	},
	//根据传进来的参数删除保存的数据
	removeSession:function(name){
		if(!name){
			return
		}
		return window.sessionStorage.removeItem(name)
	},
	getLocal:function(name){
		if(!name){
			return
		}
		return window.localStorage.getItem(name)
	},
	setLocal:function(name,content){
		if(!name){
			return
		}
		if(content !== 'string'){
			content = JSON.stringify(content)
		}
		window.localStorage.setItem(name,content)
	},
	removeLocal:function(name){
		if(!name){
			return
		}
		return window.localStorage.removeItem(name)
	}
}