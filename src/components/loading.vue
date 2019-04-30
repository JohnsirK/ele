<template>
	<!-- loading图 -->
	<div class="tc-ct" v-if="isShow">
		<mt-spinner :type="3" color="#3190e8"></mt-spinner>
	</div>
</template>

<script>
	export default{
		props:['isShow']
	}
</script>

<style>
	.tc-ct {
		text-align: center;
		display: flex;
		margin:10px 0;
		justify-content:center;
	}
</style>
