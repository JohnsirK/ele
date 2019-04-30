<template>
  <div class="hotCity">
    <dl>
		<dt>
			热门城市
		</dt>
		<dd @click="goCity({name:item.name,id:item.id})" v-for="(item,index) in hotCity" :key="index">
			
				{{item.name}}
		</dd>
	</dl>
  </div>
</template>

<script>
export default {
	props:['hotCity'],
    data () {
		return {
		  
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hotCity{
	margin:.2rem 0;
	border-top:1px solid #e7e7e7;
	background: #fff;
}
.hotCity dl{
	overflow: hidden;
}
.hotCity dt{
	line-height:.8rem;
	padding:0 .2rem;
	border-bottom:1px solid #e7e7e7;
}
.hotCity dd{
	box-sizing: border-box;
	color:#3190e8;
	font-size:.28rem;
	width:25%;
	float:left;
	text-align: center;
	line-height:.72rem;
	border-bottom:1px solid #e7e7e7;
	border-right:1px solid #e7e7e7;
}
.hotCity dd:nth-child(4n+1){
	border-right:none
}
</style>
