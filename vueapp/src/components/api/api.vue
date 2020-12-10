<template>
  <div style="width:100%;height:95%">
    <h1>api</h1>
    <el-link @click="extend" type="success">Vue.extend</el-link>
    <el-link type="success">成功链接</el-link>
    <el-link type="success">成功链接</el-link>
    <el-link type="success">成功链接</el-link>
    <el-link type="success">成功链接</el-link>
    <el-link type="success">成功链接</el-link>
    <el-link type="success">成功链接</el-link>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    components: {

    },
    methods: {
      extend() {
        this.$router.push({
          path: '/api/expend',
        })
      }
    }
  }

</script>

<style>

</style>
