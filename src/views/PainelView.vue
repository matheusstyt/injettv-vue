<template>
    <div>
        <header class="center">
            <span class="titulo">INJET TV - Painel de Controle</span>
            <img src="../assets/images/logo/logo.jpg" alt=Logo >
            {{ grupo }}
            {{ info }}
            {{ pts }}
        </header>   
        <div>
            <label class="typo__label">Simple select / dropdown</label>
            <VueMultiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="dsPt" track-by="dsPt" :preselect-first="false">
              <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </VueMultiselect>
            <pre class="language-json"><code>{{ value  }}</code></pre>
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
                    <select class="browser-default" id=galpao name=galpao v-model="grupo">
                        <option value="" disabled selected>Escolha o Grupo de Trabalho</option>                       
                        <option v-for="gt in gts" :key="gt.idGt" :value="gt.cdGt" :name="gt.dsGt" >{{gt.dsGt}}</option> 
                        
                    </select>
                    <label>Grupo de Máquinas</label>
                </div>
   
                <div class="input-field col xl5">
                    <select id=maquinas name=maquinas multiple>
                        <option value="" disabled>Escolha as Máquinas</option>
                    </select>
                    <label>Máquinas</label>
                </div>
            </div>
            <div class=row>
                <div class="input-field col xl12">
                    <span>Cor de Fundo</span>
                    <input type=color id=cor_fundo value=#ffffff name=cor_fundo>
                    <button id=btn-cor type=button class="light-blue darken-2 right btn">Aplicar</button>
                </div>
            </div>
            <div class="col s12"><span>Carregar Logo da Empresa</span></div>
            <div class="file-field input-field">
                <div class="light-blue darken-2 right btn waves-effect waves-light">
                    <h6>Carregar</h6>
                    <input name=imagem id=imagem type=file>
                </div>
                <div class=file-path-wrapper>
                    <input id=path_logo name=path_logo placeholder="Carregar logo da empresa." class="file-path validate" type=text>
                </div>
            </div>
        </form>
        <button class="light-blue darken-2 right btn waves-effect waves-light" id=enviar name=enviar @click="enviar()"><h6>Continuar</h6></button>

    </main>
    </div>
<!-- <div class="carrousel">
    <div class="item active" id="about">
        <p class="red">Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui Primeiro aqui </p>
        <a href="#" id="for_a">Ir para Artistas</a>
    </div>
    <div class="item" id="artists">
        <p>Conteudo aqui Conteudo aqui Conteudo aqui Conteudo aqui Conteudo aqui Conteudo aqui Conteudo aqui Conteudo aqui Conteudo aqui Conteudo aqui </p>
        <a href="#" id="for_b">Ir para About</a>
    </div>
    <div class="item" id="paradas">
        <p>TERCEIRO aqui TERCEIRO aqui TERCEIRO aqui TERCEIRO aqui TERCEIRO aqui TERCEIRO aqui TERCEIRO aqui TERCEIRO aqui TERCEIRO aqui TERCEIRO aqui </p>
        <a href="#" id="for_b">Ir para About</a>
    </div>
</div> -->

</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import MM from 'materialize-css/dist/js/materialize.min'
import VueMultiselect from 'vue-multiselect'

export default {
components: {
    VueMultiselect  
},
data() {
  return {
    value: [],
    selected: null,
      options: [],
    info: 'a',
    produtividade : false,
    paradas : true,
    maquinas : false,
    gts : [],
    logo : '',
    grupo: null,
    pts: null
    
    
  };
},
mounted (){
    MM.AutoInit()
   
},
created(){
    this.listGts()
   //  this.Materizalize();
},
methods:{
    changeMaquinas(galpao){
        console.log('chegou aqui')
        var galpaoTemp = galpao
        //$('#preloader').fadeIn().toggleClass('hide');
        axios.get(`http://170.10.0.208:8080/idw/rest/injet/pts/ativoByGalpao`, {
            params: {
                gt:galpaoTemp
            }
        })
        .then(response => {
            this.options = response.data.pts
            this.pts = response.data.pts
            console.log("gt " + galpaoTemp)

            // $('#preloader').fadeOut().toggleClass('hide');
            
            $('#maquinas').find('option').remove().end();      
            
            console.log("Galpao "  +$("#galpao option:selected").html())

            $('#dsGt').val($("#galpao option:selected").html());

            console.log("Valor do campo dsGt " + $("#dsGt").val())

            response.data.pts.forEach(pt => $('#maquinas').append(`<option value='${pt.cdPt}'>${pt.cdPt}</option>`));
        })
        .catch(err => {
            this.info = err
        })
        // $('#galpao').change(e => {
        //     var galpaoTemp;
        //     var produtividadeTemp;
        //     var maquinasTemp;
        //     var paradasTemp;

            

        //     var cliente = {
        //         galpao: $("#galpao").val(),
        //         produtividade: $('#painelProdutividade').is(':checked'),
        //         maquinas: $('#painelMaquinas').is(':checked'),
        //         paradas: $("#painelParadas").is(':checked'),
        //         cor_fundo: '#ffffff',
        //         path_logo: ''
        //     };

        //     // localStorage.setItem("galpao", $("#galpao").val());
        //     // console.log(cliente);
        //     return true;


        //     });

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
        axios.get(`http://170.10.0.208:8080/idw/rest/injet/gts/monitorizacao`)
        .then(gts => this.gts = gts.data.gts    )
        .catch(error => this.$route.push({name: 'error'}))
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
        this.$router.push({ 
                        name:"home", 
                        params: {
                            produtividade : this.produtividade, 
                            maquinas : this.maquinas, 
                            paradas : this.paradas
                        }
        }
        )
    }
},
watch:{
    grupo(newValue){
        this.changeMaquinas(newValue)
    }
}

}

</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>

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
    font-size: 14px;
    margin-left: -6.5px;
}
button h6 {
    margin-left: -12.5px;
}
.light-blue.darken-2.right.btn.waves-effect.waves-light {
    width: 88.77px;
    height: 36px;
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
</style>