<template>
  <div style="padding: 20px;">
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline" size="small" :model="searchForm" ref="searchForm">
        <el-form-item label="当前任务" prop="title" style="margin-bottom: 0px">
          <el-select placeholder="全部任务" v-model="searchForm.task" @change="changeTask">
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="推广码" prop="category" style="margin-bottom: 0px">
          <el-select placeholder="全部渠道" v-model="searchForm.category">
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-left: 30px; margin-bottom: 0px">
          <el-button type="primary" @click="clickSearch">筛选</el-button>
          <el-button @click="resetSearchForm('searchForm')">重置</el-button>
        </el-form-item>

      </el-form>

    </el-card>

<!--    <el-button class="primary" @click="selectOne">点我</el-button>-->
    <el-row style="margin-top: 30px">
      <el-row justify="end" type="flex" style="float: right;z-index: 1;">
        <el-input style="margin-right: 10px;" size="small" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="keySearch"></el-input>
        <el-button size="small" type="primary">导出</el-button>
        <el-button size="small" type="primary" @click="addToBlackList">移入黑名单</el-button>
        <el-button size="small" type="primary">移出黑名单</el-button>
      </el-row>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="参与用户" name="first">
          <el-table ref="myTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55px"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 1" type="success">成功</el-tag>
                <el-tag v-else type="danger">失败</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template> <!--slot-scope="scope" -->
                <el-button type="text" size="small">查看</el-button>

                <el-popconfirm title="这是一段内容确定删除吗？">
                  <el-button slot="reference" type="text" size="small">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" style="margin-top: 30px;">
            <el-pagination
                :total="page.totalCount"
                :page-size="page.perPageSize"
                background
                layout="prev, pager, next,jumper"

            >
            </el-pagination>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="黑名单" name="second">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 1" type="success">成功</el-tag>
                <el-tag v-else type="danger">失败</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template> <!--slot-scope="scope" -->
                <el-button type="text" size="small">查看</el-button>

                <el-popconfirm title="这是一段内容确定删除吗？">
                  <el-button slot="reference" type="text" size="small">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" style="margin-top: 30px;">
            <el-pagination
                :total="page.totalCount"
                :page-size="page.perPageSize"
                background
                layout="prev, pager, next,jumper"

            >
            </el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>



  </div>
</template>

<script>
export default {
  name: "FansView",
  data() {
    return {
      activeName: "first",
      searchForm: {task: '', category: ''},
      categoryOptions: [
        {
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }, {
          value: '4',
          label: '龙须面'
        }, {
          value: '5',
          label: '北京烤鸭'
        }],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          status:1
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
          status:2
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
          status:1
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
          status:1
        }],
      page: {
        totalCount: 10000,
        perPageSize: 20
      },
      dialogFormVisible: false,
      addForm: {
        x1: "",
        x2: ""
      },
      dialogVisible: false,
      checkDataList: [],
    }
  },
  mounted() {
    this.$refs.myTable.toggleRowSelection(this.tableData[2]);  // 默认选中第二个
  },
  methods: {
    resetSearchForm(formName) {
      this.$refs[formName].resetFields();   // 重置form的每个值
    },
    clickSearch() {
      alert("你是哪个");    // 过滤
    },
    changeTask(obj) {
      // 修改任务
      console.log("修改任务", obj);
    },
    handleSelectionChange(valueList){
      console.log(valueList);
      this.checkDataList = valueList;
    },
    selectOne() {
      this.$refs.myTable.toggleRowSelection(this.tableData[2]);
    },
    addToBlackList() {
      // 获取已经选中的数据
      console.log('移入黑名单', this.checkDataList);
    }
  }
}
</script>

<style scoped>

</style>