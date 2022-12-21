<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    
  },
  data(){
      return{
        produtividade : false, 
        maquinas : false, 
        paradas : false,
        error: null
      }
  },
  created() {
    window.location.href = '/painel'
    try{
      this.produtividade = this.$route.params.produtividade
      this.maquinas = this.$route.params.maquinas
      this.paradas = this.$route.params.paradas
    }catch(err){
      this.error = err
    }
    
  },
}
</script>
