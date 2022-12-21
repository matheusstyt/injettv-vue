<template>
    <div class="container-err">
      <h3>Geralmente esse erro ocorre devido a ausência de dados do IDW, ou seja, algum problema no iDW.</h3>
        <h1>Não há dados a apresentar :(</h1>  
        <h2 class="err">404</h2>
        <div class="box-err">
          <p v-bind:style="{
            color: highlightColor, //..highlightColor deve ser uma propriedade da função data
            'font-size' : pSize + 'rem' //..pSize deve ser uma propriedade da função data
          }">Estilo inline usando um objeto!</p> 
        
        </div>
    </div>
    </template>
    
    <script>
    export default {
    components: {
    
    },
    data() {  
      return {
        error: '',
        highlightColor: 'blue',
        pSize : 3
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