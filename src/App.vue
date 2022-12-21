<template>
  <nav class="nav-1" >
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/painel">Painel</router-link> -->
    <a class="route" href="/painel" >Painel</a>
    <router-link to="/maquinas" v-bind:style="{ 'display' : maquinas }">Maquinas</router-link>
    <!-- <router-link to="/produtividade">Produtividade</router-link> -->
    <a class="route" href="/produtividade"  v-bind:style="{ 'display' : produtividade }">Produtividade</a>
    <router-link to="/parada" v-bind:style="{ 'display' : paradas }">Paradas</router-link>
    <!-- <router-link to="/carrosel">Carrosel</router-link> -->
    <a class="route" href="/carrosel" v-bind:style="{ 'display' : galpao }">Carrosel</a>
  </nav>
  <router-view/>
</template>
<script>
import M from 'materialize-css'

export default {
  data(){
    return{
      paradas : 'none',
      maquinas : 'none',
      produtividade : 'none',
      galpao: 'none',
    }
    
  },
  mounted () {
    M.AutoInit()
    this.start()
  },
methods :{
  start(){
    if(sessionStorage.getItem('maquinas') == 'true'){
      this.maquinas = 'block'
    }
    if(sessionStorage.getItem('paradas') == 'true'){
      this.paradas = 'block'
    }
    if(sessionStorage.getItem('produtividade') == 'true'){
      this.produtividade = 'block'
    }
    if(sessionStorage.getItem('galpao')){
      this.galpao = 'block'
    }
  }
}
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-1 {
  background-color: rgb(105, 105, 196);
  display: flex;
  justify-content: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 1vmax;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.route :active {
  color: #42b983;
}
@import'~bootstrap/dist/css/bootstrap.css'
</style>
