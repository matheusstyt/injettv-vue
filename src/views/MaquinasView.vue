<template>
  <div class="maquinas">

    <h1 align="center">Performance Máquinas - {{ galpaoName }}</h1>
        <div class=container id="container">

          <div class="legends">
            <div id="legenda-box">
                <h6><b>Cor da 1° Coluna</b></h6>
                <div v-for="(cor1, index) in legendaColors1" class="color-conteiner"> 
                    <div class="cor-p" :style=back+cor1.style></div>
                    <p>{{cor1.nome}}</p>
                </div>
            </div>
            <div id="legenda-box">
            <h6><b>Cor da 2° Coluna</b></h6>
            <div v-for="(cor2, index) in legendaColors2" class="color-conteiner"> 
              <div class="cor-p1" :style=back+cor2.style+as+border+cor2.style+as ></div>
                <p>{{cor2.nome}} </p>
              </div>
            </div>
  
        </div>
        <div class="col l12" style="display:inline-block; margin: 0 auto;">
          <table>
              <tr>
                  <th>1ª Coluna</th>
                  <th>2ª Coluna</th>
                  <th>Máquina</th>
                  <th>Descrição do Produto</th>
                  <th>OEE</th>
              </tr>
                <tr v-for="(pt, index) in pts" class="teste" id="circle1">
                    <td><div class="quadrado-icons" :style=back+pt.icone.caminhoIcone></div></td>
                    <td><div class="quadrado-icons" :style=back+pt.icone.corTriangulo></div></td>
                    <td :style=color+pt.icone.caminhoIcone>{{ pt.cdPt}}</td>
                    <td :style=color+pt.icone.caminhoIcone>{{ pt.dsProduto}}</td>
                    <td :style=color+pt.icone.caminhoIcone>{{ pt.indicadores.indiceProdutividadeOEE}}%</td>
                </tr>
              
          </table>
      </div>
    </div>
   
  </div>

  </template>
