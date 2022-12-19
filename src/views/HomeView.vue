<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>TESTE </h1>
    <h2>  Produtividade  </h2>
    {{ produtividade }}
    <hr>
    <h2>  Maquinas  </h2>
    {{ maquinas }}
    <hr>
    <h2>  Paradas  </h2>
    {{ paradas }}
    <hr>
    <h2>Error: </h2>
    {{ error }}
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
