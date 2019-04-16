<template>
	<div id="api">
		<el-row>
			<el-button type="success" round @click="createSuite">新增计划</el-button>
		</el-row>
		
		<el-row style="height:40px;margin:40px" >
			<el-col :span="8">所属服务：
				<el-select v-model="projectName" placeholder="请输入项目名">
					<el-option v-for="item in projectList" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</el-col>
			<el-col :span="8">
				<el-input v-model="planName" placeholder="请输入计划名称" clearable></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="success" @click="getAllPlan">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<div id="tableData">
				<el-table :data="planData" border>
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="planId" label="计划ID" v-if=false></el-table-column>
					<el-table-column prop="planName" label="计划名称"></el-table-column>
					<el-table-column prop="projectName" label="关联服务" ></el-table-column>
					<el-table-column prop="baseUrl" label="请求网址"></el-table-column>
					<el-table-column prop="userName" label="登录用户名" ></el-table-column>
					<el-table-column prop="passWord" label="登录密码" ></el-table-column>
					<el-table-column>
						<template slot="header" slot-scope="scope">操作</template>
						<template slot-scope="scope">
							<el-button @click="editSuite(scope.row)" type="success" size="small">Edit</el-button>
							<el-button @click="delSuite(scope.row)" type="danger" size="small">Delete</el-button>
						</template>
					</el-table-column>
			    </el-table>
			</div>
		</el-row>
	
	</div>
		
</template>
<script>
	export default {
		name:'case',
		mounted:function(){
			this.getAllProject();
			this.getAllPlan();
		},
		data(){
			return {
				projectList:[],
				projectName:"",
				planName:"",
				planData : [
				]
			}
		},
		methods:{
			getAllProject:function(){
				this.$http.getUrl("project/getAll").then(res=>{
					this.projectList = res.data;
				});
			},
			getAllPlan:function(){
				this.$http.get("plan/queryPlan",{projectName:this.projectName,planName:this.planName}).then(res=>{
					this.planData = res.data;
				});
			}
			
		}
	}
</script>