<script>
import Preloader from '../components/Preloader.vue'
import axios from 'axios'
export default {
  name: 'Maquinas',
  components: {
    Preloader
  },
  created () {
        setInterval(() => {
             this.getMaquinas();
        }, 15000)
    },
  data(){
    return{
        galpaoName : sessionStorage.getItem('galpaoName'),
      cd: '000001',
      info: null,
      color: 'color: ',
      back: 'background-color: ',
      border: ' border-bottom: 20px solid ',
      pts: null,
      turno : null,
      maquinas : undefined,
      legendaColors1 : [
        {nome:'Parada', style: '#c0392b'},
        {nome:'Na Meta', style: '#4cd137'},
        {nome:'Fora da Meta', style: '#f1c40f'},
        {nome:'Offline', style: 'rgb(135, 135, 135)'}
            ],
      legendaColors2: [
        {nome:'Em Alerta', style: '#f1c40f'},
        {nome:'Sem Planejamento', style: 'blue'},
        {nome:'90% Op Concluída', style: 'rgb(27, 26, 90)'},
        {nome:'Planejamneto Concluído', style: 'rgb(45, 238, 235)'},
        {nome:'Índice de Refugo Maior que 5%', style: 'rgb(142, 142, 142)'},
        {nome:'Parada sem Peso na Eficiência', style: 'rgb(235, 23, 192)'},
        {nome:'Parada não Informada', style: 'rgb(0, 0, 0)'},
        {nome:'CIP(Controle Início Processo)', style: 'rgb(115, 239, 111)'},
        {nome:'Sem Ocorrências', style: '#ffff'}
    ]
    }
  },
  methods:{
    getMaquinas(){
        var contador = 0;
        var ptsGlobal;
        var ultimaAtualizacao;
        var globalRequest;

        function getToday(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var h = today.getHours(), m = today.getMinutes(), s = today.getSeconds()
            
            if(String(today.getHours()).length < 2){
                h = '0'+String(today.getHours())
            }
            if(String(today.getMinutes()).length < 2){
                m = '0'+String(today.getMinutes())
            }
            if(String(today.getSeconds()).length < 2){
                s = '0'+String(today.getSeconds())
            }
            today = mm + '/' + dd + '/' + yyyy + "  " + h+":"+m+":"+s
            return today;
        }
            const today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var year = new Date().getFullYear()
            var mes = new Date().getMonth()+1
            this.info = `${dd}/${mes}/${year}`
        axios
        .get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnoAtual`)
        .then(turnoAtual => {
        this.turno = turnoAtual.data.idTurno
            axios.post(`http://170.10.0.208:8080/idw/rest/v2/injet/monitorizacao/postosativos`, {
                idTurno: turnoAtual.data.idTurno,
                filtroOp: 0,
                cdGt: this.cd,
                turnoAtual: true,
                dtReferencia: `${dd}/${mes}/${year}`
            })
            .then(res => {         
                ptsGlobal = res;
                
                ultimaAtualizacao = getToday()
                
                let abaixoMeta = [], semConexao = [], naMeta = [], parada = [], pts = [], pts_ = [];
                
                res.data.pts.forEach(pt => {
                    if(pt.dsProduto !== undefined) {
                        if(pt.dsProduto.indexOf('\n') !== -1)
                            pt.dsProduto = pt.dsProduto.substring(0, pt.dsProduto.indexOf('\n'));
                    }

                    if(pt.icone.caminhoIcone.includes('AbaixoMeta')) {
                        pt.icone.caminhoIcone = '#f1c40f';
                        abaixoMeta.push(pt);
                    }
                    if(pt.icone.caminhoIcone.includes('SemConexao')) {
                        pt.icone.caminhoIcone = '#7f8c8d';
                        semConexao.push(pt);
                    }
                    if(pt.icone.caminhoIcone.includes('NaMeta')) {
                        pt.icone.caminhoIcone = '#4cd137';
                        naMeta.push(pt);
                    }
                    if(pt.icone.caminhoIcone.includes('Parada')) {
                        pt.icone.caminhoIcone = '#c0392b';
                        parada.push(pt);
                    }
                });
                pts = pts.concat(naMeta, abaixoMeta, parada, semConexao);
        
                if(typeof this.maquinas === 'string'  ){            
                    if (this.maquinas) {
                        pts_ = pts_.concat(pts.filter((pt) => {
                            if (pt.cdPt === this.maquinas) 
                            return pt;
                        }));
                        pts = pts_;
                    }
                }
                if(typeof this.maquinas === 'undefined' || typeof this.maquinas === 'object'  ){            
                    if (this.maquinas) {
                        this.maquinas.forEach((maquina) => {
                            pts_ = pts_.concat(pts.filter((pt) => {
                                if (pt.cdPt === maquina) 
                                return pt;
                            }));
                        });
                        pts = pts_;
                    }
                }
                
                this.pts = pts
                this.turno = res
                
            })
            .catch((error) => {this.turno = error});
        })
        .catch(errorTurnoAtual => this.info = errorTurnoAtual)
    }
  },
  mounted () {
    this.cd = sessionStorage.getItem('galpao')
    this.getMaquinas();
    
  }
}
</script>

<style scoped>

html{
    --tema-padrao: #0077FF;
    --bg: #FCFCFC;
    --bg-panel: #EBEBEB;
    --bg-container: rgba(0, 0, 0, 0.1);
    --secundary-color: #FCFCFC;
    --color: rgba(0, 0, 0, 0.8);
    --color-headings: #0077FF;
    --color-text: #333333;
    --color-title: #262626;
}
body{
    background-color: var(--bg);
}
h1, h2, h3, h4, h5, h6, p, label, th{
    color: var(--color-text);
}

.flex, .descricao {
    display: flex;
}
    .item {
        margin: 0;
        text-align: center;
        font-size: 2.0em;
        flex: 1;
        text-shadow: 1px 0px rgb(24, 24, 24);

    }
    .descricao {
        align-items: center;
        flex:2;        
    }
    .grow0 {
        flex-grow: 0;
    }
    .grow1 {
        flex-grow: 1;
    }

