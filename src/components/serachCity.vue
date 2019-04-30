<template>
	<div class="serachCity">
		<ul>
			<li v-for="(item,index) in sechCity" :key="index" @click="addPush(item)">
				<router-link to="/miste">
					<h4>
						{{item.name}}
					</h4>
					<p>
						{{item.address}} 
					</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import localsession from '@/utils/localsession'
	export default{
		props:['sechCity'],
		data(){
			return {
				
			}
		},
		computed:{
			
		},
		methods:{
			addPush(item){
				let arr = [];
				if(localsession.getSession('hisList')){
					arr = JSON.parse(localsession.getSession('hisList'))
					//判断当前点击的和历史记录保存的时候有相等
					for(var i = 0;i<arr.length;i++){
						if(arr[i].geohash === item.geohash){
							var isok = true
						}
					}
					//这里之所以用isok中间变量是因为用了unshift的话循环总是获取的第一个新数据，就会出现死循环
					if(!isok){
						arr.unshift(item)
					}
				}else{
					arr.unshift(item)
				}
				localsession.setSession('hisList',arr)
				this.$store.dispatch('pickAddress',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.serachCity{
		overflow: hidden;
		ul{
			border-top:1px solid #e7e7e7;
			li{
				background: #fff;
				padding:.3rem;
				border-bottom:1px solid #e7e7e7;
				h4{
					font-weight: normal;
					color:#333
				}
				p{
					font-size:.24rem;
					color:#999;
					margin-top:.1rem;
				}
			}
		}
	}
</style>
