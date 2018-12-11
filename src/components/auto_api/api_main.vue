<template>
	<div id='api'>
		<el-container class="api-all">
			<el-aside width=150px style="background-color:#409EFF">
				<el-menu text-color="#E8D098" active-text-color="red" background-color="#409EFF" router>
					<el-menu-item index='/api/project'><div class="api-center"><b>模块管理</b></div></el-menu-item>
					<el-menu-item index='2'><div class="api-center"><b>接口管理</b></div></el-menu-item>
					<el-menu-item index='3'><div class="api-center"><b>用例管理</b></div></el-menu-item>
					<el-menu-item index='4'><div class="api-center"><b>用例执行</b></div></el-menu-item>
					<el-menu-item index='5'><div class="api-center"><b>定时任务</b></div></el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
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
	.api-all {
		position:absolute;
		top:0px;
		bottom:0px;
		left:0px;
		right:0px;
		

	}
	.api-center {

		text-align: center;
		letter-spacing:5px;
	}

</style>