.container {
    font-size: .85vw;
    
    display:flex;
}
span {
    font-size: 21px;
    color: black;
    font-weight: bold;
}
#legenda-box{
    background-color: rgba(0, 0, 0, 0.1);
    width:230px;
    border-radius: 5px;
    margin: 0 auto;
    padding: 10px;
    margin-top: 10px;
}
.color-conteiner{
    display: flex;
    margin-bottom: 5px;
}
.cor-p{
    width: 20px;
    height: 20px;
    margin: 0 10px;
    box-shadow: 1px 1px rgb(37, 37, 37);
    
} 
.cor-p1{
    content: "";
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 0; 
    height: 0; 
    box-shadow: 1px 1px rgb(37, 37, 37);
    border-left: 20px solid transparent;
    border-right: 0px solid transparent;
    margin: 0 10px;
}
h6{
    margin: 10 0;
}
p{
    font-size: 1em;
    margin: 0;
    padding: 0;
}
.legends{
    display:inline-block;
    float:left;
}
h2{
    font-size: 3em;
}
h3{
    font-size:2.5em;
}
h5{
    font-size: 0.9em;
}

#updateMachine{
    position: absolute;
    bottom: 0.056%;
    left:  1%;
}
.quadrado-icons{
    width: 30px;
    height: 30px;
    box-shadow: 1px 1px var(--color-text);
    margin: 0 auto;
}
.row{
    margin:10px;
    padding: 10px 1px;
}
.row-g{
    flex:1;
}

table{
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    margin: 10px 8px;
}
tr{
    font-size: 1em;
   
}
td{
    text-shadow: 1px 0px var(--color-text);
    
}
th, td{
    font-family: 'Arial';
    text-align: center;
    
}
tr:hover{
    background-color: rgba(0, 0, 0, 0.04);
}
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 65px;
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
@media(max-height: 480px) and (max-width:640px){
    img{
        width: 50px;
        height: 50px;
    }
    span{
        font-size: 14px;
    }
    h3{
        font-size: 16px;
        
    }
    .material-icons{
        font-size:30px;
    }
    div.item.flex-item-1{
        font-size:11px;
        margin-right: 55px;
        margin-bottom: -10px;
    }
    div.item.flex-item-1 i {
        margin-right: -40px;
    }
}
@media(min-width: 641px)and(max-width: 800px ){
    img{
        width: 75px;
        height: 75px;
    }
    span{
        font-size: 14px;
    }
    h3{
        font-size: 17px;
        margin-bottom: 0;
        
    }
    .material-icons{
        font-size:35px;
    }
    div.item.flex-item-1{
        font-size:14px;
        margin-right: 85px;
        margin-bottom: -20px;
    }
    div.item.flex-item-1 i {
        margin-right: -40px;
    }
}
@media(min-width: 801px)and(max-width: 854px ){
    img{
        width: 75px;
        height: 75px;
    }
    span{
        font-size: 14px;
    }
    h3{
        font-size: 17px;
        margin-bottom: 0;
        
    }
    .material-icons{
        font-size:40px;
    }
    div.item.flex-item-1{
        font-size:14px;
        margin-right: 85px;
        margin-bottom: -20px;
    }
    div.item.flex-item-1 i {
        margin-right: -40px;
    } 
}
@media(min-height: 481px)and(max-height: 640px ){
    img{
        width: 75px;
        height: 75px;
    }
    span{
        font-size: 16px;
    }
    h3{
        font-size: 20px;
        margin-bottom: -10;        
    }
    .material-icons{
        font-size:45px;
    }
    div.item.flex-item-1{
        font-size:25px;
        margin-right: 85px;
        margin-bottom: -20px;
    }
    div.item.flex-item-1 i {
        margin-right: -40px;
    } 
}
@media(min-height: 641px)and(max-height: 750px ){
    img{
        width: 85px;
        height: 85px;
    }
    span{
        font-size: 16px;
    }
    h3{
        font-size: 25px;
        margin-bottom: -10;        
    }
    .material-icons{
        font-size:50px;
    }
    div.item.flex-item-1{
        font-size:20px;
        margin-right: 85px;
        margin-bottom: -20px;
    }
    div.item.flex-item-1 i {
        margin-right: -40px;
    } 
}
</style>
