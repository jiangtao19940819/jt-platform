<template>
	<div id="main">
		<el-container class="container-position">
			<el-header class="cram">
				<v-header></v-header>
			</el-header>
			<el-main class="bd">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import header from '@/components/header.vue'
	export default {
		name : "main",
		data(){
		},
		components : {
			"v-header" : header
		}
	}
</script>

<style>
	.bd {
		border:2px red solid;
	}
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
</style>