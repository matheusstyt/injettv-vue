<template>
  <div class="produtividade">
    {{ errorCode }}
    <!-- <component v-bind:is="display" 
    :oee="oee" 
    :eficiencia="16" 
    :refugo="80" 
    :utilizacao="100" ></component> -->

    <!-- <Velocimetros 
        :oee="7" 
        :eficiencia="16" 
        :refugo="80" 
        :utilizacao="100" 
        /> -->
    <h1 class=center-align>Produtividade <span id=galpao></span></h1>
    <div>
        <div class="row speedometer">
                        <div class="col l3">
                            <div class="row flex center-align">
                                <div class=canvas-container>
                                    <canvas class=Gauge id=eficiencia></canvas>
                                </div>
                            </div>
                            <div class="row center-align">
                                <strong>Eficiência (<span id=eficienciaValue>{{eficiencia}}</span>)</strong>
                            </div>
                        </div>
                        <div class="col l3">
                            <div class="row flex">
                                <div class=canvas-container>
                                    <canvas class=Gauge id=oee></canvas>
                                </div>
                            </div>
                            <div class="row center-align">
                                <strong>OEE (<span id=oeeValue>{{oee}}</span>)</strong>
                            </div>
                        </div>
                        <div class="col l3">
                            <div class="row flex">
                                <div class=canvas-container>
                                    <canvas class=Gauge id=utilizacao></canvas>
                                </div>
                            </div>
                            <div class="row center-align">
                                <strong>Utilização (<span id=utilizacaoValue>{{utilizacao}}</span>)</strong>
                            </div>
                        </div>
                        <div class="col l3">
                            <div class="row flex">
                                <div class=canvas-container>
                                    <canvas class=Gauge id=refugo></canvas>
                                </div>
                            </div>
                            <div class="row center-align">
                                <strong>Refugo (<span id=refugoValue>{{refugo}}</span>)</strong>
                            </div>
                        </div>
        </div>
         <thead>
            <th></th>
                <th v-for="(indicadoresTurno, index) in bi">{{indicadoresTurno.dsTurno}}</th>
            <th>Acumulado mês</th>
        </thead>     
        <table>
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
    <!-- {{indicadores}}
    -->
  </div>
</template>
<script>

