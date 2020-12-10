<template>
  <div style="width:100%;height:95%">
    <h1>父子页面通讯</h1>
    <el-button @click="tofather" type="primary">父页面</el-button>
    <el-button @click="tochild" type="primary">子页面</el-button>
    <div class="divboder">
        <router-view></router-view>
    </div>
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
      tofather() {
        this.$router.push({
          path: '/fztx/fatherPage',
        })
      },
      tochild() {
          this.$router.push({
          path: '/fztx/childPage',
        })
      }
    }
  }

</script>

<style>
.divboder{
  border-style:solid;
  border-color:#0000ff;
    width: 100%;
    height: 70%;
     /* position: absolute; */
}
</style>
