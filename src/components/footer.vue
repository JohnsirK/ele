<template>
	<div class="allFooter">
		<ul>
			<li @click="goHref({path:'/miste',query:{'geohash':$route.query.geohash}})" :class="{'active' : $route.path.indexOf('miste') !== -1}">
				<i class="iconfont icon-home"></i>
				<font>外卖</font>
			</li>
			<li @click="goHref({path:'/search',query:{'geohash':$route.query.geohash}})" :class="{'active' : $route.path.indexOf('search') !== -1}">
				<i class="iconfont icon-search"></i>
				<font>搜索</font>
			</li>
			<li @click="goHref({path:'/order'})" :class="{'active' : $route.path.indexOf('order') !== -1}">
				<i class="iconfont icon-detail"></i>
				<font>订单</font>
			</li>
			<li @click="goHref({path:'/about'})" :class="{'active' : $route.path.indexOf('about') !== -1}">
				<i class="iconfont icon-user"></i>
				<font>我的</font>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				 
			}
		},
		computed:{
			
		},
		methods:{
			goHref(url){
				this.$router.push(url)
			}
		},
		watch:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.allFooter{
		border-top:1px solid #e7e7e7;
		box-shadow: 0 2px 10px rgba(0,0,0,.2);
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		height:1rem;
		background:#fafafa;
		ul{
			display: flex;
			overflow: hidden;
			height:100%;
			li{
				flex:1;
				height:100%;
				height:100%;
				display:flex;
				align-items:center;
				justify-content: center;
				flex-direction: column;
				color:#333;
				i{
					font-size:.44rem;
				}
				font {
					font-size: .24rem;
					margin-top:-0.16rem;
				}
			}
			li.active{
				background: #f3efef;
				font,i{
					color:#1865e4
				}
			}
		}
	}
</style>
