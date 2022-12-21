<template>
<div> 
    {{ info }}
    {{  info1 }}
    <div v-for="(index) in carroseuCheck">
        
        <div v-if="index.name == 'paradas'">
            <div  v-bind:style="{ 'display' : paradasS }">
                <Paradas :cd="cd"/>
            </div>
        </div>
        <div v-if="index.name == 'maquinas'">
            <div  v-bind:style="{ 'display' : maquinasS }">
                <Maquinas :cd="cd" />
            </div>
        </div>
        <div v-if="index.name == 'produtividade'">
            <div v-bind:style="{ 'display' : produtividadeS }">
                <Produtividade :cd="cd"/>
            </div>
        </div>
    </div>   
</div>
</template>

<script>
import router from "@/router";
import axios from 'axios'
import Maquinas from '../components/Maquinas.vue'
import Produtividade from '../components/Produtividade.vue'
import Paradas from '../components/Paradas.vue'
export default {
    components: {
        Produtividade, Maquinas, Paradas, 

    },
    created () {
        if(sessionStorage.getItem('maquinas') == 'true'){
            this.carroseu.push({'name': 'maquinas', value: 'block', status: true})
            this.carroseuCheck.push({'name': 'maquinas', value: 'block', status: true})
        }
        if(sessionStorage.getItem('paradas') == 'true'){
            this.carroseu.push({'name': 'paradas', value: 'block', status: true})
            this.carroseuCheck.push({'name': 'paradas', value: 'block', status: true})
        }
        if(sessionStorage.getItem('produtividade') == 'true'){
            this.carroseu.push({'name': 'produtividade', value: 'block', status: true})
            this.carroseuCheck.push({'name': 'produtividade', value: 'block', status: true})
        }
        this.err = this.carroseu
        this.getProdutividade()
        setInterval(() => {        
            if(this.carroseu.length > 1){
                this.carroseu = this.changePosition(this.carroseu, 0, this.carroseu.length-1);    
            }else{
            }  
        }, 25000)
        // setInterval(() => {              
        //     this.getProdutividade()
        //     this.getMaquinas()
        // }, 15000)
        // setInterval(() => {              
        //     this.getMaquinas()
        // }, 3000)

        
    },
    mounted() {
        if(!sessionStorage.getItem('galpao')){
            router.push({ path: '/painel'})
            this.info = 'sem gp'
        }else{
            this.cd = sessionStorage.getItem('galpao')
            this.produtividade = sessionStorage.getItem('produtividade')
            this.paradas = sessionStorage.getItem('paradas')
            this.maquinas = sessionStorage.getItem('maquinas')
            this.getProdutividade()
            this.displayPrimary()
           
            
 
        }
    },
    data() {
    return {
        cd : '000001',
        paradasS: 'none',
        maquinasS: 'none',
        produtividadeS: 'none',
        highlightColor: 'blue',
        pSize : 3,
        errorCode : '',
        carroseu: [],
        carroseuCheck: [],
        //PRODUTIVIDADE 
        bi : null,
        indicadores : null,
        velocimetro : null,
        turnos : null,
        oee : null,
        refugo : null,  
        eficiencia : null,
        utilizacao : null,

        err : null,
        info : null,
        info1 : null,
        produtividade : null, 
        maquinas : null, 
        paradas : null
    };
    },
    methods:{
        displayPrimary(){
            var ma = false;
            var pa = false;
            var pro = false;
            this.carroseu.forEach(element => {  
                if(element.name == 'produtividade'){
                    pro = true         
                }
                if(element.name == 'maquinas'){
                    ma = true            
                    }
                if(element.name == 'paradas'){
                    pa = true    
                }        
            });
            
            if(ma && pa && pro){
                this.produtividadeS = 'block';
                this.paradasS = 'none';
                this.maquinasS = 'none';
            }
            if(ma && pa){
                this.maquinasS = 'block';
                this.paradasS = 'none';
            }
            if(ma && pro){
                this.produtividadeS = 'block';  
                this.maquinasS = 'none';
            }
            if(pa && pro){
                this.produtividadeS = 'block';
                this.maquinasS = 'none';  
            }
        },
        changePosition(arr, from, to) {
            arr.splice(to, 0, arr.splice(from, 1)[0]);
            arr.forEach((element, index) => {
                if(index == 0){
                    if(element.name === 'paradas'){
                        this.paradasS = 'block'
                        this.maquinasS = 'none'
                        this.produtividadeS = 'none'
                    }
                    if(element.name === 'produtividade'){
                        this.produtividadeS = 'block'
                        this.paradasS = 'none'
                        this.maquinasS = 'none'
                    }
                    if(element.name === 'maquinas'){
                        this.maquinasS = 'block'
                        this.paradasS = 'none' 
                        this.produtividadeS = 'none'
                    }

                }
            });
            
            
            arr[arr.length-1].value = 'none'
            if(arr.length = 3){
                arr[1].value = 'none'
            }
            return arr;
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
                // .catch(errorBI => {this.$router.push({name:"error"})});

            })
            //.catch(errorTurnoAtual => response.status(500).render('error', {error: errorTurnoAtual}));
            // .catch(errorTurnoAtual => {this.$router.push({name:"error"})});
        },
        async getMaquinas(){
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
                cdGt: this.cd,
                turnoAtual: true,
                dtReferencia: "21/12/2022"
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
                this.ptsMaquinas = pts
                this.turno = res
                //console.log('mauina time : '+slideTransition)
            })
            .catch((error) => {this.turno = error});
        })
        .catch(errorTurnoAtual => this.info = errorTurnoAtual)
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
            await axios.all([        
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
                
                this.ptsParadas = pts
            }))
            // .catch((error) => {this.$router.push({name:"error"})});
        }
        
    }
}

</script>
<style>
.teste{
    width: 200px;
    height: 200px;
    background-color: bisque;
}
</style>