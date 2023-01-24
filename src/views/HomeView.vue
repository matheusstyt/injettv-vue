
<script>
//import './indicadores/Monitorizacao'

import '../css/produtividade.css'
import Preloader from '../components/Preloader.vue'
import Velocimetros from '../components/Velocimetros.vue'
import axios from 'axios'
import { useRequest } from 'vue-request';
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
        //this.getFirstProdutividade();
        window.location.replace('/painel');
       
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
                    value: this.indicadores.efiRea
                },
                {
                    id: 'refugo',
                    value: this.indicadores.efiCic
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
         async getFirstProdutividade (){
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

            const today = new Date();
                var dd = String(new Date().getDate()).padStart(2, '0');
                var year = String(new Date().getFullYear());
                var mes = String(new Date().getMonth()+1);
                if(mes.length == 1){
                    mes = "0"+mes;
                }
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
 
              };
            // fetch(`${this.ip}/idw/rest/injet/monitorizacao/turnoAtual`, requestOptions)
            //   .then(response => response.json())
            //   .then(data => {
            //     console.log('TURNOATUAL : '+data.dsTurno)
            //     const jdata = JSON.stringify({
            //           cdGalpao: this.cd,
            //           agrupamentoBI: 2,
            //           cdTurno: data.cdTurno,
            //           dtIni: year + "-" + mes +  "-" + dd,
            //           dtFim: year + "-" + mes +  "-" + dd,
            //         });
            //         console.log(jdata)
            //     const reqBI = {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json"},
            //         mode: 'cors',
            //         body: jdata
            //       };
            //     fetch(`${this.ip}/idw/rest/injet/bi/resumoBI`, reqBI)
            //       .then(response => response.json())
            //       .then(data => {
            //         console.log(JSON.stringify(data))
            //         this.indicadores = data.indicadores
            //         this.bi = data.indicadoresTurno
            //         this.getGauge(); 
            //       });
            //   });
            // const sql = ''
            // SELECT t.tmpcicnormal, t.tmpcicfinparada, t.tmpparadasCP, t.tmpparadasSP, t.tmpritmo, t.tmpativo, t.tmpCTT, t.tmpCTA, (t.tmpativo + tmpparadasSP) as tmpTotal, 
            // (CASE WHEN t.tmpativo = 0 THEN 0 ELSE (t.tmpparadasCP / t.tmpativo) * 100 END) as indpar, 
            // (CASE WHEN t.tmpativo = 0 THEN 0 ELSE ( (t.tmpativo - t.tmpparadasSP) / t.tmpativo) * 100 END) as utilizacao 
            // FROM (SELECT SUM(a.tmpcicnormal) as tmpcicnormal, SUM(a.tmpcicfinparada) as tmpcicfinparada, SUM(a.tmpparadasCP) as tmpparadasCP, 
            // SUM(a.tmpparadasSP) as tmpparadasSP, 
            // SUM(a.tmpritmo) as tmpritmo, 
            // SUM(a.tmpativo) as tmpativo, 
            // SUM(a.tmpCTT) as tmpCTT, 
            // SUM(a.tmpCTA) as tmpCTA 
            // FROM viewBIAnoMesTempos a 
            // JOIN ijtbtur tur ON (tur.cdturno = a.cdturno) 
            // JOIN ijfictec d ON ( d.cdinjetora = a.cdinjetora 
            // AND d.cdmolde = a.cdmolde 
            // AND d.cdestrutura = a.cdestrutura 
            // AND d.dthrivalcic = a.dthrivalcic) 
            // WHERE a.anomes BETWEEN :anomesini 
            // AND :anomesfim 
            // AND a.cdturno = :cdturno ) t 

            // '';
              // ---------------------------------------------------------
            //   const jdataBI = JSON.stringify({
            //             anoIni: year,
            //             mesIni: mes,
            //             anoFim: year,
            //             mesFim: mes,
            //             cdGalpao: this.cd,
            //             agrupamentoBI: 1,
            //           });
            //          // console.log(jdataBI)
            //       const reqBI1 = {
            //           method: "POST",
            //           headers: { "Content-Type": "application/json"},
            //           mode: 'cors',
            //           body: jdataBI
            //         };
            //       fetch(`${this.ip}/idw/rest/injet/bi/resumoBI`, reqBI1)
            //         .then(response => response.json())
            //         .then(data => {
            //          //console.log(JSON.stringify('IND TURNOS : '+JSON.stringify(data.indicadoresTurno)));
            //           //console.log(JSON.stringify('IND : '+JSON.stringify(data.indicadores)));

            //           //this.indicadores = data.indicadores
            //           //this.bi = data.indicadoresTurno
            //           //this.getGauge(); 
            //         })


              // -----------------------------------
              fetch(`${this.ip}/idw/rest/injet/monitorizacao/turnos`)
              .then(response => response.json())
              .then(data => { 
                //console.log('TURNOS : '+JSON.stringify(data));

                this.turnos = data
              }
            )

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
                        anoIni: year,
                        mesIni: mes,
                        anoFim: year,
                        mesFim: mes,
                        cdGalpao: this.cd,
                        agrupamentoBI: 1,
                    }),
                    axios.get(`${this.ip}/idw/rest/injet/monitorizacao/turnos`)
                ])
                .then(axios.spread(( bi, turnos) => {
                      
                      //this.info = bi.data.indicadores  
                      //this.bi = bi.data.indicadoresTurno
                      //console.log(bi)
                      //this.indicadores = bi.data.indicadores
                      //this.turnos = turnos.data.turnos
                      //$('#preloader').fadeIn().toggleClass('hide');           
                      //this.getGauge();  
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
                      }, 3000000)
   
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