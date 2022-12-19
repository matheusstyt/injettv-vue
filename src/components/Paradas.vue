<template>
    <div class="paradas">
      <h1 class=center-align>Paradas | Alertas</h1>
        <div class="container">
            <table>
                <tr>
                    <th>MÁQUINA</th>
                    <th>DESCRIÇÃO</th>
                    <th>DURAÇÃO (HH:MM:SS)</th>
                </tr>
                <tr v-for="(pt, index) in pts" class="teste" id="circle1">
                    <td :style=color+pt.cor><b>{{ pt.cdPt}}</b></td>
                    <td :style=color+pt.cor><b>{{ pt.descricao}}</b></td>
                    <td :style=color+pt.cor><b>{{ pt.tempo}}</b></td>
                </tr>
            </table>
          </div>
    </div>
  
    </template>
  <script>
  export default {
    name: 'Maquinas',
    components: {
      
    },
    props:{
        pts: Object,
        turno : Object,
    },
    data(){
      return{
        color: 'color: ',

        maquinas : undefined,
        cd : '000001',
        legendaColors1 : [
          {nome:'Parada', color: '#c0392b'},
          {nome:'Na Meta', color: '#4cd137'},
          {nome:'Fora da Meta', color: '#f1c40f'},
          {nome:'Offline', color: 'rgb(135, 135, 135)'}
              ],
        legendaColors2 : [
          {nome:'Em Alerta', color: '#f1c40f'},
          {nome:'Sem Planejamento', color: 'blue'},
          {nome:'90% Op Concluída', color: 'rgb(27, 26, 90)'},
          {nome:'Planejamneto Concluído', color: 'rgb(45, 238, 235)'},
          {nome:'Índice de Refugo Maior que 5%', color: 'rgb(142, 142, 142)'},
          {nome:'Parada sem Peso na Eficiência', color: 'rgb(235, 23, 192)'},
          {nome:'Parada não Informada', color: 'rgb(0, 0, 0)'},
          {nome:'CIP(Controle Início Processo)', color: 'rgb(115, 239, 111)'},
          {nome:'Sem Ocorrências', color: '#ffff'}
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
          margin: 5px;
          background: tomato;
          text-align: center;
          font-size: 2.0em;
          flex: 1;
          text-shadow: 1px 0px 0px black, 
          -1px 0px 0px black, 
          0px 1px 0px black, 
          0px -1px 0px black;
      }
      .grow0 {
          flex-grow: 0;
      }
      .grow1 {
          flex-grow: 1;
      }
  
  
  .container {
      font-size: .85vw;
  }
  span {
      font-size: 21px;
      color: black;
      font-weight: bold;
  }
  table{
      background-color: rgba(0, 0, 0, 0.01);
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
    #updateParadas{
      position: absolute;
      bottom: 0.056%;
      left:  1%;
      font-size: 2.5em;
  }
    @media(max-height: 480px) and (max-width:640px) {
      img{
          width: 75px;
          height: 75px;
      }
      span{
          font-size: 14px;
      }
      h1{
          font-size: 20px;
          
      }
      .material-icons{
          font-size:30px;
      }
      div.item.flex-item-1{
          font-size:18px;        
          margin-bottom: -15px;
          padding-left: 5%;
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
      h1{
          font-size: 25px;
          
      }
      div.item.flex-item-1{
          font-size:18px;        
          margin-bottom: -15px;
          padding-left: 16%;
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
      h1{
          font-size: 25px;
          
      }
      div.item.flex-item-1{
          font-size:18px;        
          margin-bottom: -15px;
          padding-left: 16%;
      }
  }
  @media(min-height: 481px)and(max-height: 640px ){
      img{
          width: 75px;
          height: 75px;
      }
      span{
          font-size: 14px;
      }
      h1{
          font-size: 25px;
          
      }
      div.item.flex-item-1{
          font-size:28px;        
          margin-bottom: -15px;
          
      } 
  }
  @media(min-height: 641px)and(max-height: 750px ){
      img{
          width: 75px;
          height: 75px;
      }
      span{
          font-size: 14px;
      }
      h1{
          font-size: 25px;
          
      }
      div.item.flex-item-1{
          font-size:20px;        
          margin-bottom: -15px;
          padding-left: 15%;
      } 
  }
  </style>