import Velocimetros from '../components/Velocimetros.vue'
import axios from 'axios'
import $ from 'jquery'
export default{
    components :{
        Velocimetros,
    },
    mounted (){
        // this.getGauge();  
    },
    created () {
        
        setInterval(() => {              
            // this.getProdutividade()
        }, 10000)
        setInterval(() =>{
            // this.getGauge();  
        }, 15000)
    },
    data() {
        return {
            component : Velocimetros,
            errorCode: '',
            cd: '000001',
            bi : null,
            indicadores : {},
            velocimetro : {}, 
            turnos: null,
            oee : null,
            refugo : null,
            eficiencia : null,
            utilizacao : null,
            opts1 : null,
            opts2 : {
            needleValue: 1,
            arcDelimiters:[1]     
            },
            opts3 : {
            needleValue: 1,
            arcDelimiters:[1]     
            },
            opts4 : {
            needleValue: 1,
            arcDelimiters:[1]     
            },
    
        }
    },
    methods:{
        async getGauge(){
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
                    value: this.eficiencia
                },
                {
                    id: 'oee',
                    value: this.velocimetro.indOEE
                },
                {
                    id: 'utilizacao',
                    value: this.utilizacao
                },
                {
                    id: 'refugo',
                    value: this.refugo
                }
            ];
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
        },
        async getProdutividade (){
            var turnoAtualVar;
            const ip = 'http://170.10.0.208:8080'
            const dataTeste = "2020-01-21";
            var contador = 0;
            var velocimetroGlobal;
            var biGlobal;
            var turnoGlobal;
            var ultimaAtualizacao;
            var globalRequest;
            var count = 0;
            axios
            .get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnoAtual`)
            .then(turnoAtual => {
                var diaReferencia = turnoAtual.data.dtReferencia.slice(0, 2);
                var mesReferencia = turnoAtual.data.dtReferencia.slice(3, 5);
                var anoReferencia = turnoAtual.data.dtReferencia.slice(6, 10);
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
                var year = new Date().getFullYear()
                var mes = new Date().getMonth()+1
                var data = formatDate(today, 'aaaa-mm-dd')
                turnoAtualVar = turnoAtual.data.cdTurno
                axios
                .all([
                    axios.post(`http://170.10.0.208:8080/idw/rest/injet/bi/resumoBI`, {
                        cdGalpao: this.cd,
                        agrupamentoBI: 2,
                        cdTurno: turnoAtual.data.cdTurno,
                        dtIni: anoReferencia + "-" + mesReferencia +  "-" + diaReferencia,
                        dtFim: anoReferencia + "-" + mesReferencia +  "-" + diaReferencia,
                    }),
                    axios.post(`http://170.10.0.208:8080/idw/rest/injet/bi/resumoBI`, {                
                        anoIni: year,
                        mesIni: mes,
                        anoFim: year,
                        mesFim: mes,
                        cdGalpao: this.cd,
                        agrupamentoBI: 1,
                    }),
                    axios.get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnos`)
                ])
                .then(axios.spread((velocimetro, bi, turnos) => {  
                    this.opts2 = { needleValue: 80, arcDelimiters:[80] }     
                    this.bi = bi.data.indicadoresTurno
                    this.indicadores = bi.data.indicadores
                    this.velocimetro = velocimetro.data.indicadores
                    this.turnos = turnos.data.turnos

                    this.oee = parseFloat(this.velocimetro.indOEE)
                    this.refugo = parseFloat(this.velocimetro.indRef)
                    this.eficiencia = parseFloat(this.velocimetro.eficiencia)
                    this.utilizacao = parseInt(this.velocimetro.indUtilizacao)
            
                }))
                // .catch(errorBI => response.status(500).render('error', {error: 'json.stringify(errorBI)'}));
                .catch(errorBI => this.errorCOde = errorBI);

            })
            //.catch(errorTurnoAtual => response.status(500).render('error', {error: errorTurnoAtual}));
            .catch(errorTurnoAtual => this.errorCOde = errorTurnoAtual);
    }
    },
}

</script>
<style>
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
h1, h2, h3, h4, h5, h6, p, label, tr, td, th{
    color: var(--color-text);
}

.flex {
    display: flex;
    
}
.flex .item {
    margin: 5px;
    text-align: center;
    font-size: 1.5em;
    flex: 1;
}

.flex .grow0 {
flex-grow: 0;
}
.flex .grow1 {
flex-grow: 1;
}
div.container {
    font-weight: bold;
}
.canvas-container {
    width: 100%;
    text-align: center;
}

canvas {
    display: inline;
}

.Gauge {
    padding: 10px;
}
.speedometer {
    background-color: var(--tema-padrao);
    color: white; 
}
strong {
    font-size: 40px;
}
table {
    font-size: 1.4em;
}
#updateProduction{
    font-size: 2.5em;
    position: relative;
    margin: 0;}

th {
    font-size:1.1em;
    text-align: center;
}
td {
    font-size:1.4em;
    font-weight: bold;
    text-align: center;
}

img {
    position: absolute;
    right: 0;
    top: 0;
    margin: 25px 25px 0 0;
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
  @media(max-height: 480px)and(max-width: 640px ){
    img{
        margin-top: 0;
        width: 50px;
        height: 50px;
    }
    h1{
        margin-top: 0;
        font-size: 28px;        
    }    
    .center-align strong {
        font-size: 20px;
    }
    span {
        font-size: 20px;
    }
    th {
        font-size: 10px;
    }
    td {
        font-size: 13px;
    }
    .speedometer {
        background-color: #263743;
        color: white;
       
    }
    .speedometer strong {
        font-size: 15px;
    }
    .speedometer span {
        font-size: 15px;
    }
    .material-icons {
        font-size: 10px;
    }
    button {
        font-display: 16px;
    }
    #eficiencia {
        width: 50%;
    }
    #oee {
        width: 50%;
    }
    #utilizacao {
        width: 50%;
    }
    #refugo {
        width: 50%;
    }    
}
  @media(min-width: 641px)and(max-width: 800px ){
    img{
        margin-top: 0;
        width: 50px;
        height: 50px;
    }
    h1{
        margin-top: 0;
        font-size: 28px;        
    }    
    .center-align strong {
        font-size: 20px;
    }
    span {
        font-size: 20px;
    }
    th {
        font-size: 10px;
    }
    td {
        font-size: 13px;
    }
    .speedometer {
        background-color: #263743;
        color: white;
        
    }
    .speedometer strong {
        font-size: 15px;
    }
    .speedometer span {
        font-size: 15px;
    }
    .material-icons {
        font-size: 10px;
    }
    button {
        font-display: 16px;
    }
    #eficiencia {
        width: 61%;
    }
    #oee {
        width: 61%;
    }
    #utilizacao {
        width: 61%;
    }
    #refugo {
        width: 61%;
    }    
}
  @media(min-width: 801px)and(max-width: 854px ){
    img{
        margin-top: 0;
        width: 50px;
        height: 50px;
    }
    h1{
        margin-top: 0;
        font-size: 28px;        
    }    
    .center-align strong {
        font-size: 20px;
    }
    span {
        font-size: 20px;
    }
    th {
        font-size: 10px;
    }
    td {
        font-size: 13px;
        padding-right: 75px;
    }
    .speedometer {
        background-color: #263743;
        color: white;
        
    }
    .speedometer strong {
        font-size: 15px;
    }
    .speedometer span {
        font-size: 15px;
    }
    .material-icons {
        font-size: 10px;
    }
    button {
        font-display: 16px;
    }
    #eficiencia {
        width: 63%;
    }
    #oee {
        width: 63%;
    }
    #utilizacao {
        width: 63%;
    }
    #refugo {
        width: 63%;
    }    
}
  @media(min-height: 481px)and(max-height: 640px ){
    img{
        margin-top: 0;
        width: 50px;
        height: 50px;
    }
    h1{
        margin-top: 0;
        font-size: 28px;        
    }    
    .center-align strong {
        font-size: 20px;
    }
    span {
        font-size: 20px;
    }
    th {
        font-size: 15px;
    }
    td {
        font-size: 20px;
    }
    .speedometer {
        background-color: #263743;
        color: white;
        
    }
    .speedometer strong {
        font-size: 15px;
    }
    .speedometer span {
        font-size: 15px;
    }
    .material-icons {
        font-size: 10px;
    }
    button {
        font-display: 16px;
    }
    #eficiencia {
        width: 73%;
    }
    #oee {
        width: 73%;
    }
    #utilizacao {
        width: 73%;
    }
    #refugo {
        width: 73%;
    }    
}
@media(min-height: 641px)and(max-height: 750px ){
    img{
        margin-top: 0;
        width: 50px;
        height: 50px;
    }
    h1{
        margin-top: 0;
        font-size: 28px;        
    }    
    .center-align strong {
        font-size: 20px;
    }
    span {
        font-size: 20px;
    }
    th {
        font-size: 15px;
    }
    td {
        font-size: 20px;
    }
    .speedometer {
        background-color: #263743;
        color: white;
        
    }
    .speedometer strong {
        font-size: 15px;
    }
    .speedometer span {
        font-size: 15px;
    }
    .material-icons {
        font-size: 10px;
    }
    button {
        font-display: 16px;
    }
    #eficiencia {
        width: 73%;
    }
    #oee {
        width: 73%;
    }
    #utilizacao {
        width: 73%;
    }
    #refugo {
        width: 73%;
    }    
}
</style>
