<template>
    <div class="produtividade"> 
      <Preloader />
      <h1 class=center-align>Produtividade - {{ galpaoName }}<span id=galpao></span></h1>
      <div>
          <div class="row speedometer">
                          <div class="col l3">
                              <div class="row flex center-align">
                                  <div class=canvas-container>
                                      <canvas class=Gauge id=eficiencia></canvas>
                                  </div>
                              </div>
                              <div class="row center-align">
                                  <strong>Eficiência (<span id=eficienciaValue>{{indicadores.eficiencia}}</span>)</strong>
                              </div>
                          </div>
                          <div class="col l3">
                              <div class="row flex">
                                  <div class=canvas-container>
                                      <canvas class=Gauge id=oee></canvas>
                                  </div>
                              </div>
                              <div class="row center-align">
                                  <strong>OEE (<span id=oeeValue>{{indicadores.indOEE}}</span>)</strong>
                              </div>
                          </div>
                          <div class="col l3">
                              <div class="row flex">
                                  <div class=canvas-container>
                                      <canvas class=Gauge id=utilizacao></canvas>
                                  </div>
                              </div>
                              <div class="row center-align">
                                  <strong>Utilização (<span id=utilizacaoValue>{{indicadores.indUtilizacao}}</span>)</strong>
                              </div>
                          </div>
                          <div class="col l3">
                              <div class="row flex">
                                  <div class=canvas-container>
                                      <canvas class=Gauge id=refugo></canvas>
                                      </div>
                              </div>
                              <div class="row center-align">
                                  <strong>Refugo (<span id=refugoValue>{{indicadores.indRef}}</span>)</strong>
                              </div>
                          </div>
          </div>
           
          <table class="tabela_p">
              <thead>
                  <th>*</th>
                      <th v-for="(indicadoresTurno, index) in bi">{{indicadoresTurno.dsTurno}}</th>
                  <th>ACUMULADO MÊS</th>
              </thead>     
                  <tr>
                      <td>% Produtividade  OEE</td>
                      <th v-for="(indicadoresTurno, index) in bi">{{indicadoresTurno.indicadores.indOEE}}</th>
                      <td>{{indicadores.indOEE}}%</td>
                  </tr>
              
              <tr>
                  <td>% Eficiência</td>
                  <th v-for="(indicadoresTurno, index) in bi">{{indicadoresTurno.indicadores.eficiencia}}</th>
                  <td>{{indicadores.eficiencia}}%</td>
              </tr>
              <tr>
                  <td>% Utilização</td>
                  <th v-for="(indicadoresTurno, index) in bi">{{indicadoresTurno.indicadores.indUtilizacao}}</th>
                  <td>{{indicadores.indUtilizacao}}%</td>
              </tr>
              <tr>
                  <td>% Refugo</td>
                  <th v-for="(indicadoresTurno, index) in bi">{{indicadoresTurno.indicadores.indRef}}</th> 
                  <td>{{indicadores.indRef}}%</td>
              </tr>
          </table>
      </div>
      <h2 class="ultima-atualizacao">Ultima atualizacão: {{ ultimaAtualizacao }}</h2>
  
    </div>
  </template>
  <script>
  import '../css/produtividade.css'
  import Preloader from '../components/Preloader.vue'
  import Velocimetros from '../components/Velocimetros.vue'
  import axios from 'axios'
  import $ from 'jquery'
  export default{
      components :{
          Velocimetros, Preloader
      },
      mounted (){
          this.cd = sessionStorage.getItem('galpao');
          document.title = `Produtividade Planta - ${sessionStorage.getItem('galpaoName')}`
       
      },
      created () {
          this.getFirstProdutividade();
          setInterval(() =>{
              if(sessionStorage.getItem('maquinas') == 'true'){
                window.location.href = '/maquinas'
              }
              else if(sessionStorage.getItem('paradas') == 'true'){
                window.location.href = '/parada'
              }
              else{
                window.location.reload();
              }
          }, 20000)
      },
      data() {
          return {
              ultimaAtualizacao : null,
              ip : require('/src/config/config.env').API_URL,
              galpaoName : sessionStorage.getItem('galpaoName'),
              errorCode: '',
              cd: '000001',
              bi : null,
              indicadores : {},
              velocimetro : {}, 
              turnos: null,
              info : 0,
  
          }
      },
      methods:{
          getToday(){
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = today.getFullYear();
              var h = String(today.getHours());
              var m = String(today.getMinutes());
              var s = String(today.getSeconds());
              if(h.length == 1){
                  h = '0'+h;
              }
              if(m.length == 1){
                  m = '0'+m;
              }
              if(s.length == 1){
                  s = '0'+s;
              }
              today = dd + '/' + mm + '/' + yyyy + "  " + h+":"+m+":"+s;
  
              
              return today;
          },
           getGauge(){
              $.fn.gauge = function (opts) {
                  this.each(function () {
                      var $this = $(this),
                          data = $this.data();
  
                      if (data.gauge) {
                          data.gauge.stop();
                          delete data.gauge;
                      }
                      if (opts !== false) {
                          data.gauge = new Gauge(this).setOptions(opts);
                      }
                  });
                  return this;
              };
              var speeds = [
                  {
                      id: 'eficiencia',
                      value: this.indicadores.eficiencia
                  },
                  {
                      id: 'oee',
                      value: this.indicadores.indOEE
                  },
                  {
                      id: 'utilizacao',
                      value: this.indicadores.indUtilizacao
                  },
                  {
                      id: 'refugo',
                      value: this.indicadores.indRef
                  }
              ];
              $(function() {
                  speeds.forEach(speed => {
                  var opts = {
                      angle: -0.10, // The span of the gauge arc
                      lineWidth: 0.25, // The line thickness
                      radiusScale: 0.9, // Relative radius
                      limitMax: false,     // If false, max value increases automatically if value > maxValue
                      limitMin: false,     // If true, the min value of the gauge will be fixed
                      generateGradient: true,
                      highDpiSupport: true,     // High resolution support
                      percentColors: [[0.0, "#FF0000" ], [0.50, "#FFFF00"], [1.0, "#39ff14"]],
                      staticLabels: {
                          font: '20px sans-serif',
                          labels: [50, 100],
                          color: '#fff'
                      }
                  };
                  var target = document.getElementById(speed.id); // your canvas element
                  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                  gauge.maxValue = 100; // set max gauge value
                  gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
                  gauge.animationSpeed = 33; // set animation speed (32 is default value)
                  gauge.set(speed.value); // set actual value
              });
              });            
          },
           getFirstProdutividade (){
              this.ultimaAtualizacao = this.getToday()
              var turnoAtualVar;      
              var ultimaAtualizacao;
              function getToday(){
                  var today = new Date();
                  var dd = String(today.getDate()).padStart(2, '0');
                  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                  var yyyy = today.getFullYear();
  
                  today = mm + '/' + dd + '/' + yyyy + "  " + today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
                  
                  return today;
              }
              axios.get(`${this.ip}/idw/rest/injet/monitorizacao/turnoAtual`)
              .then(turnoAtual => {
                  // var diaReferencia = turnoAtual.data.dtReferencia.slice(0, 2);
                  // var mesReferencia = turnoAtual.data.dtReferencia.slice(3, 5);
                  // var anoReferencia = turnoAtual.data.dtReferencia.slice(6, 10);
                  this.info = this.c++;
                  function formatDate(date, format) {
                      const map = {
                          mm: date.getMonth() + 1,
                          dd: date.getDate(),
                          aa: date.getFullYear().toString().slice(-2),
                          aaaa: date.getFullYear()
                      }
                      return format.replace(/mm|dd|aa|aaaa/gi, matched => map[matched])
                  }
                  const today = new Date();
                  var dd = String(new Date().getDate()).padStart(2, '0');
                  var year = String(new Date().getFullYear());
                  var mes = String(new Date().getMonth()+1);
                  if(mes.length == 1){
                      mes = "0"+mes;
                  }
                  var data = formatDate(today, 'aaaa-mm-dd')
                  turnoAtualVar = turnoAtual.data.cdTurno
                  this.info = this.c++;
                  axios
                  .all([
                      axios.post(`${this.ip}/idw/rest/injet/bi/resumoBI`, {
                          cdGalpao: this.cd,
                          agrupamentoBI: 2,
                          cdTurno: turnoAtual.data.cdTurno,
                          dtIni: year + "-" + mes +  "-" + dd,
                          dtFim: year + "-" + mes +  "-" + dd,
                      }),
                      axios.post(`${this.ip}/idw/rest/injet/bi/resumoBI`, {                
                          anoIni: year,
                          mesIni: mes,
                          anoFim: year,
                          mesFim: mes,
                          cdGalpao: this.cd,
                          agrupamentoBI: 1,
                      }),
                      axios.get(`${this.ip}/idw/rest/injet/monitorizacao/turnos`)
                  ])
                  .then(axios.spread((velocimetro, bi, turnos) => {
                        
                      this.info = bi.data.indicadores  
                      this.bi = bi.data.indicadoresTurno
                      this.indicadores = bi.data.indicadores
                      this.velocimetro = velocimetro.data.indicadores
                      this.turnos = turnos.data.turnos
                      $('#preloader').fadeIn().toggleClass('hide');           
                          this.getGauge();  
     
                  }))
                  // .catch(errorBI => response.status(500).render('error', {error: 'json.stringify(errorBI)'}));
                  .catch(errorBI => this.info = errorBI);
  
              })
              //.catch(errorTurnoAtual => response.status(500).render('error', {error: errorTurnoAtual}));
              .catch(errorTurnoAtual => this.info = errorTurnoAtual);
          }
      },
  }
</script>