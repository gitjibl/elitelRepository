<template>
  <el-container class="container" style="border: 1px solid #eee">
    <el-header>
      <div class="headerdiv">
        <span style="font-size:24px;color:#ecf5ff;">HelloWorld</span>
      </div>
    </el-header>
    <el-container style="width:100%;height:100%">
      <el-aside :style="{'width':asidewidth}" style="background-color:#545c64">
        <!-- <el-radio-group :style="{ 'position': 'absolute','left': asidewidth,'top': '60px','z-index': 9999}" size="mini" v-model="isCollapse">
          <el-radio-button  :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <div :style="{ 'position': 'absolute','left': asidewidth,'top': '60px','z-index': 9999}" size="mini">
          <!-- <el-radio-button  :label="false">展开</el-radio-button> -->
          <button @click="iconClick"><i class="el-icon-circle-plus"></i></button>
        </div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
          active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
          @select="menuSelect" style="border-right-width: 0px;">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">父子组件通讯</el-menu-item>
              <el-menu-item index="1-2">Api</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false,
        asidewidth: '200px'
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      menuSelect(index) {
        switch (index) {
          case '1-1':
            this.$router.push({
              path: '/fztx',
            })
            break;
          case '1-2':
            this.$router.push({
              path: '/api',
            })
            break;
          default:

        }
      },
      iconClick(){
        this.isCollapse = !this.isCollapse
      }
    },
    watch: {
      isCollapse: function (val, oldVal) {
        if (val == true) {
          this.asidewidth = '70px';
        } else {
          this.asidewidth = '200px';
        }
      }
    }
  }

</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  el-main {
    width: 100%;
    height: 100%;
  }

  .container {
    width: 100%;
    height: 100%;
    /* background: yellow; */
    top: 0px;
    right: 0px;
    margin-bottom: 0px;
    position: absolute;
  }

  .el-header {
    padding: 0 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 60px;
    background-image: url(../assets/imgs/timhhh.jpg);
  }

  .headerdiv {
    padding: 0px;
    height: 60px;
    text-align: left;
    margin-left: 10%;
    line-height: 60px;
  }

</style>
