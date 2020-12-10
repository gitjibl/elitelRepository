<template>
  <div>
    <h2>Vue.extend</h2>
    <el-button @click="createPro" type="primary" size="mini">创建构造器</el-button>
    <div id="mount-point"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    data() {
      return {

      }
    },
    components: {

    },
    methods: {
      createPro() {
        // 创建构造器
        var Profile = Vue.extend({
          template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
          data: function () {
            return {
              firstName: 'Walter',
              lastName: 'White',
              alias: 'Heisenberg'
            }
          }
        });
        // 创建 Profile 实例，并挂载到一个元素上。
        new Profile().$mount('#mount-point')
      }
    }
  }

</script>

<style>

</style>
