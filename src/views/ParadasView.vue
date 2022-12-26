<template>
    <div class="paradas">
      <h1 class=center-align>Paradas | Alertas - {{ galpaoName }}</h1>

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
          <div >
            <h2 class="ultima-atualizacao">Ultima atualizacão: {{ ultimaAtualizacao }}</h2>
          </div>
    </div>
  
    </template>
  <script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'
  import { isIntegerKey } from '@vue/shared'
  import axios from 'axios'
  export default {
      name: 'Maquinas',
    components: {
          
    },
    created () {
        setInterval(() => {
            this.getParadas()      
        }, 15000)
    },
    data(){
        return{
            errorF(error){
                sessionStorage.setItem('error', error)
                window.location.href = '/error'
            },
            ultimaAtualizacao : null,
            ip : require('/src/config/config.env').API_URL,
            galpaoName : sessionStorage.getItem('galpaoName'),
            cd :'000001',
            color: 'color: ',
            pts: null,
            turno : null,
            maquinas : undefined,
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
      methods:{
        getToday(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy + "  " + today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
            
            return today;
        },
          async getParadas(){
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
              this.ultimaAtualizacao = this.getToday()
              await axios.all([        
                  axios.get(`${this.ip}/idw/rest/injet/paradas/pesquisaParadasByGalpao` ,{params: {cdGalpao:this.cd}}),
                  axios.get(`${this.ip}/idw/rest/injet/alertas/pesquisaAlertasByGalpao`,{params: {cdGalpao:this.cd}})
              ])
              .then(
                  axios.spread((paradas, alertas) => {
  
                  let alerta = [], parada = [], pts = [], pts_ = [];
                  
                  // FORMATANDO O HORÁRIO
                  let formatado = ''
                  for (var par = 0; par < paradas.data.paradasGalpao.length;par++ ){
                      
                      let tempoFormatado = paradas.data.paradasGalpao[par].tempoParado.split(":");
  
                      if( tempoFormatado[0].length < 2 ){
                          tempoFormatado[0] = '0'+tempoFormatado[0]
                      }
                      if( tempoFormatado[1].length < 2 ){
                          tempoFormatado[1] = '0'+tempoFormatado[1]
                      }
                      if( tempoFormatado[2].length < 2 ){
                          tempoFormatado[2] = '0'+tempoFormatado[2]
                      }
  
                      formatado = tempoFormatado[0]+':'+tempoFormatado[1]+':'+tempoFormatado[2]
                  
                      parada.push({
                          cdPt: paradas.data.paradasGalpao[par].cdInjetora,
                          tempo: formatado,
                          descricao: paradas.data.paradasGalpao[par].dsParada,
                          cor: '#ff0000'
                      });
                  }
  
                  for (var ale = 0; ale < alertas.data.alertasGalpao.length;ale++ ){
                      
                      let alertaFormatado = alertas.data.alertasGalpao[ale].tempoAlerta.split(":");
                      //console.log('opa : '+alertas.data.alertasGalpao[ale].tempoAlerta)
                      if( alertaFormatado[0].length < 2 ){
                          alertaFormatado[0] = '0'+alertaFormatado[0]
                      }
                      if( alertaFormatado[1].length < 2 ){
                          alertaFormatado[1] = '0'+alertaFormatado[1]
                      }
                      if( alertaFormatado[2].length < 2 ){
                          alertaFormatado[2] = '0'+alertaFormatado[2]
                      }
  
                      formatado = alertaFormatado[0]+':'+alertaFormatado[1]+':'+alertaFormatado[2]
                      //console.log('formatado : '+formatado)
                      alerta.push({
                          cdPt: alertas.data.alertasGalpao[ale].cdInjetora,
                          tempo: formatado,
                          descricao: alertas.data.alertasGalpao[ale].dsAlerta,
                          cor: '#ff8b16'
                      });
                      //console.log(alertas.data[ale])
                  }
                  //console.log("3")
  
                  pts = pts.concat(parada, alerta);
  
                  if(sessionStorage.getItem('maquinasList') != 'null'){   
                    var maquinas = JSON.parse(sessionStorage.getItem('maquinasList'))
                     maquinas.forEach((maquina) => {
                        pts.forEach((pt) =>{
                            if (pt.cdPt == maquina) 
                                pts_.push(pt)
                        })
                     });
                     this.info = pts_
                    pts = pts_;
                };      
                  this.pts = pts
              }))
              .catch(error => this.errorF(error));
          }
      },
  
    mounted () {
        this.cd = sessionStorage.getItem('galpao')
        this.getParadas()
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
  .ultima-atualizacao{
    position: absolute; 
    bottom: 1%; 
    left: 1%;
    color: #1d1d1d;
    font-size: 2.4vmax;
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
    width: auto;
      background-color: rgba(0, 0, 0, 0.01);
      border-radius: 5px;
      margin: 2vmax auto;
      
  }
  tr{
      font-size: 1em;
  }
  td{
      text-shadow: 1px 0px var(--color-text);
      
  }
  th, td{
    padding: 1vmax;
    
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