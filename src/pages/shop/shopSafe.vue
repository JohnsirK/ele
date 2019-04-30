<template>
	<div class="shopSafe">
		<mt-header fixed title="食品监督安全公示">
			<mt-button icon="back" slot='left' @click.native ="goBack()">返回</mt-button>
		</mt-header>
		<!-- 食品安全公式 -->
		<div class="huod-shux">
			<h4 class="title">
				食品监督安全公示
			</h4>
			<div class="smileCon">
				<span>
					<img src="../../../static/img/164ad0b6a3917599.jpg" alt="">
				</span>
				<div class="txt">
					<p>监督检查结果：<font class="ft_green">良好</font></p>
					<p>检查日期：<font>良好</font></p>
				</div>
			</div>
		</div>
		<div class="huod-shux">
			<dl>
				<dt>
					工商登记信息
				</dt>
			</dl>
			<dd>
				企业名称
			</dd>
			<dd>
				工商执照注册号
			</dd>
			<dd>
				注册资本
			</dd>
			<dd>
				注册地址
			</dd>
			<dd>
				属地监管所
			</dd>
			<dd>
				法定代表人
			</dd>
			<dd>
				经营范围
			</dd>
		</div>
		<div class="huod-shux">
			<dl>
				<dt>
					餐饮许可证
				</dt>
			</dl>
			<dd>
				营业范围
			</dd>
			<dd>
				许可证有效期
			</dd>
			<dd>
				许可证号
			</dd>
			<dd>
				发证时间
			</dd>
			<dd>
				发证机关
			</dd>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {}
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shopSafe{
		position:fixed;
		top:0;
		overflow-y: auto;
		left:0;
		height:100%;
		width:100%;
		background: #efefef;
		z-index: 15;
		padding:.8rem 0 0 0;
		box-sizing:border-box;
		h4.title{
			font-weight: normal;
			color:#333;
			
			a{
				color:#333;
				display: flex;
			}
			font{
				margin-left:auto;
				font-size:.24rem;
				color:#999;
				display: flex;
				align-items: center;
			}
		}
		.smileCon {
			margin:.2rem 0;
			display: flex;
			align-items: center;
			span{
				width:1rem;
				height:1rem;
			}
			.txt{
				margin-left:.1rem;
				font-size:.24rem;
				color:#999;
				 
			}
		}
	}
</style>
