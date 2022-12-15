<template>
    <div class="produtividade">
      <h1>This is an produtividade page</h1>
    </div>
  </template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    
  },
  data(){
    return{

    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
}
</script>
