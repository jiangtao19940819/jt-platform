<template>
	<div id='api'>
		<el-container class="cram">
			<el-aside class="bd">
				<el-menu>
					<el-menu-item><b>模块管理</b></el-menu-item>
					<el-menu-item><b>接口管理</b></el-menu-item>
					<el-menu-item><b>用例管理</b></el-menu-item>
					<el-menu-item><b>用例执行</b></el-menu-item>
				</el-menu>
			</el-aside>
			<el-main></el-main>
		</el-container>
		
			
			
	</div>
</template>

<script>
	export default {
		name : 'api',
		data(){
			return {

			}
		}
	}
</script>
<style>
	.bd {
		border:1px red solid;
		padding-top: 0px;
		padding-left: 0px;
		padding-bottom: 0px;

	}

	.cram {
		position:absolute;
		left:0px;
		top:60px;
		height:100%;
		width:100%;
	
	}
</style>