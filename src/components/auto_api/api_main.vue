<template>
	<div id='api'>
		<el-container class="api-all">
			<el-aside width=150px style="background-color:#409EFF">
				<el-menu text-color="#E8D098" active-text-color="red" background-color="#409EFF" default-active='/api/project' router>
					<el-menu-item index='/api/project'> 
						<i class="el-icon-location"></i>
						<span slot="title"><b>模块管理</b></span>
					</el-menu-item>
					<el-menu-item index='2'>
						<i class="el-icon-menu"></i>
						<span slot="title"><b>接口管理</b></span>
					</el-menu-item>
					<el-menu-item index='3'>
						<i class="el-icon-info

						"></i>
						<span slot="title"><b>计划管理</b></span>
					</el-menu-item>
					<el-menu-item index='4'>
						<i class="el-icon-setting"></i>
						<span slot="title"><b>用例执行</b></span>
					</el-menu-item>
					<el-menu-item index='5'>
						<i class="el-icon-time"></i>
						<span slot="title"><b>定时任务</b></span>
					</el-menu-item>
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