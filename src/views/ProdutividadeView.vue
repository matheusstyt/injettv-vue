<template>
  <div class="produtividade">
    <h1 class=center-align>Produtividade <span id=galpao></span></h1>
    <div>
        <!-- <div class="row speedometer">
            <div class="col l3">
                <div class="row flex center-align">
                    <div class=canvas-container>
                        <canvas class=Gauge id=eficiencia></canvas>
                    </div>
                </div>
                <div class="row center-align">
                    <strong>Eficiência (<span id=eficienciaValue>{{velocimetro.indicadores.eficiencia}}</span>)</strong>
                </div>
            </div>
            <div class="col l3">
                <div class="row flex">
                    <div class=canvas-container>
                        <canvas class=Gauge id=oee></canvas>
                    </div>
                </div>
                <div class="row center-align">
                    <strong>OEE (<span id=oeeValue>{{velocimetro.indicadores.indOEE}}</span>)</strong>
                </div>
            </div>
            <div class="col l3">
                <div class="row flex">
                    <div class=canvas-container>
                        <canvas class=Gauge id=utilizacao></canvas>
                    </div>
                </div>
                <div class="row center-align">
                    <strong>Utilização (<span id=utilizacaoValue>{{velocimetro.indicadores.indUtilizacao}}</span>)</strong>
                </div>
            </div>
            <div class="col l3">
                <div class="row flex">
                    <div class=canvas-container>
                        <canvas class=Gauge id=refugo></canvas>
                    </div>
                </div>
                <div class="row center-align">
                    <strong>Refugo (<span id=refugoValue>{{velocimetro.indicadores.indRef}}</span>)</strong>
                </div>
            </div>
        </div> -->
         <!-- <thead>
            <th></th>
            <% turnos.forEach(function(turno){ %>
                <th><%=turno.dsTurno%></th>
            <% }); %>
            <th>Acumulado mês</th>
        </thead>      -->
        <table>
            <tr>
                <th></th>
                    <th v-for="(indicadoresTurno, index) in bi.indicadoresTurno">{{indicadoresTurno.dsTurno}}</th>
                <th>ACUMULADO MÊS</th>
            </tr>
            <tr>
                <td>% Produtividade  OEE</td>
                <th v-for="(indicadoresTurno, index) in bi.indicadoresTurno">{{indicadoresTurno.indOEE}}</th>
                <td>{{bi.indicadores.indOEE}}%</td>
            </tr>
            <tr>
                <td>% Eficiência</td>
                <th v-for="(indicadoresTurno, index) in bi.indicadoresTurno">{{indicadoresTurno.eficiencia}}</th>
                <td>{{bi.indicadores.eficiencia}}%</td>
            </tr>
            <tr>
                <td>% Utilização</td>
                <th v-for="(indicadoresTurno, index) in bi.indicadoresTurno">{{indicadoresTurno.indUtilizacao}}</th>
                <td>{{bi.indicadores.indUtilizacao}}%</td>
            </tr>
            <tr>
                <td>% Refugo</td>
                <th v-for="(indicadoresTurno, index) in bi.indicadoresTurno">{{indicadoresTurno.indRef}}</th> 
                <td>{{bi.indicadores.indRef}}%</td>
            </tr>

        </table>
        <!-- <div class="col l12">  
            <div class=row>
                <table class="centered striped">
                    <thead>
                        <th></th>
                        <% turnos.forEach(function(turno){ %>
                            <th><%=turno.dsTurno%></th>
                        <% }); %>
                        <th>Acumulado mês</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>% Produtividade OEE</td>
                            <% bi.indicadoresTurno.forEach(function(indicadoresTurno){ %>
                                <td><%=indicadoresTurno.indicadores.indOEE%>%</td>
                            <% }); %>
                            <td><%=bi.indicadores.indOEE%>%</td>
                        </tr>
                        <tr>
                            <td>% Eficiência</td>
                            <% bi.indicadoresTurno.forEach(function(indicadoresTurno){ %>
                                <td><%=indicadoresTurno.indicadores.eficiencia%>%</td>
                            <% }); %>
                            <td><%=bi.indicadores.eficiencia%>%</td>
                        </tr>
                        <tr>
                            <td>% Utilização</td>
                            <% bi.indicadoresTurno.forEach(function(indicadoresTurno){ %>
                                <td><%=indicadoresTurno.indicadores.indUtilizacao%>%</td>
                            <% }); %>
                            <td><%=bi.indicadores.indUtilizacao%>%</td>
                        </tr>
                        <tr>
                            <td>% Refugo</td>
                            <% bi.indicadoresTurno.forEach(function(indicadoresTurno){ %>
                                <td><%=indicadoresTurno.indicadores.indRef%>%</td>
                            <% }); %>
                            <td><%=bi.indicadores.indRef%>%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> -->
    </div>
    {{info}}
  </div>
