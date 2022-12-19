<template>
    <div class="container-err">
      <h3>Geralmente esse erro ocorre devido a ausência de dados do IDW, ou seja, algum problema no iDW.</h3>
        <h1>Não há dados a apresentar :(</h1>  
        <h2 class="err">404</h2>
        <div class="box-err">
          {{ error }}
        
        </div>
    </div>
    </template>
    
    <script>
    export default {
    components: {
    
    },
    data() {  
      return {
        error: ''
      };
    },
    created(){
        this.error = this.$route.query.code_error
    }
  }
    </script>
<style>
.container-err{
  display: flex;
  height: 70vh;
  flex-direction:column-reverse;
  justify-content: center;
  align-items: center;

}
.err{
    font-family: 'Consolas';
    font-size: 20em;
}
</style>