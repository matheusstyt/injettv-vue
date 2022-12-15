<template>
    <div class="maquinas">
      <h1>This is an maquinas page</h1>
    </div>
    {{ info }}
  </template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Maquinas',
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
