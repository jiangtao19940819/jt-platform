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
				<el-input v-model="apiPath" placeholder="请输入关联接口路径" clearable></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="success" @click="getAllSuite">查询</el-button>
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
							<el-button @click="editSuite(scope.row)" type="success" size="small">Edit</el-button>
							<el-button @click="delSuite(scope.row)" type="danger" size="small">Delete</el-button>
						</template>
					</el-table-column>
			    </el-table>
			</div>
		</el-row>
		<el-dialog title="新建用例" :visible.sync="dialogCreateSuite" width="50%"  @close="clearSuiteData" @open="beforeOpenAddDialog">
			<el-form :model="testSuite" label-width="100px">
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
				<el-form-item label="用例描述" prop="suiteDescription">
					<el-input v-model="testSuite.suiteDescription" placeholder="请输入接口路径"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addSteps">添加用例步骤</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="testSuite.suiteSteps">
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="stepName" label="步骤名称"></el-table-column>
				<el-table-column prop="stepOfApi" label="关联接口"></el-table-column>
				<el-table-column>
					<template slot="header" slot-scope="scope">操作</template>
					<template slot-scope="scope">
						<el-button @click="editApi(scope.row)" type="success" size="small">Edit</el-button>
						<el-button @click="delApi(scope.row)" type="danger" size="small">Delete</el-button>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureCreateSuite">确定</el-button>
				<el-button @click="dialogCreateSuite=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="添加用例步骤" :visible.sync="dialogAddStep" @close="clearStepData">
			<el-form :model="step" ref="step" label-width="150px">
				<el-form-item label="步骤名称" :required="true">
					<el-input v-model="step.stepName" placeholder="请输入步骤名称"></el-input>
				</el-form-item>
				<el-form-item label="关联接口" :required="true">
					<el-select v-model="step.stepOfApi" filterable @change="queryApiMethod">
						<el-option v-for="item in apiList"  :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="接口请求方式" :required="true">
					<el-input v-model="step.stepReqMethod" disabled></el-input>
				</el-form-item>
				<el-form-item label="接口请求参数">
					<el-input type="textarea" v-model="step.requestParam"></el-input>
				</el-form-item>
				<el-form-item label="关联参数">
					<el-input v-model="step.relationPram"></el-input>
				</el-form-item>
				<el-form-item label="接口返回表达式" :required="true">
					<el-input v-model="step.relValue" placeholder="请输入接口返回表达式"></el-input>
				</el-form-item>
				<el-form-item label="断言方式" :required="true">
					<el-select v-model="step.assertMethod">
						<el-option v-for="assert in assertList" :value="assert" :label="assert" :key="assert"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="断言数据来源" :required="true">
					<el-select v-model="step.assertSource">
						<el-option v-for="source in sourceList" :value="source" :label="source" :key="source"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="断言数据" :required="true">
					<el-input v-model="step.expectedValue" placeholder="请输入断言数据"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="ensureAddSteps" type="primary">确定</el-button>
				<el-button @click="dialogAddStep=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="编辑用例" :visible.sync="dialogEditSuite" width="50%" @close="clearSuiteData">
			<el-form :model="testSuite" ref="testSuite" label-width="100px">
				<el-form-item label="用例名称" :required="true" prop="suiteName">
					<el-input v-model="testSuite.suiteName" placeholder="请输入接口路径"></el-input>
				</el-form-item>
				<el-form-item label="关联服务" :required="true" prop="suiteOfProject">
					<el-select v-model="testSuite.suiteOfProject" @change="queryApiByProject" disabled>
						<el-option v-for="item in projectList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关联接口" :required="true" >
					<el-select v-model="testSuite.suiteOfApi" filterable>
						<el-option v-for="item in apiList" :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用例描述" prop="suiteDescription">
					<el-input v-model="testSuite.suiteDescription" placeholder="请输入接口路径"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addSteps">添加用例步骤</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="testSuite.suiteSteps">
				<el-table-column type="index"></el-table-column>
				<el-table-column prop="stepName" label="步骤名称"></el-table-column>
				<el-table-column prop="stepOfApi" label="关联接口"></el-table-column>
				<el-table-column prop="stepId" label="用例步骤Id" v-if="false"></el-table-column>
				<el-table-column>
					<template slot="header" slot-scope="scope">操作</template>
					<template slot-scope="scope">
						<el-button @click="editStep(scope.row)" type="success" size="small">Edit</el-button>
						<el-button @click="delStep(scope.row)" type="danger" size="small">Delete</el-button>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureEditSuite">确定</el-button>
				<el-button @click="dialogEditSuite=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="编辑用例步骤" :visible.sync="dialogEditStep">
			<el-form :model="step" ref="step" label-width="150px">
				<el-form-item label="步骤名称" :required="true">
					<el-input v-model="step.stepName" placeholder="请输入步骤名称"></el-input>
				</el-form-item>
				<el-form-item label="关联接口" :required="true">
					<el-select v-model="step.stepOfApi" filterable @change="queryApiMethod">
						<el-option v-for="item in apiList"  :key="item" :value="item" :lable="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="接口请求方式" :required="true">
					<el-input v-model="step.stepReqMethod" disabled></el-input>
				</el-form-item>
				<el-form-item label="接口请求参数">
					<el-input type="textarea" v-model="step.requestParam"></el-input>
				</el-form-item>
				<el-form-item label="关联参数">
					<el-input v-model="step.relationPram"></el-input>
				</el-form-item>
				<el-form-item label="接口返回表达式" :required="true">
					<el-input v-model="step.relValue" placeholder="请输入接口返回表达式"></el-input>
				</el-form-item>
				<el-form-item label="断言方式" :required="true">
					<el-select v-model="step.assertMethod">
						<el-option v-for="assert in assertList" :value="assert" :label="assert" :key="assert"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="断言数据来源" :required="true">
					<el-select v-model="step.assertSource">
						<el-option v-for="source in sourceList" :value="source" :label="source" :key="source"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="断言数据" :required="true">
					<el-input v-model="step.expectedValue" placeholder="请输入断言数据"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click="ensureEditStep" type="primary">确定</el-button>
				<el-button @click="cancelEditStep">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="删除用例" :visible.sync="dialogDeleteSuite">
			<span>请确认是否删除:{{currentSuiteName}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureDeleteSuite">确认</el-button>
				<el-button @click="dialogDeleteSuite=false">取消</el-button>
			</span>
		</el-dialog>
		<el-dialog title="删除用例步骤" :visible.sync="dialogDeleteStep">
			<span>请确认是否删除:{{currentStepName}}</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="ensureDeleteStep">确认</el-button>
				<el-button @click="dialogDeleteStep=false">取消</el-button>
			</span>
		</el-dialog>
	</div>
		
</template>
<script>
	export default {
		name:'case',
		mounted:function(){
			this.getAllProject();
			this.getAllSuite();
		},
		data(){
			return {
				suiteData : [
				],
				projectList:[],
				apiList:[],
				testSuite:{
					suiteId:0,
					suiteName:"",
					apiId:0,
					suiteOfApi:"",
					suiteOfProject:"",
					suiteDescription:"",
					suiteSteps:[

					]
				},
				newTestSuite:{
					suiteId:0,
					suiteName:"",
					apiId:0,
					suiteOfApi:"",
					suiteOfProject:"",
					suiteDescription:"",
					suiteSteps:[

					]
				},
				step:{
					stepId:0,
					stepName:"",
					suiteId:0,
					stepOfApi:"",
					stepReqMethod:"",
					requestParam:"",
					relationPram:"",
				    relValue:"",
					assertMethod:"",
					assertSource:"",
					expectedValue:""
				},
				newStep:{
					stepId:0,
					stepName:"",
					suiteId:0,
					stepOfApi:"",
					stepReqMethod:"",
					requestParam:"",
					relationPram:"",
				    relValue:"",
					assertMethod:"",
					assertSource:"",
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
				dialogEditSuite:false,
				dialogEditStep:false,
				projectName:"",
				dialogCreateSuite:false,
				dialogDeleteSuite:false,
				dialogDeleteStep:false,
				projectList:[],
				currentSuiteId:0,
				currentSuiteName:"",
				currentStepId:0,
				currentStepName:"",
				apiPath:""
			}
		},
		methods:{
			createSuite:function(){
				this.dialogCreateSuite = true;
			},
			ensureCreateSuite:function(){
				
				console.log(this.testSuite);
				this.$http.post("testcase/create",this.testSuite).then(res=>{
					this.response = res;
					
					//this.step = Object.assign({}, this.newStep);
					this.afterOperate();
					this.getAllSuite();
				});
				this.dialogCreateSuite = false;
				//this.suiteData.push(this.testSuite);
			},
			addSteps:function(){
				this.dialogAddStep = true;
			},
			ensureAddSteps:function(){
				console.log(this.step);
				this.testSuite.suiteSteps.push(this.step);
				console.log(this.testSuite);
				//this.step = Object.assign({}, this.newStep);
				this.dialogAddStep = false;
				

			},
			editSuite:function(row){
				this.dialogEditSuite = true;
				this.$http.getUrl("/testcase/queryById?suiteId="+row.suiteId).then(res=>{
					this.testSuite = res.data[0];
					this.currentSuiteId = row.suiteId;
					this.queryApiByProject2();
				});
				
			},
			ensureEditSuite:function(){
				this.dialogEditSuite = false;
				this.$http.post("testcase/edit",this.testSuite).then(res=>{
					this.response = res;
					
					//this.step = Object.assign({}, this.newStep);
					this.afterOperate();
					this.getAllSuite();
				})
				//console.log(this.testSuite);
			},
			editStep:function(row){
				this.dialogEditStep = true;
				this.getStepById(row.stepId);

			},
			ensureEditStep:function(){
				//this.testSuite.suiteSteps[this.index] == this.step;
				//console.log(this.testSuite)
				this.dialogEditStep = false;
			},
			cancelEditStep:function(){
				this.$http.getUrl("/testcase/queryById?suiteId="+this.currentSuiteId).then(res=>{
				this.testSuite = res.data[0];
				this.dialogEditStep = false;
				})
			},
			delSuite:function(row){
				this.currentSuiteId = row.suiteId;
				this.currentSuiteName = row.suiteName;
				this.dialogDeleteSuite = true
			},
			ensureDeleteSuite:function(){
				this.$http.getUrl("testcase/deleteSuite?suiteId="+this.currentSuiteId).then(res=>{
					this.response = res;
					this.afterOperate();
					this.dialogDeleteSuite = false;
					this.getAllSuite();

				});
			},
			delStep:function(row){
				this.currentStepId = row.stepId;
				this.currentStepName = row.stepName;
				this.dialogDeleteStep = true;

			},
			ensureDeleteStep:function(){
				this.$http.getUrl("testcase/deleteStep?stepId="+this.currentStepId).then(res=>{
					this.response = res;
					this.afterOperate();
				});
				this.$http.getUrl("/testcase/queryById?suiteId="+this.currentSuiteId).then(res=>{
					this.testSuite = res.data[0];
					
				});
				this.dialogDeleteStep = false;			
	
			},
		    getStepById:function(stepId){
                for(var i = 0;i<this.testSuite.suiteSteps.length;i++){
                	if(this.testSuite.suiteSteps[i].stepId==stepId){
                		this.step = this.testSuite.suiteSteps[i];
                		this.index = i;
                		break;
                	}
      
                }
		    },
			queryApiByProject:function(){
				this.$http.get("api/queryApiOfProject",{projectName:this.testSuite.suiteOfProject}
					).then(res=>{
					this.response = res;
					this.testSuite.suiteOfApi="";
					this.apiList = res.data;
				})
			},
			queryApiByProject2:function(){
				this.$http.get("api/queryApiOfProject",{projectName:this.testSuite.suiteOfProject}
					).then(res=>{
					this.response = res;
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
			getAllSuite:function(){
				this.$http.get("testcase/query",{projectName:this.projectName,apiPath:this.apiPath}).then(res=>{
					this.suiteData = res.data;
				});
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
			},
			clearStepData:function(){
				//this.$refs['step'].resetFields();
				//this.step.stepName="";
				this.step = Object.assign({}, this.newStep);
			},
			clearSuiteData:function(){
				this.$refs['testSuite'].resetFields();
				this.testSuite.suiteSteps = [];
				//this.testSuite = Object.assign({}, this.newTestSuite);
				//this.step.stepName="";
				
			},
			beforeOpenAddDialog:function(){
				this.testSuite.suiteName = "";
				this.testSuite.suiteOfApi="";
				this.testSuite.suiteOfProject="";
				this.testSuite.suiteDescription="";
				this.testSuite.suiteSteps=[];
				//this.testSuite = Object.assign({}, this.newTestSuite);
				
          		this.clearSuiteData();
   			
				this.getAllProject();
			}
		}
	}
</script>