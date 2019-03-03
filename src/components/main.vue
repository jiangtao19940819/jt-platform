<template>
	<div id="jt-main">
		<el-container class="container-position">
			<el-header class="cram">
				<v-header></v-header>
			</el-header>
			<el-main>
				<div class="all">
					<router-view></router-view>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import header from '@/components/header.vue'
	export default {
		name : "jt-main",
		data(){
			return {
				
			}
		},
		components : {
			"v-header" : header
		}
	}
</script>

<style>
	.container-position {
		position : absolute;
		top : 0;
		left : 0;
		width: 100%;
		height : 100%;
	}
	.cram {
		margin:0px;
		padding:0px;
	}

	.all {
		position:absolute;
		top:60px;
		left:0px;
		right:0px;
		bottom:0px
	}
</style>