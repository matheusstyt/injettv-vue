<template>
<div>  
    
    <h1>{{localTime}}</h1>
    <!-- <h1>{{display_maquinas}}</h1>
    <h1>{{display_paradas}}</h1>
    <h1>{{display_produtividade}}</h1> -->

        <Produtividade 
        :bi="{}"
        :velocimetro="{}" 
        :oee="13" 
        :eficiencia="16" 
        :refugo="80" 
        :utilizacao="100" 
        />
        {{teste}}
    {{maquinas}}
    {{paradas}}
<!-- 
    <div :style=display_maquinas>
        <Maquinas 
        :turno="turno" 
        :pts="pts"
        />
    </div>
    <div :style=display_paradas>
        <Paradas 
        :turno="turno" 
        :pts="pts"
        />
    </div> -->
    
</div>
</template>

<script>

import axios from 'axios'
import Maquinas from '../components/Maquinas.vue'
import Produtividade from '../components/Produtividade.vue'
import Paradas from '../components/Paradas.vue'
export default {
    components: {
        Produtividade, Maquinas, Paradas, 

    },
    data() {
    return {
        teste : 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        maquinas : 'b',
        paradas : 'a',
        display_produtividade: {display:'block'},
        display_paradas : {display:'block'},
        display_maquinas : {display:'block'},
        localTime: " ",
        pts: null,
        turno : null,

        displays : {
            maquinas : 'none',
            paradas : 'none',
            produtividade : 'none'
        }
    };
    },
    mounted(){
        this.showSlide()
    },
    created() {
        this.gerarProdutividade()
        this.gerarMaquinas()
        this.gerarParadas()
        this.teste = this.$route.params.produtividade
        this.maquinas = this.$route.params.maquinas
        this.paradas = this.$route.params.paradas
    },
    methods:{
        gerarParadas : function(){
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
            axios.all([        
                axios.get(`http://170.10.0.208:8080/idw/rest/injet/paradas/pesquisaParadasByGalpao` ,{params: {cdGalpao:this.cd}}),
                axios.get(`http://170.10.0.208:8080/idw/rest/injet/alertas/pesquisaAlertasByGalpao`,{params: {cdGalpao:this.cd}})
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

                if(typeof this.maquinas === 'string'  ){            
                    if (this.maquinas) {
                        //console.log("maquina: " + " " + this.maquinas)
                            pts_ = pts_.concat(pts.filter((pt) => {
                                //console.log("cdInjetora: " + " " + pt.cdPt + " == " + this.maquinas )
                                if (pt.cdPt === this.maquinas)                             
                                return pt;
                            }));
                        pts = pts_;
                    }
                }
                if(typeof this.maquinas === 'undefined' || typeof this.maquinas === 'object'  ){            
                    if (this.maquinas) {
                        this.maquinas.forEach((maquina) => {
                            //console.log("maquina: " + " " + maquina)
                            pts_ = pts_.concat(pts.filter((pt) => {
                                //console.log("cdInjetora: " + " " + pt.cdPt + " == " + maquina )
                                if (pt.cdPt === maquina)                             
                                return pt;
                            }));
                        });
                        pts = pts_;
                    }
                }
                
                this.pts = pts
            }))
            .catch((error) => {this.pts = error});
        },
        gerarProdutividade : function(){
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
            
            axios
            .get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnoAtual`)
            .then(turnoAtual => {
                const Gauge = require('../../public/js/gauge')
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
                .catch(errorBI => this.info = errorBI);
        
                })
                //.catch(errorTurnoAtual => response.status(500).render('error', {error: errorTurnoAtual}));
                .catch(errorTurnoAtual => this.info = errorTurnoAtual);
            
        },
        gerarMaquinas : function(){
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
            axios
            .get(`http://170.10.0.208:8080/idw/rest/injet/monitorizacao/turnoAtual`)
            .then(turnoAtual => {
                this.turno = turnoAtual.data.idTurno
                axios.post(`http://170.10.0.208:8080/idw/rest/v2/injet/monitorizacao/postosativos`, {
                    idTurno: turnoAtual.data.idTurno,
                    filtroOp: 0,
                    cdGt: "000001",
                    turnoAtual: true,
                    dtReferencia: "15/12/2022"
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
                    //console.log('mauina time : '+slideTransition)
                })
                .catch((error) => {this.turno = error});
            })
            .catch(errorTurnoAtual => this.info = errorTurnoAtual)
        },
        showSlide: function () {
            var time = this;
            setInterval(function () {
            var i = 0;
            time.localTime = new Date().toLocaleTimeString();
                setTimeout(() => {
                    this.display_maquinas = {display:'none'}
                }, 18000);
                setTimeout(() => {
                    
                }, 6000);
                setTimeout(() => {
                    
                }, 9000);
                i++
            }, 15000);
            async function sleep(msec) {
                return new Promise(resolve => setTimeout(resolve, msec));
}
        }
    }
}

</script>