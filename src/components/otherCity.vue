<template>
	<div class="otherCity">
			<dl v-for="(item,index) in getList" :key="index">
				<dt>
					{{index}} <span class="tip" v-if="index === 'A'">(按照字母顺序)</span>
				</dt>
				<dd  v-for="(li,index) in item" :key="index" @click="goCity({name:li.name,id:li.id})">
					{{li.name}}
				</dd>
			</dl>
	</div>
</template>

<script>
	export default{
		props:['cityList'],
		data(){
			return {
				
			}
		},
		//计算属性
		computed:{
			//由于返回的数据标题顺序不是A-Z，所以添加一个转换函数
			getList:function(){
				//定义一个新对象
				var myCityList = {};
				//for循环从65开始到90结束,因为ascii码的A字符就是65.Z是90
				for(var i = 65;i<=90;i++){
					//String.fromCharCode()的作用是将ascii码转换成字符。
					//转换后的字符赋值给num
					var num = String.fromCharCode(i);
					//获取到的cityList城市数组按照cityList[A]到cityList[Z]的顺序重新赋值给myCityList对象。
					myCityList[num] = this.cityList[num]
				}
				//返回新对象
				return myCityList
			}
		},
		methods:{
			goCity:function(item){
				this.$router.push({path:'/city/' + item.id})
				this.$store.commit('pickCity',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.otherCity{
		.tip {
			color:#999;
			font-size:.24rem;
		}
	}
	.otherCity dl{
		overflow: hidden;
		margin:.2rem 0;
		border-top:1px solid #e7e7e7;
		background: #fff;
	}
	.otherCity dt{
		line-height:.8rem;
		padding:0 .2rem;
		border-bottom:1px solid #e7e7e7;
	}
	.otherCity dd{
		box-sizing: border-box;
		color:#666;
		font-size:.28rem;
		width:25%;
		float:left;
		text-align: center;
		line-height:.72rem;
		border-bottom:1px solid #e7e7e7;
		border-right:1px solid #e7e7e7;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space:nowrap
	}
	.otherCity dd:nth-child(4n+1){
		border-right:none
	}
</style>
