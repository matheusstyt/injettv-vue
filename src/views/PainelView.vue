<template>
    <div>
        <header class="center">
            <span class="titulo">INJET TV - Painel de Controle</span>
            <img class="logo-container" id="logo" src="../assets/images/logo.jpg" alt=Logo >   
        </header>
        <div class="msg">
            <h2>{{ info }}</h2>
        </div>
      <main class=container>
        <form id="ok" >
            <div class=row>
                <div class="col s12">
                    <span>Mostrar Telas</span>
                </div>
            </div>     
            <div class=row>
                <div class="col xl12 list flex">
                    <p class=inline-list>
                        <label>
                            <input name=painelProdutividade type=checkbox id=painelProdutividade :cheked="produtividade" v-model="produtividade"  >
                            <span>Produtividade</span>
                        </label>
                    </p>
                    <p class=inline-list>
                        <label>
                            <input name=painelMaquinas type=checkbox id=painelMaquinas :checked="maquinas" v-model="maquinas" >
                            <span>Máquinas</span>
                        </label>
                    </p>
                    <p class=inline-list>
                        <label>
                            <input name=painelParadas type=checkbox id=painelParadas :checked="paradas" v-model="paradas">
                            <span>Paradas</span>
                        </label>
                    </p>
                </div>
            </div>
            <div class=row>
                <div class="col s12">
                    <span>Mostrar Grupo / Máquinas</span>
                </div>
                <div class="input-field col xl5 select-grupo">
                    <input type="hidden" id="dsGt" name="dsGt" value="">
                    <!-- <label class="typo__label">Grupo de Máquinas</label> -->
                    <VueMultiselect @change="teste" v-model="gt" :options="gts" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Escolha o grupo de trabalho" label="dsGt" track-by="dsGt" ></VueMultiselect>
                </div>
   
                <div class="input-field col xl5">
                    <!-- <label class="typo__label">Máquinas</label> -->
                    
                    <VueMultiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Todas as Máquinas" label="cdPt" track-by="cdPt" :preselect-first="false">
                        <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                    </VueMultiselect>

                </div>
            </div>
            <div class=row>
                <div class="input-field col xl12">
                    <span>Cor de Fundo</span>
                    <input type=color id=cor_fundo value=#ffffff name=cor_fundo>
                    <div class="light-blue darken-2 right btn waves-effect waves-light">
                        <h6>Aplicar</h6>
                     
                    </div>
                </div>
            </div>

            <div class="col s12"><span>Carregar Logo da Empresa</span></div>
            <div class="file-field input-field">
                <button class="btn light-blue darken-2 right btn waves-effect waves-light" id=carregar name=carregar @click="toggleShow">
                    <h6>Carregar</h6>
                </button>
                <my-upload field="img"
                    @crop-success="cropSuccess"
                    v-model="show"
                    :width="300"
                    :height="300"
                    langType="pt-br"
                    noCircle=true
                    :params="params"
                    :headers="headers"
                    img-format="png">
                </my-upload>
                
                <div class=file-path-wrapper>
                    <input id=path_logo name=path_logo placeholder="Carregar logo da empresa." class="file-path validate" type=text>
                </div>
            </div>
        </form>
        <button class="light-blue darken-2 right btn waves-effect waves-light" id=enviar name=enviar @click="enviar()">
            <h6>Continuar</h6>
        </button>

    </main>
    </div>
</template>

<script>

