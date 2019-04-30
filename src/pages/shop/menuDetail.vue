<template>
	<div class="shopDetail">
		<mt-header fixed :title="name">
			<mt-button icon="back" slot='left' @click.native ="goBack()">返回</mt-button>
		</mt-header>
		<div class="imgInfo">
			<img :src="'http://cangdu.org:8001/img/' + image_path" alt="">
			<p class="title">
				{{description}}
			</p>
		</div>
		<div class="infoall">
			<p style="font-size:.32rem;color:#333;">
				名称：{{name}}
			</p>
			<div class='rating'>
				评分: <font><star :dataJson="rating"></star></font> {{rating}}
			</div>
			<p>
				月售{{month_sales}}单	<span class="color4">售价 ￥20起</span>
			</p>
			<p>
				评论数 {{rating_count}} 好评率{{satisfy_rate}}%
			</p>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star'
	export default{
		components:{
			star
		},
		data(){
			return {
				name:null,
				image_path:null,
				description:null,
				month_sales:null,
				rating:null,
				rating_count:null,
				satisfy_rate:null
			}
		},
		created(){
			this.name = this.$route.query.name
			this.image_path = this.$route.query.image_path
			this.description = this.$route.query.description
			this.month_sales = this.$route.query.month_sales
			this.rating = this.$route.query.rating
			this.rating_count = this.$route.query.rating_count
			this.satisfy_rate = this.$route.query.satisfy_rate
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopDetail{
		 position:fixed;
		 top:0;
		 overflow-y: auto;
		 left:0;
		 height:100%;
		 width:100%;
		 background: #efefef;
		 z-index: 12;
		 padding:.8rem 0 0 0;
		 box-sizing:border-box;
		 .imgInfo{
			 background: #fff;
			 margin-bottom:.2rem;
			 padding-bottom: .2rem;
			 .title {
				 color:#333;
				 font-size:.28rem;
				 line-height:.48rem;
				 padding:0 .2rem;
			 }
			 img{
				 width:100%;
				 display: block
			 }
		 }
		 .infoall {
			 background: #fff;
			 padding:.2rem;
			 .rating{
				 display: flex;
				 align-items: center;
				 color:#666;
				 font-size:.28rem;
				 line-height:.6rem;
			 }
			 p{
				 color:#666;
				 font-size:.28rem;
				 line-height:.6rem;
			 }
		 }
	}
</style>
