<template>
  <div style="padding: 20px;">
    <el-card class="box-card">
      <router-link :to="{name:'ActivityCreateView'}">
        <el-button type="primary" size="small"><i class="el-icon-circle-plus-outline"></i> 新建活动</el-button>
      </router-link>

      <el-row style="margin-top: 25px">
        <el-form :inline="true" class="demo-form-inline" size="small" :model="searchForm" ref="searchForm">
        <el-form-item label="活动状态" prop="status">
          <el-input placeholder="活动状态" v-model="searchForm.status"></el-input>
        </el-form-item>

        <el-form-item label="公众号" prop="category">
          <el-select placeholder="公众号" v-model="searchForm.category">
            <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="活动名称" prop="title">
            <el-input placeholder="活动名称" v-model="searchForm.title"></el-input>
          </el-form-item>

        <el-form-item style="margin-left: 30px">
          <el-button type="primary" @click="clickSearch">筛选</el-button>
          <el-button @click="resetSearchForm('searchForm')">重置</el-button>
        </el-form-item>

      </el-form>
      </el-row>
    </el-card>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col style="width: 260px;margin-bottom: 20px;" v-for="(o, index) in 12" :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <img style="height: 240px;width: 100%;"
               src="../../assets/avatar.jpg"
               class="image">
          <div style="padding: 14px;">
            <el-row><span>头像{{index + 1}}</span></el-row>
            <el-row><time>{{ currentDate }}</time></el-row>
            <el-row style="margin-top: 8px;">
              <el-button icon="el-icon-search" size="mini" circle></el-button>
              <el-button icon="el-icon-edit" size="mini" circle></el-button>
              <el-button icon="el-icon-check" size="mini" circle></el-button>
              <el-button icon="el-icon-message" size="mini" circle></el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "ActivityListView",
  data() {
    return {
      searchForm: {title: '', category: '', status: ''},
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
      currentDate: new Date()
    }
  },
  methods: {
    resetSearchForm(formName) {
      this.$refs[formName].resetFields();   // 重置form的每个值
    },
    clickSearch() {
      alert("你是哪个");
    },
  },
  created() {
    this.axios.get('/base/test/').then(res => {
      console.log(res);
    }).catch(reseaon => {
      console.log("请求失败", reseaon);
      return reseaon;
    })
  }
}
</script>

<style scoped>

</style>