<template>
    <div>
        {{info}}
        pro
        {{produtividade}}
        para
        {{paradas}}
        maq
        {{maquinas}}
        <div class="input-field col s12">
            <select>
              <option value="" disabled selected>Choose your option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <label>Materialize Select</label>
          </div>
        
        <main class=container>
        <form id="ok" >
            <div class=row>
                <div class="col s12">
                    <span>Mostrar Telas</span>
                </div>
            </div>
            
            <div class=row>
                <div class="col xl12 list">
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
            <!-- <div class=row>
                <div class="input-field col xl12">
                    <input placeholder="Tempo de transição da tela, em segundos." type=number id=tempo_trans name=tempo_trans pattern=\d*>
                    <label for=tempo_trans>Tempo de Transição</label>
                </div>
            </div> -->
            <div class=row>
                <div class="col s12">
                    <span>Mostrar Grupo / Máquinas</span>
                </div>
                <div class="input-field col xl6">
                    <input type="hidden" id="dsGt" name="dsGt" value="">
                    <select id=galpao name=galpao>
                        <option value="" disabled selected>Escolha o Grupo de Trabalho</option>                       
            
                            <option v-for="(index, gt) in gts" :value="gt.cdGt" :name="gt.dsGt">{{gt.dsGt}}</option>

                    </select>
                    <label>Grupo de Máquinas</label>
                </div>
                <div class="input-field col xl6">
                    
                    <input id="dsGt" name="dsGt" value="">
                    <select name="" id="">
                        <option value="teste1">teste1'</option>
                        <option value="teste1">teste1'</option>
                        <option value="teste1">teste1'</option>
                        <option value="teste1">teste1'</option>
                        <option value="teste1">teste1'</option>
                        <option v-for="(gt, index) in gts" :value="gt.cdGt" :name="gt.dsGt">{{gt.dsGt}}</option>
                    </select>
                    
                    <label>Grupo de Máquinas</label>
                </div>
                <div class="browser-default input-field col xl6">
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
            <span>Carregar Logo da Empresa</span>
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
export default {
components: {

},
data() {
  return {
    info: 'a',
    produtividade : false,
    paradas : true,
    maquinas : false,
    gts : [
        {dsGt: 'TESTE 1', cdGt : '000001'},
        {dsGt: 'TESTE 2', cdGt : '000002'},
        {dsGt: 'TESTE 3', cdGt : '000003'},
        {dsGt: 'TESTE 4', cdGt : '000004'},
    ]

    
  };
},
mounted (){
    
   
},
created(){
    this.listGts()
   //  this.Materizalize();
},
methods:{
    Materizalize(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        });
        $(document).ready(function() {
                    $(document).ready(function() {
            // Select - Single
            $('select:not([multiple])').material_select();
        });

            $('#galpao').change(e => {
            var galpaoTemp;
            var produtividadeTemp;
            var maquinasTemp;
            var paradasTemp;

            galpaoTemp = $('#galpao').val();
            produtividadeTemp = $('#painelProdutividade').val();
            maquinasTemp = $('#painelMaquinas').val();
            paradasTemp = $('#painelParadas').val();

            $('#preloader').fadeIn().toggleClass('hide');
            axios.get(ip+`/idw/rest/injet/pts/ativoByGalpao`, {
                params: {
                    gt:galpaoTemp
                }
            })
            .then(response => {
                console.log("gt " + galpaoTemp)

                $('#preloader').fadeOut().toggleClass('hide');
                
                $('#maquinas').find('option').remove().end();      
                
                console.log("Galpao "  +$("#galpao option:selected").html())

                $('#dsGt').val($("#galpao option:selected").html());

                console.log("Valor do campo dsGt " + $("#dsGt").val())

                response.data.pts.forEach(pt => $('#maquinas').append(`<option value='${pt.cdPt}'>${pt.cdPt}</option>`));
                $('select').formSelect();
            })
            .catch(err => {
                M.toast({ html: 'Falha ao carregar máquinas, tente novamente mais tarde. ' + error, displayLength: 2000 })
            })

            var cliente = {
                galpao: $("#galpao").val(),
                produtividade: $('#painelProdutividade').is(':checked'),
                maquinas: $('#painelMaquinas').is(':checked'),
                paradas: $("#painelParadas").is(':checked'),
                cor_fundo: '#ffffff',
                path_logo: ''
            };

            // localStorage.setItem("galpao", $("#galpao").val());
            // console.log(cliente);
            return true;


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
        .then(gts => this.gts = gts.data.gts)
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
}

}
</script>
<style lang="css">
carrousel{
    overflow: hidden;
}

.item{
    float: left;
    width: 100%;
    position: absolute;
    display: inline;
    left: 100%;  
}
.active{
    display: block;
    left: 0;
}
.nav{
    margin-top: 150px;
}
.red{
    background: red;
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