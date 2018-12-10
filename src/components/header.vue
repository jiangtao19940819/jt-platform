<template>
	<div id="header">
		<div>
			<img src="../assets/sogou.jpg"  style="float:left;" height="60px" width="150px" />
		</div>
		<el-menu id="menu" :default-active="$route.path"  mode="horizontal" text-color="#E8D098" active-text-color="red" background-color="#409EFF"  style="margin-left:150px;" router>
			<el-menu-item index="/api" class="item" style="margin-left:25%;"><b>JT接口测试</b></el-menu-item>
			<el-menu-item index="2" class="item"><b>JTUI测试</b></el-menu-item>
			<el-menu-item index="3" class="item"><b>CRM测试工具</b></el-menu-item>
			<el-menu-item index="4" class="item"><b>使用文档</b></el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name : "header",
		data(){
			activeIndex : "2"
		}
	}
</script>

<style>
	
</style>