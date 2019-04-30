<template>
	<div class="globel-main">
		<all-header>
			<span slot="headerTitle">
				{{this.$route.query.title}}
			</span>
		</all-header>
		<div class="main-content">
			<keep-alive>
				<foods-list></foods-list>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import allHeader from '@/components/globel/header'
	import foodsList from '@/components/nearbyShops'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			allHeader,
			foodsList
		}
	}
</script>

<style lang="scss" scoped>
	.main-content{
		.nearbyShops {
			h4{
				display:none
			}
		}
	}
</style>
