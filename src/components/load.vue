<template>
	<div class="loadDialog">
		<div id="eleLoading">
			<div class="imgbox">
				<div class="img"></div>
			</div>
			<div class="loadfoot">
				<span class="footspan">
					
				</span>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loadDialog {
		width:100%;
		height:100%;
		background: rgba(255,255,255,.7);
		position: fixed;
		top:0;
		left:0;
	}
	#eleLoading{
		width:1rem;
		height:2.6rem;
		position: fixed;
		top:50%;
		left:50%;
		margin-top:-1.3rem;
		margin-left:-0.5rem;
		z-index: 100;
		.imgbox{
			width:1rem;
			height:1rem;
			animation:myfirst .8s infinite;
			.img{
				height:100%;
				width:100%;
				background: url('../assets/1045647646-59b5e8b17c41a_articlex.png') no-repeat;
				background-size:100%;
				animation: myf 5.6s infinite;
			}
		}
		.loadfoot{
			height:.4rem;
			position: absolute;
			bottom:0;
			width:100%;
			text-align: center;
			.footspan{
				display: inline-block;
				height:.2rem;
				width:.4rem;
				margin:.1rem 0;
				border-radius: 50%;
				animation:foot .8s infinite;
				background: radial-gradient(#7e7e7e,#ededed);
			}
		}
	}
	@keyframes myfirst{
		0% {
			margin-top:0
		}
		50%{
			margin-top:1rem;
		}
		100%{
			margin-top:0
		}
	}
	@keyframes myf{
		0% {background-position:0% 0%;}
        14.2% {background-position:0% 0%;}
        14.2001% {background-position:0% 16%;}
        28.4% {background-position:0% 16%;}
        28.4001% {background-position:0% 33%;}
        42.6% {background-position:0% 33%;}
        42.6001% {background-position:0% 50%;}
        56.8% {background-position:0% 50%;}
        56.8001% {background-position:0% 67%;}
        71% {background-position:0% 67%;}
        71.0001% {background-position:0% 84%;}
        85.2% {background-position:0% 84%;}
        85.2001% {background-position:0% 100%;}
        100% {background-position:0% 100%;}
	}
	@keyframes foot{
		0%{
			width:.4rem;
		}
		50%{
			width:100%
		}
		100%{
			width:.4rem
		}
	}
</style>
