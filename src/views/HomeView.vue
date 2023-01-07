<template>
  <div class="home">
    <!-- <h1>author: matheus da silva galdino</h1> -->
  </div>
</template>

<script>
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
