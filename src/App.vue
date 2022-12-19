<template>
  <nav class="nav-1">
    <router-link to="/">Home</router-link> |
    <router-link to="/painel">Painel</router-link>
    <router-link to="/maquinas">Maquinas</router-link>
    <router-link to="/produtividade">Produtividade</router-link>
    <router-link to="/parada">Paradas</router-link>
    <router-link to="/carrosel">Carrosel</router-link>
  </nav>
  <router-view/>
</template>
<script>
import M from 'materialize-css'


export default {

mounted () {
    M.AutoInit()
},
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
</style>
