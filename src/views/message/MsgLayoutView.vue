<template>
  <div>
    <el-menu class="sub-menu" mode="horizontal" :default-active="subActiveRouter" router>
      <el-menu-item index="PushView" :route="{name:'PushView'}"><i class="el-icon-coin"></i>消息推送</el-menu-item>
      <el-menu-item index="SopView" :route="{name:'SopView'}"><i class="el-icon-data-analysis"></i>SOP计划</el-menu-item>
    </el-menu>

    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: "MsgLayoutView",
    data() {
      return {
        subActiveRouter: "",
      }
    },
    watch: {
      $route: function (to){
        this.subActiveRouter = to.matched[2].name;
      },
    },
    mounted() {
      this.subActiveRouter = this.$route.matched[2].name;
    },
  }
</script>

<style scoped>

</style>