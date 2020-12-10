<template>
  <div>
    <h1>this is father</h1>
    <p>{{msg}}</p>
    <ChildPage :onChildMsg='fatherMsg' v-on:onChildVal='childVal'></ChildPage>
  </div>
</template>
<script>
  import ChildPage from './ChildPage'
  export default {
    data() {
      return {
          msg:'',
          fatherMsg:'父页面传的值'
      }
    },
    components:{
        ChildPage
    },
    methods:{
        childVal(val){
            this.msg = val;
        }
    }
  }

</script>

<style>
</style>
