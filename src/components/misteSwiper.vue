<template>
	<mt-swipe :auto="0">
		<mt-swipe-item class="myItem" v-for="(item,index) in dataJson" :key="index">
			<ul class="menuItem">
				<li v-for="(li,index) in item" :key="index">
					<router-link :to='{path:"/foods",query:{title:li.title}}'>
						<span>
							<img :src="imgBaseUrl + li.image_url" :alt="li.title">
						</span>
						<p>
							{{li.title}}
						</p>
					</router-link>
				</li>
			</ul>
		</mt-swipe-item>
	</mt-swipe>
</template>

<script>
	export default{
		props:['dataJson'],
		data(){
			return {
				//图片路径
				imgBaseUrl:'https://fuss10.elemecdn.com'
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.mint-swipe{
		height: 3.4rem;
		background: #fff;
		box-sizing: border-box;
		padding:.2rem;
		border-bottom: 1px solid #e7e7e7;
		.mint-swipe-indicator{
			background: #999999;
			opacity: 1;
		}
		.mint-swipe-indicator.is-active{
			background: #1e71fa;
		}
		.menuItem {
			overflow: hidden;
			li{
				width:25%;
				float:left;
				text-align: center; 
				 
				p{
					color:#999;
					font-size:.28rem;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					line-height:.48rem
				}
				span{
					width:100%;
					display: block;
					img{
						width:46%
					}
				}
			}
		}
	}
	
</style>
