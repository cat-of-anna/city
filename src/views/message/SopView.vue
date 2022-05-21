<template>
  <div style="padding: 20px;">
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline" size="small" :model="searchForm" ref="searchForm">
        <el-form-item label="标题" prop="title">
          <el-input placeholder="标题" v-model="searchForm.title"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="category">
          <el-select placeholder="类型" v-model="searchForm.category">
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-left: 30px">
          <el-button type="primary" @click="clickSearch">筛选</el-button>
          <el-button @click="resetSearchForm('searchForm')">重置</el-button>
        </el-form-item>

      </el-form>

    </el-card>

    <el-card class="box-card" style="margin-top: 25px;">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-s-grid"></i> 消息列表</span>
        <el-button style="float: right;" type="primary" size="small" >
          <i class="el-icon-circle-plus-outline"></i> 操作按钮
        </el-button>
      </div>

      <div>
        <el-table :data="tableData" border style="width: 100%">
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
      </div>

      <el-row type="flex" justify="end" style="margin-top: 30px;">
        <el-pagination
            :total="page.totalCount"
            :page-size="page.perPageSize"
            background
            layout="prev, pager, next,jumper"

        >
        </el-pagination>
      </el-row>
    </el-card>


  </div>
</template>

<script>
export default {
  name: "SopView",
  data() {
    return {
      searchForm: {title: '', category: ''},
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
      dialogVisible: false
    }
  },
  methods: {
    resetSearchForm(formName) {
      this.$refs[formName].resetFields();   // 重置form的每个值
    },
    clickSearch() {
      alert("你是哪个");
    },
  }
}
</script>

<style scoped>

</style>