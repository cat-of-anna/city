<template>
  <div>
    <el-menu class="sub-menu" mode="horizontal" :default-active="subActiveRouter" router>
      <el-menu-item index="ActivityView" :route="{name:'ActivityListView'}"><i class="el-icon-coin"></i>活动管理</el-menu-item>
      <el-menu-item index="PromoView" :route="{name:'PromoView'}"><i class="el-icon-data-analysis"></i>推广码</el-menu-item>
      <el-menu-item index="StatView" :route="{name:'StatView'}"><i class="el-icon-document"></i>数据统计</el-menu-item>
      <el-menu-item index="FansView" :route="{name:'FansView'}"><i class="el-icon-setting"></i>参与粉丝</el-menu-item>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TaskLayoutView",
  data(){
    return {
      subActiveRouter: "",
    }
  },
  watch: {
    $route: function (to){
      this.subActiveRouter = to.matched[2].name;   // 可以为空
    }
  },
  mounted() {
    this.subActiveRouter = this.$route.matched[2].name;
  }
}
</script>

<style scoped>
  .sub-menu .el-menu-item {
    line-height: 40px;
    height: 40px;
    vertical-align: middle;
    font-size: 13px;
  }

  .sub-menu .el-menu-item i {
    margin-top: -3px;
  }
</style>