</template>
<script>
import axios from 'axios'
export default{
  data(){
    return{
      cd: '000001',
      info:null,
      bi : null,
      velocimetro : null, 
      turnos: null,
    }
  },
  mounted(){
    var turnoAtualVar;
    const ip = 'http://170.10.0.208:8080'
    const dataTeste = "2020-01-21";
    const data = require('./date');
    var contador = 0;
    var velocimetroGlobal;
    var biGlobal;
    var turnoGlobal;
    var ultimaAtualizacao;
    var globalRequest;

    function retornaMes(){

            if (data.getMonth(new Date()) < 10){

                return "0" + data.getMonth(new Date())
            } else{

                return data.getMonth(new Date())
            }
    }

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
    // setInterval(function(){  
    //     produtividadeTask(request);
    // }, 600000);
    axios
    .get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnoAtual`)
    .then(turnoAtual => {
        turnoAtualVar = turnoAtual.data.cdTurno
        axios
        .all([
            axios.post(`http://170.10.0.208:8080/idw/rest/injet/bi/resumoBI`, {
                cdGalpao: this.cd,
                agrupamentoBI: 2,
                cdTurno: turnoAtual.data.cdTurno,
                dtIni: data.getYear(new Date()) + "-" + retornaMes() +  "-" + data.day(new Date()),
                dtFim: data.getYear(new Date()) + "-" + retornaMes() +  "-" + data.day(new Date())
            }),
            axios.post(`http://170.10.0.208:8080/idw/rest/injet/bi/resumoBI`, {                
                anoIni: data.getYear(new Date()),
                mesIni: retornaMes(),
                anoFim: data.getYear(new Date()),
                mesFim: retornaMes(),
                cdGalpao: this.cd,
                agrupamentoBI: 1,
            }),
            axios.get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnos`)
        ])
        .then(axios.spread((velocimetro, bi, turnos) => {       
               
            
            // this.info = {
            //   velocimetroGlobal : velocimetro,
            //   biGlobal : bi,
            //   turnoGlobal : turnos,
            //   ultimaAtualizacao : getToday(),
            // }
            this.bi = bi.data
            this.velocimetro = velocimetro.data
            this.turnos = turnos.data.turnos
            this.info = {
              bi : bi.data,
              velocimetro : velocimetro.data,
              turnos : turnos.data.turnos
            }
            // response.status(200).render('produtividade', {
            //     velocimetro: velocimetro.data,
            //     bi: bi.data,
            //     turnos: turnos.data.turnos,
            //     secondsTransition: request.session.cfg.tempo_trans,
            //     cor_fundo: request.session.cfg.cor_fundo,
            //     nextPage: panel.switch(request.baseUrl, request.session.paineis),
            //     logo: logo.hasLogo(),
            //     ultimaAtualizacao : getToday()
            // }); 
        }))
        // .catch(errorBI => response.status(500).render('error', {error: 'json.stringify(errorBI)'}));
        .catch(errorBI => this.info = errorBI);

      })
      //.catch(errorTurnoAtual => response.status(500).render('error', {error: errorTurnoAtual}));
      .catch(errorTurnoAtual => this.info = errorTurnoAtual);
  
    
    async function produtividadeTask(request){   
    console.log("Fez chamada de produtividade na thread as " + getToday());
    await axios
    .get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnoAtual`)
    .then(turnoAtual => {   
      console.log("entrou no metodo task");
      axios
      .all([
          axios.post(`http://170.10.0.208:8080/idw/rest/injet/bi/resumoBI`, {
              cdGalpao: this.cd,
              agrupamentoBI: 2,
              cdTurno: turnoAtual.data.cdTurno,                            
              dtIni: data.getYear(new Date()) + "-" + retornaMes() +  "-" + data.day(new Date()),
              dtFim: data.getYear(new Date()) + "-" + retornaMes() +  "-" + data.day(new Date())
          }),
          axios.post(`http://170.10.0.208:8080/idw/rest/injet/bi/resumoBI`, {                
              anoIni: data.getYear(new Date()),
              mesIni: retornaMes(),
              anoFim: data.getYear(new Date()),
              mesFim: retornaMes(),
              cdGalpao: this.cd,
              agrupamentoBI: 1,
          }),
          axios.get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnos`)
      ])
      .then(axios.spread((velocimetro, bi, turnos) => {
                                
              velocimetroGlobal = velocimetro;
              biGlobal = bi;
              turnoGlobal = turnos;  
              ultimaAtualizacao = getToday();
              this.bi = bi.data
              this.velocimetro = velocimetro.data
              this.turnos = turnos.data.turnos


      }))
      .catch(errorBI => console.log('teste', errorBI));
      } )
    .catch(errorTurnoAtual => console.log('teste 1', errorTurnoAtual));
  
    }      
  }
}
  
</script>