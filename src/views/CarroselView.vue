<template>
<div> 
    <div v-for="(index) in carroseuCheck">
        
        <div v-if="index.name == 'paradas'">
            <div  v-bind:style="{ 'display' : paradasS }">
                <Paradas :cd="cd"/>
            </div>
        </div>
        <div v-if="index.name == 'maquinas'">
            <div  v-bind:style="{ 'display' : maquinasS }">
                <Maquinas :cd="cd" />
            </div>
        </div>
        <div v-if="index.name == 'produtividade'">
            <div v-bind:style="{ 'display' : produtividadeS }">
                <Produtividade />
            </div>
        </div>
    </div>   
</div>
</template>

<script>
import router from "@/router";
import axios from 'axios'
import Maquinas from '../components/Maquinas.vue'
import Produtividade from '../components/Produtividade.vue'
import Paradas from '../components/Paradas.vue'
export default {
    components: {
        Produtividade, Maquinas, Paradas, 

    },
    created () {
        if(sessionStorage.getItem('maquinas') == 'true'){
            this.carroseu.push({'name': 'maquinas', value: 'block', status: true})
            this.carroseuCheck.push({'name': 'maquinas', value: 'block', status: true})
        }
        if(sessionStorage.getItem('paradas') == 'true'){
            this.carroseu.push({'name': 'paradas', value: 'block', status: true})
            this.carroseuCheck.push({'name': 'paradas', value: 'block', status: true})
        }
        if(sessionStorage.getItem('produtividade') == 'true'){
            this.carroseu.push({'name': 'produtividade', value: 'block', status: true})
            this.carroseuCheck.push({'name': 'produtividade', value: 'block', status: true})
        }
        this.err = this.carroseu
        setInterval(() => {        
            if(this.carroseu.length > 1){
                this.carroseu = this.changePosition(this.carroseu, 0, this.carroseu.length-1);    
            }else{
                this.info = 'uai'
            }  
        }, 25000)


        
    },
    mounted() {
        if(!sessionStorage.getItem('galpao')){
            router.push({ path: '/painel'})
            this.info = 'sem gp'
        }else{
            this.cd = sessionStorage.getItem('galpao')
            this.produtividade = sessionStorage.getItem('produtividade')
            this.paradas = sessionStorage.getItem('paradas')
            this.maquinas = sessionStorage.getItem('maquinas')
            
            this.displayPrimary()
 
        }
    },
    data() {
    return {
        cd : '000001',
        paradasS: 'none',
        maquinasS: 'none',
        produtividadeS: 'none',
        highlightColor: 'blue',
        pSize : 3,
        errorCode : '',
        carroseu: [],
        carroseuCheck: [],
        //PRODUTIVIDADE 
        bi : null,
        indicadores : null,
        velocimetro : null,
        turnos : null,
        oee : null,
        refugo : null,  
        eficiencia : null,
        utilizacao : null,

        err : null,
        info : null,
        info1 : null,
        produtividade : null, 
        maquinas : null, 
        paradas : null
    };
    },
    methods:{
        displayPrimary(){
            var ma = false;
            var pa = false;
            var pro = false;           
            this.carroseu.forEach(element => {  
                if(element.name == 'produtividade'){
                    pro = true         
                }
                if(element.name == 'maquinas'){
                    ma = true            
                    }
                if(element.name == 'paradas'){
                    pa = true    
                }        
            });
            
            if(ma && pa && pro){
                this.produtividadeS = 'block';
                this.paradasS = 'none';
                this.maquinasS = 'none';
            }
            if(ma && pa || pa && ma){
                this.maquinasS = 'block';
                this.paradasS = 'none';
            }
            if(ma && pro || pro && ma){
                this.produtividadeS = 'block';  
                this.maquinasS = 'none';
            }
            if(pa && pro || pro && pa){
                this.produtividadeS = 'block';
                this.maquinasS = 'none';  
            }
            if(this.carroseu.length == 1){
                if(pa){
                    this.paradasS = 'block';
                }
                if(ma){
                    this.maquinasS = 'block';
                }
                if(pro){
                    this.info
                    this.produtividadeS = 'block'
                }
            }
            
        },
        changePosition(arr, from, to) {
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            arr.forEach((element, index) => {
                if(index == 0){
                    if(element.name === 'paradas'){
                        this.paradasS = 'block'
                        this.maquinasS = 'none'
                        this.produtividadeS = 'none'
                    }
                    if(element.name === 'produtividade'){
                        this.produtividadeS = 'block'
                        this.paradasS = 'none'
                        this.maquinasS = 'none'
                    }
                    if(element.name === 'maquinas'){
                        this.maquinasS = 'block'
                        this.paradasS = 'none' 
                        this.produtividadeS = 'none'
                    }

                }
            });
            
            
            arr[arr.length-1].value = 'none'
            if(arr.length = 3){
                arr[1].value = 'none'
            }
            return arr;
        },        
    }
}

</script>
<style>
</style>