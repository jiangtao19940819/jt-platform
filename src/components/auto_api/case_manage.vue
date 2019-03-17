<template>
	<div id="api">
		<el-row>
			<el-button type="success" round @click="createSuite">新增用例</el-button>
		</el-row>
		
		<el-row style="height:40px;margin:40px" >
			<el-col :span="8">所属服务：
				<el-select v-model="projectName" placeholder="请输入项目名">
					<el-option v-for="item in projectList" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</el-col>
			<el-col :span="8">
				<el-input v-model="apiPath" placeholer="请输入接口路径" clearable></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="success" @click="queryApi()">查询</el-button>
			</el-col>
		</el-row>
		<el-row>
			<div id="tableData">
				<el-table :data="suiteData" border>
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="suiteName" label="用例名称"></el-table-column>
					<el-table-column prop="suiteId" label="用例Id" ></el-table-column>
					<el-table-column prop="suiteOfApi" label="关联接口"></el-table-column>
					<el-table-column prop="suiteOfProject" label="关联服务" ></el-table-column>
					<el-table-column prop="suiteDescription" label="用例描述" ></el-table-column>
					<el-table-column>
						<template slot="header" slot-scope="scope">操作</template>
						<template slot-scope="scope">
							<el-button @click="editApi(scope.row)" type="success" size="small">Edit</el-button>
							<el-button @click="delApi(scope.row)" type="danger" size="small">Delete</el-button>
						</template>
					</el-table-column>
			    </el-table>
			</div>
		</el-row>
		<el-dialog title="新建用例" :visible.sync="dialogCreateSuite" width="700px" @open="openCreateDialog()" @close="queryApi()">
			<el-form :model="testSuite" label-width="100px" :rules="rules">
				<el-form-item label="用例名称" :required="true">
					<el-input v-model="testSuite.suiteName" placeholder="请输入接口路径"></el-input>
				</el-form-item>
				<el-form-item label="关联服务" :required="true">
					<el-select v-model="testSuite.suiteOfProject">
						<el-option v-for="item in projectList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关联接口" :required="true">
					<el-select v-model="testSuite.suiteOfApi">
						<el-option v-for="item in projectList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用例描述">
					<el-input v-model="testSuite.suiteDescription" placeholder="请输入接口路径"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addSteps">添加用例步骤</el-button>
				</el-form-item>
				<el-table :data="testSuite.suiteSteps">
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="stepName" label="步骤名称"></el-table-column>
					<el-table-column prop="stepOfApi" label="管理接口"></el-table-column>
					<el-table-column>
						<template slot="header" slot-scope="scope">操作</template>
						<template slot-scope="scope">
							<el-button @click="editApi(scope.row)" type="success" size="small">Edit</el-button>
							<el-button @click="delApi(scope.row)" type="danger" size="small">Delete</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureCreateSuite">确定</el-button>
				<el-button @click="dialogCreateSuite=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="添加用例步骤" :visible.sync="dialogAddStep">
			<el-form :model="step" label-width="100px">
				<el-form-item label="步骤名称" :required="true">
					<el-input v-model="step.stepName" placeholder="请输入步骤名称"></el-input>
				</el-form-item>
				<el-form-item label="关联接口">
					<el-select v-model="step.stepOfApi">
						<el-option v-for="item in projectList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="接口请求方式">
					<el-input v-model="step.stepReqMethod"></el-input>
				</el-form-item>
				<el-form-item label="接口请求参数">
					<el-input type="textarea" v-model="step.requestParam"></el-input>
				</el-form-item>
				<el-form-item label="关联参数">
					<el-input v-model="step.relationPram"></el-input>
				</el-form-item>
				<el-form-item label="断言">
					<el-button>点击添加断言</el-button>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="ensureAddSteps">确定</el-button>
				<el-button @click="dialogAddStep=false">取消</el-button>
			</span>
		</el-dialog>
	</div>
		
</template>
<script>
	export default {
		name:'case',
		mounted:function(){
			this.getAllProject();
			this.queryApi();
		},
		data(){
			return {
				suiteData : [
					{   
						suiteId:1,
						suiteName:"创建PPT",
						suiteOfApi:"createPpt",
						suiteOfProject:"crmdata",
						suiteDescription:"创建PPT"
					}
				],
				projectList:[],
				testSuite:{
					suiteId:0,
					suiteName:"",
					suiteOfApi:"",
					suiteOfProject:"",
					suiteDescription:"",
					suiteSteps:[
						
					]
				},
				step:{
					stepName:"",
					stepOfApi:"",
					stepReqMethod:"",
					requestParam:"",
					relationPram:"",
					stepAssert:{
						relValue:"",
						assertMethod:"",
						expectedSource:"",
						expectedValue:""
					}
					
				},
				response:{
					result:"",
					msg:"",
					data:[]
				},
				rules:{
					suiteName:[{required:true,message:"用例名称必须填写"}]
				},
				dialogAddStep:false,
				projectName:"",
				dialogCreateSuite:false,
				projectList:[],
				apiPath:""
			}
		},
		methods:{
			createSuite:function(){
				this.dialogCreateSuite = true;
			},
			ensureCreateSuite:function(){
				this.dialogCreateSuite = false;
				this.suiteData.push(this.testSuite);
			},
			addSteps:function(){
				this.dialogAddStep = true;
			},
			ensureAddSteps:function(){
				this.dialogAddStep = false;
				this.testSuite.suiteSteps.push(this.step);
			},
			openCreateDialog:function(){
				this.api.apiPath = "";
				this.api.apiDescription = "";
				this.getAllProject();
			},
			ensureCreateApi:function(){
				this.$http.post("api/create",this.api).then(res=>{
					this.response = res;
					this.afterOperate();
					this.dialogCreateApi=false;
					
				});
			},
			editApi:function(row){
				this.dialogEditApi=true,
				this.api.apiId=row.apiId,
				this.api.apiPath=row.apiPath,
				this.api.apiDescription=row.apiDescription,
				this.api.apiProtocol=row.apiProtocol,
				this.api.apiReqMethod=row.apiReqMethod,
				this.api.apiOfProject=row.apiOfProject
			},
			ensureEditApi:function(){
				this.$http.post("api/edit",this.api).then(res=>{
					this.response = res;
					this.afterOperate();
					this.dialogEditApi = false;
				})
                
			},
			delApi:function(row){
				this.dialogDelApi = true;
				this.api.apiId=row.apiId;
				this.api.apiPath=row.apiPath;
				
			},
			ensureDelApi:function(){
				this.$http.get("api/del",{apiId:this.api.apiId}
					).then(res=>{
					this.response = res;
					this.dialogDelApi=false;
					this.afterOperate();
				})
			},
			queryApi:function(){
				this.$http.get("api/query",{projectName:this.projectName,apiPath:this.apiPath}
					).then(res=>{
					this.response = res;
					this.apiData = res.data;
					console.log(this.apiData)
					console.log(this.apiData)
					console.log(this.apiData)
				})
			},
			getAllProject:function(){
				this.$http.getUrl("project/getAll").then(res=>{
					this.projectList = res.data;
					if(this.projectList.length>0){
						this.testSuite.suiteOfProject = this.projectList[0];
					}
				});
			},
			afterOperate(){
				if(this.response.result=="200"){
					this.$message.success(this.response.msg)
				}else{
					this.$message.error(this.response.msg)
				}
			}
		}
	}
</script>