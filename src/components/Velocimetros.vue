<template>
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
</template>
<script>
import $ from 'jquery'
export default{


created() {
  },
  props:{
      oee : Number,
      eficiencia : Number,
      refugo : Number,
      utilizacao : Number,
  },
  data() {
    return {
      
    }
  },
  
  mounted(){
    
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
        value: this.oee
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
  watch:{

    
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
