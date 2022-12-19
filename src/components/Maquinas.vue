<template>
    <div class="maquinas">
        <h1 align="center">Performance Máquinas</h1>
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
  export default {
    name: 'Maquinas',
    components: {
    },
    props:{
        pts: null,
        turno : null,
    },
    data(){
      return{
        as: ';',
        color: 'color: ',
        back: 'background-color: ',
        border: ' border-bottom: 20px solid ',
        maquinas : undefined,
        cd : '000001',
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
    mounted () {
    
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
    font-size: 2em;
    
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
  