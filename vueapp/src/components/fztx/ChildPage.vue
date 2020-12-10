<template>
  <div>
    <h1>this is child</h1>
    <p>{{this.onChildMsg}}</p>
    <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
    <el-button type="primary" size="mini" @click="chuanzhi">传值</el-button>
  </div>
</template>
<script>
  export default {
    props:{
        onChildMsg:String
    },
    data() {
      return {
          input:'',
      }
    },
    components:{

    },
    methods:{
        chuanzhi(){
            this.$emit('onChildVal',this.input)
        }
    }
  }

</script>

<style>
</style>

