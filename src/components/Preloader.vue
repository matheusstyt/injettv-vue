<template>
    <div id=preloader class=hide>
        <h1>CARREGANDO..</h1>
        <!-- <img src='src/assets/logo.png' alt=preloader> -->
    </div>
</template>
<style>
#preloader {
    display: inline-block;
    position: absolute;
    z-index: 2;
    height: 100%;
    min-width: 100%;
    background-color: #000;
    
}
#preloader img {
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
}
</style>