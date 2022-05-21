<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal"
             background-color="#545c64"
             :default-active="rootActiveRouter"
             text-color="#fff"
             active-text-color="#ffd04b"
             router>
      <el-menu-item>媒体系统</el-menu-item>
      <el-menu-item index="TaskLayoutView" :route="{name:'ActivityListView'}">任务</el-menu-item>
      <el-menu-item index="MsgLayoutView" :route="{name:'PushView'}">消息</el-menu-item>
      <el-menu-item index="AuthView" :route="{name:'AuthView'}">公众号授权</el-menu-item>

      <el-submenu index="Self" class="myself">
        <template slot="title">{{ username }}</template>
        <el-menu-item index="5-1">个人中心</el-menu-item>
        <el-menu-item index="5-2">注销</el-menu-item>
      </el-submenu>

    </el-menu>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutView",
  data(){
    return {
      rootActiveRouter: "",
    }
  },
  mounted() {
    this.rootActiveRouter = this.$route.matched[1].name;
  },
  computed: {
    username(){
      return this.$store.state.username;
    }
  }
}

</script>

<style scoped>
  .myself{
    float: right;

  }


</style>