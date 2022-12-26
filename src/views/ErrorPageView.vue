<template>
    <div class="container-err">
      <p>Código : {{ error }}</p>
      <h3>Dificuldade ao carregar os Dados.</h3>
        <h1>Não há dados a apresentar :(</h1>  
        <h2 class="err">404</h2>
        <div class="box-err">

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
        this.error = sessionStorage.getItem('error')
        setInterval(() => {
          window.location.href = '/painel'
        }, 10000)
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