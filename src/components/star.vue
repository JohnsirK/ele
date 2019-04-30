<template>
	<div class="xxbox">
		
		<!-- <span v-for="(itemxx,index) in 5" class="xxspan1" :key="index">
			<icon v-if="index + 1 <= dataJson.rating" name="star1" class="xx"></icon>
			<icon v-if="index + 1 > dataJson.rating" name="star2" class="xx"></icon>
			<span v-if="dataJson.rating - (index) > 0 && dataJson.rating - (index) < 1" class="xxspan2 w5">
				<icon name="star1" class="xx"></icon>
			</span>
		</span> -->
		<span v-for="(itemxx,index) in 5" class="xxspan1" :key="index">
			<icon v-if="index+1 <= dataJson" name="star1" class="xx"></icon>
			<icon v-if="index+1 > dataJson" name="star2" class="xx"></icon>
			<span v-if="dataJson - (index) > 0 && dataJson - (index) < 1" :class="xxclass + (dataJson * 10 - index * 10)">
				<icon name="star1" class="xx"></icon>
			</span>
		</span>
	</div>
</template>

<script>
	export default{
		props:['dataJson'],
		data(){
			return {
				xxclass:"xxspan2 w"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.xx{
		width:.36rem;
		height:.36rem;
	}
	.xxbox{ 
		display: flex;   
	}
	.xxbox>span{
		   
		display: flex;
		align-items: center;
		justify-content: center;
		
	} 
	.xxspan1{
		position:relative;
		 
		display: inline-block;
	}
	.xxspan2{
		display: inline-block;
		position: absolute;
		left:0;
		top:0;
		overflow: hidden;
	}
	.w1{
		width:10%;
	}
	.w2{
		width:20%;
	}
	.w3{
		width:30%;
	}
	.w4{
		width:40%;
	}
	.w5{
		width:50%;
	}
	.w6{
		width:60%;
	}
	.w7{
		width:70%;
	}
	.w8{
		width:80%;
	}
	.w9{
		width:90%;
	}
</style>
