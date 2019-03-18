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
				<el-button type="success" @click="">查询</el-button>
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
		<el-dialog title="新建用例" :visible.sync="dialogCreateSuite" width="700px" @open="getAllProject">
			<el-form :model="testSuite" label-width="100px" :rules="rules">
				<el-form-item label="用例名称" :required="true">
					<el-input v-model="testSuite.suiteName" placeholder="请输入接口路径"></el-input>
				</el-form-item>
				<el-form-item label="关联服务" :required="true">
					<el-select v-model="testSuite.suiteOfProject" @change="queryApiByProject">
						<el-option v-for="item in projectList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关联接口" :required="true">
					<el-select v-model="testSuite.suiteOfApi" filterable>
						<el-option v-for="item in apiList" :key="item" :value="item" :lable="item"></el-option>
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
			<el-form :model="step" label-width="120px">
				<el-form-item label="步骤名称" :required="true">
					<el-input v-model="step.stepName" placeholder="请输入步骤名称"></el-input>
				</el-form-item>
				<el-form-item label="关联接口">
					<el-select v-model="step.stepOfApi" filterable @change="queryApiMethod">
						<el-option v-for="item in apiList"  :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="接口请求方式">
					<el-input v-model="step.stepReqMethod" disabled></el-input>
				</el-form-item>
				<el-form-item label="接口请求参数">
					<el-input type="textarea" v-model="step.requestParam"></el-input>
				</el-form-item>
				<el-form-item label="关联参数">
					<el-input v-model="step.relationPram"></el-input>
				</el-form-item>
				<el-form-item label="返回断言表达式">
					<el-input v-model="step.relValue" placeholder="请输入接口断言表达式"></el-input>
				</el-form-item>
				<el-form-item label="断言方式">
					<el-select v-model="step.assertMethod">
						<el-option v-for="assert in assertList" :value="assert" :label="assert" :key="assert"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="断言数据来源">
					<el-select v-model="step.expectedSource">
						<el-option v-for="source in sourceList" :value="source" :label="source" :key="source"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="断言数据">
					<el-input v-model="step.expectedValue" placeholder="请输入断言数据"></el-input>
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
				apiList:[],
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
				    relValue:"",
					assertMethod:"",
					expectedSource:"",
					expectedValue:""
				},
				response:{
					result:"",
					msg:"",
					data:[]
				},
				assertList:["等于","不等于"],
				sourceList:["固定值","变量","数据库1"],
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
			
			ensureCreateApi:function(){
				this.$http.post("api/create",this.api).then(res=>{
					this.response = res;
					this.afterOperate();
					this.dialogCreateApi=false;
					
				});
			},
			queryApiByProject:function(){
				this.$http.get("api/queryApiOfProject",{projectName:this.testSuite.suiteOfProject}
					).then(res=>{
					this.response = res;
					this.testSuite.suiteOfApi="";
					this.apiList = res.data;
				})
			},
			queryApiMethod:function(){
				this.$http.get("api/queryApiMethod",{apiName:this.step.stepOfApi}
					).then(res=>{
					this.response = res;
					this.step.stepReqMethod = this.response.data[0];
				})
			},
			getAllProject:function(){
				this.$http.getUrl("project/getAll").then(res=>{
					this.projectList = res.data;
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