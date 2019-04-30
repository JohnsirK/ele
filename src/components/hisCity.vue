<template>
	<div class="serachCity">
		<ul>
			<li v-for="(item,index) in hisListCity" :key="index" @click="linkMiste(item)">
				<router-link :to="{path:'/miste',query:{geohash:item.geohash}}" >
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
	import {mapActions,mapMutations} from 'vuex'
	export default{
		props:['hisListCity'],
		data(){
			return {  
				
			}
		},
		computed:{
			
		},
		methods:{
			...mapActions(['pickAddress']),
			 linkMiste(item){
				 this.pickAddress(item)
			 }
		},
		mounted(){
			
		},
		
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
