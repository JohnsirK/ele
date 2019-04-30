<template>
  <div id="app">
		<transition name="left">
			<router-view/>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
#app{
	height:100%;
}
</style>