import myUpload from 'vue-image-crop-upload';
import axios from 'axios'
import $ from 'jquery'
import MM from 'materialize-css/dist/js/materialize.min'
import VueMultiselect from 'vue-multiselect'
export default {
components: {
    VueMultiselect, 'my-upload': myUpload
},
data() {
  return {
    imgPadrao :'../assets/images/logo.jpg',
    fileSelected: null,
    file:"",
    message:"",
    show: false,
    params: {
        token: '123456798',
        name: 'avatar'
    },
    headers: {
        smail: 'POST'
    },
    imgDataUrl: '',

    ip : require('/src/config/config.env').API_URL,
    value: [],
    selected: null,
    options: [],
    maquinasList: [],
    info: '',
    info1: 'teste1',
    produtividade : false,
    paradas : false,
    maquinas : false,
    gts : [],
    gt: null,
    logo : '',
    grupo: null,
    pts: null
    
    
  };
},
mounted (){
    MM.AutoInit()
    if(localStorage.getItem('logo') != null){
        this.getPhoto();
    }
},
created(){
    this.listGts()
   setInterval
},  
methods:{
    teste(){
        console.log('aa')
    },
    getPhoto() {
        document.getElementById('logo').src = localStorage.getItem('logo');
    }, 
    toggleShow(e) {
        e.preventDefault();
        
        this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field){
        console.log(field)
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;	
	    localStorage.setItem('logo', imgDataUrl);
        this.getPhoto();
    },
    changeMaquinas(galpao){
        this.value = []
        var galpaoTemp = galpao
        //$('#preloader').fadeIn().toggleClass('hide');
        axios.get(`${this.ip}/idw/rest/injet/pts/ativoByGalpao`, {
            params: {
                gt:galpaoTemp
            }
        })
        .then(response => {
            this.options = response.data.pts
            this.pts = response.data.pts
        })
        .catch((error) => this.errorF(error));
    },
    getMaquinas(){
        $(document).ready(function() {
                    $(document).ready(function() {
            // Select - Single
            $('select:not([multiple])').material_select();
        });

            $('#btn-cor').click(() => $('body').css('background-color', $('#cor_fundo').val()));

            $('input:file').change(e => {
            let imagem = document.getElementById('imagem').files[0],
                fileReader = new FileReader();

            fileReader.onload = (fileLoadedEvent) => $('img').attr('src', fileLoadedEvent.target.result);
            fileReader.readAsDataURL(imagem);
            });
        });
    },
    listGts(){
    
        axios.get(`${this.ip}/idw/rest/injet/gts/monitorizacao`)
        .then(gts => this.gts = gts.data.gts    )
        .catch((error) => this.errorF(error));
    },
    maquinasChange(){
        this.maquinas = !this.maquinas
    },
    produtividadeChange(){
        this.produtividade = !this.produtividade
    },
    paradasChange(){
        this.paradas = !this.paradas
    },
    enviar(){
        if(this.gt == null){
            this.info = 'Selecione uma grupo de trabalho!!'

        }else{
            if(this.value.length > 0){
                this.info = this.value.length
                this.value.forEach(element => {
                    this.maquinasList.push(element.cdPt)
                });
                function onlyUnique(value, index, self) {
                    return self.indexOf(value) === index;
                }
                this.maquinasList =  this.maquinasList.filter(onlyUnique);
                sessionStorage.setItem("maquinasList", JSON.stringify(this.maquinasList));
            }else{
                sessionStorage.setItem("maquinasList", null);
            }
            sessionStorage.setItem("paradas", this.paradas);
            sessionStorage.setItem("produtividade", this.produtividade);
            sessionStorage.setItem("maquinas", this.maquinas);
            sessionStorage.setItem("galpao", this.gt.cdGt)
            sessionStorage.setItem("galpaoName", this.gt.dsGt)
            this.info = 'Sucesso :)'
            if(!this.produtividade & !this.paradas & !this.maquinas){
                this.info = 'Porfavor, selecione pelo menos uma tela!'
            }else{
                if(sessionStorage.getItem('maquinas') == 'true'){
                    window.location.href = '/maquinas'
                }
                else if(sessionStorage.getItem('produtividade') == 'true'){
                window.location.href = '/produtividade'
                }
                else if(sessionStorage.getItem('paradas') == 'true'){
                    window.location.href = '/parada'
                }    
            }
        }
    },
    errorF(error){
        sessionStorage.setItem('error', error)
       // window.location.href = '/error'
        
    }
},
watch:{
    gt(newValue){
        this.changeMaquinas(newValue.cdGt)
    }
}

}

</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style >
.paradas-css{
    color: rgb(161, 161, 161);
    font-weight: 400;
}
.produtividade-css{
    color: rgb(161, 161, 161);
    font-weight: 400;
}
.maquinas-css{
    color: rgb(161, 161, 161);
    font-weight:400;
}
.msg h2{
    color: rgb(199, 78, 78);
    font-family: 'Consolas';
    font-size: 1.5em;
}
.titulo{
    text-align: center;

}
.flex{
    gap: 1vmax;
    display: flex;
    
}

.row{
    display: block;
    width: 100%;
    text-align: start;
}
.col.s12{
    width: 100%;
    display: block  ;
    text-align: start;
    margin: 1em 0;;
}
.select-grupo{
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
}
.select-grupo label{
    position: relative;
    position: absolute;
    top: -1.8vmax;
    font-size: 0.7vmax;
}
.select-grupo select{
    font-size: 1.1vmax;
    border-bottom: 1px solid rgb(187, 187, 187);

}
.select-grupo select:active{
    transition: ease 1s;
}
* {
    box-sizing: border-box;
}
html, body {
    width: 100% !important;
    height: 100% !important;
    font-weight: bold;
}
header {
    position: relative;
    
}
header span {
        font-size: 2.3em;
    }
header img {
    width: 150px;
    height: 150px;
    position: absolute;
    right: 0;
    top: 0;
    margin: 25px 25px 0 0;
}
header .list .inline-list {
    display: inline;
    margin: 0 15px;
}
.input-field label.active, span {
    font-size: 1.4rem;
}
/* label focus color */
.input-field input[type=text]:focus + label {
    color: #000 !important;
}
/* label underline focus color */
.input-field input[type=text]:focus {
    border-bottom: 1px solid #000 !important;
    box-shadow: 0 1px 0 0 #000 !important;
}
h6 {
    font-size: 1.1em;
    color: #fff;
}
.light-blue.darken-2.right.btn.waves-effect.waves-light h6{
    color: #fff;
}
.light-blue.darken-2.right.btn.waves-effect.waves-light {
    display: flex;
    align-items: center;
    justify-content: center;

} 
.light-blue h6{
    color: #fff;
}
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
  .logo-container{
    width: 150px;
    height: 150px;
  }
</style>