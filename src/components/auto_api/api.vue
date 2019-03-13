<template>
	<div id="api">
		<el-row>
			<el-button type="success" round @click="createProject">新增接口</el-button>
		</el-row>
		
		<el-row style="height:40px;margin:40px" >
			<el-col span=8>所属服务：
				<el-select v-model="projectName" placeholder="请输入项目名">
					<el-option v-for="item in projectList" :key="item.value" :label="item.label" 
					:value="item.value"></el-option>
				</el-select>
			</el-col>
			<el-col span=8>
				<el-input placeholer="请输入接口路径"></el-input>
			</el-col>
			<el-col span=4>
				<el-button type="success">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<div id="tableData">
				<el-table :data="apiData">
					<el-table-column type="index">
					
					</el-table-column>
					<el-table-column prop="apiPath" label="接口路径">
					</el-table-column>
					<el-table-column prop="apiDescription" label="接口描述">
						
					</el-table-column>
					<el-table-column prop="apiProtocol" label="接口协议">
						
					</el-table-column>
					<el-table-column prop="apiReqMethod" label="请求方式">
						
					</el-table-column>
					<el-table-column prop="apiOfProject" label="所属服务">
						
					</el-table-column>
					<el-table-column>
						<template slot="header" slot-scope="scope">操作</template>
						<template slot-scope="scope">
							<el-button @click="editProject(scope.row)" type="success">Edit</el-button>
							<el-button @click="deleteProject(scope.row)" type="danger">Delete</el-button>
						</template>
					</el-table-column>
			    </el-table>
			</div>
		</el-row>
	</div>
		
</template>
<script>
	export default {
		name:'api',
		data(){
			return {
				apiData : [
					{
						apiPath:"createProject",
						apiDescription:"创建PPT",
						apiProtocol:"http",
						apiReqMethod:"POSTJSON",
						apiOfProject:"crmdata"
					}
				],
				projectList:[
					{value:"crmdata",label:"crmdata"},
					{value:"bo",label:"bo"}
				],
				projectName:""
			}
		}
	}
</script>