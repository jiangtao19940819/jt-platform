<template>
	<div id="project">
		<el-table :data="projectData.filter(data=>data.name.includes(search))" stripe border>
			<el-table-column type="index">
			
			</el-table-column>
			<el-table-column prop="name" label="模块名">
			</el-table-column>
			<el-table-column prop="time" label="创建时间">
				
			</el-table-column>
			<el-table-column prop="description" label="描述">
				
			</el-table-column>
			<el-table-column>
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" placeholder="请输入项目名" />
				</template>
				<template slot-scope="scope">
					<el-button @click="editProject(scope.row)" type="success">Edit</el-button>
					<el-button @click="delProject" type="danger">Delete</el-button>
				</template>
			</el-table-column>
			
		</el-table>
	</div>
</template>
<script>
	export default {
		name:'project',
		data(){
			return {
				projectData: [{
						name: 'yunguan',
						time: '2018-01-08',
						description: '运管系统'
       				},{
       					name: 'bo',
						time: '2018-02-08',
						description: '代理商系统'
       				},{
       					name: 'kabo',
						time: '2018-05-08',
						description: 'KA代理商系统'
       				},{
       					name: 'crmdata',
						time: '2018-05-08',
						description: '数据组接口'
       				},{
						name: 'yunguan',
						time: '2018-01-08',
						description: '运管系统'
       				},{
       					name: 'bo',
						time: '2018-02-08',
						description: '代理商系统'
       				},{
       					name: 'kabo',
						time: '2018-05-08',
						description: 'KA代理商系统'
       				},{
       					name: 'crmdata',
						time: '2018-05-08',
						description: '数据组接口'
       				}
				],
				search:""
				}
			},
			methods: {
				editProject(row){
					alert(row);
				}
			}
		}
</script>