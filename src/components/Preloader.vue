<template>
    <div id=preloader >
        <img src="../assets/preloader.gif" alt="">
        <!-- <img src='src/assets/logo.png' alt=preloader> -->
    </div>
</template>
<style>
#preloader {
    display: block;
    position: fixed;
    top:0;
    z-index: 2;
    height: 100%;
    min-width: 100%;
    background-color: rgba(0, 0, 0);
    
    
}
#preloader img {
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
}
</style>