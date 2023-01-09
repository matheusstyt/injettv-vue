<template>
  <div class="geral">
    <nav class="nav-1" >
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/painel">Painel</router-link> -->
      <a class="route painel" href="/painel" >Painel</a>
      <!-- <router-link to="/maquinas" v-bind:style="{ 'display' : maquinas }">Maquinas</router-link> -->
      <a class="route maquinas-css" href="/maquinas" v-bind:style="{ 'display' : maquinas }">Maquinas</a>
      <!-- <router-link to="/produtividade">Produtividade</router-link> -->
      <a class="route produtividade-css" href="/produtividade"  v-bind:style="{ 'display' : produtividade }">Produtividade</a>
      <!-- <router-link to="/parada" v-bind:style="{ 'display' : paradas }">Paradas</router-link> -->
      <a class="route paradas-css" href="/parada" v-bind:style="{ 'display' : paradas }">Paradas</a>
      <!-- <router-link to="/carrosel">Carrosel</router-link> -->
      <!-- <a class="route carrosel" href="/carrosel" v-bind:style="{ 'display' : galpao }">Carrosel</a> -->
    </nav>
    <router-view/>
    <div>

    </div>
  </div>
  
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
.ultima-atualizacao{
  position: absolute; 
  bottom: 1%; 
  left: 1%;
  color: #1d1d1d;
}
.geral{
  margin-top: 2vmax;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-1 {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.0);
  box-shadow: none;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  padding: 0.3em 2em;
}
.route{
  font-size: 1em;
  color: rgb(161, 161, 161);
  text-decoration:underline;
  
}
.route:hover{
  color: rgb(41, 41, 41);
  text-decoration:none;
}
.painel{
  padding: 0 1em;
  color: rgb(32, 101, 148);
  position: absolute;
  left: 2em;
  top: 0;
}
.painel:hover{
  color: rgb(25, 81, 119);
  border-radius: 10px;
  background-color: rgb(220, 235, 245);
}
@import'~bootstrap/dist/css/bootstrap.css'
</style>
