<template>
    <div class="maquinas">
        <h1 align="center">Performance Máquinas - {{ galpaoName }}</h1>
    <!-- {{ info }} -->
        <div class=container-g id="container">
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
              <div class="cor-p" :style=back+cor2.style></div>
                <p>{{cor2.nome}} </p>
              </div>
            </div>
        </div>
        <div class="maquinas-g col l12" >
          <table class="tes" name="testee">
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
    <h2 class="ultima-atualizacao">Ultima atualizacão: {{ ultimaAtualizacao }}</h2>
</div>
</template>
<script>
    import '../css/maquinas.css'
    import axios from 'axios'
    export default {
    name: 'Maquinas',
    data(){
        return{
            ultimaAtualizacao : null,
            ip : require('/src/config/config.env').API_URL,
            galpaoName : sessionStorage.getItem('galpaoName'),
            cd: '000001',
            info: null,
            color: 'color: ',
            back: 'background-color: ',
            border: ' border-bottom: 20px solid ',
            pts: null,
            turno : null,
            maquinas : undefined,
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
    methods:{
        errorF(error){
            sessionStorage.setItem('error', error)
            window.location.href = '/error'
        },
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
        getMaquinas(){
            var contador = 0;
            var ptsGlobal;
            var ultimaAtualizacao;
            var globalRequest;
            this.ultimaAtualizacao = this.getToday()
         
                const today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var year = new Date().getFullYear()
                var mes = new Date().getMonth()+1
        
            axios
            .get(`${this.ip}/idw/rest/injet/monitorizacao/turnoAtual`)
            .then(turnoAtual => {
            this.turno = turnoAtual.data.idTurno
                axios.post(`${this.ip}/idw/rest/v2/injet/monitorizacao/postosativos`, {
                    idTurno: turnoAtual.data.idTurno,
                    filtroOp: 0,
                    cdGt: this.cd,
                    turnoAtual: true,
                    dtReferencia: `${dd}/${mes}/${year}`
                })
                .then(res => {         
                    ptsGlobal = res;
                    
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
                    pts = pts.concat(naMeta, abaixoMeta, parada,    semConexao);
                    
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
                    // BLOCO DE LÓGICA, QUE FAZ  LOOP DA TABELA
                    var itemsPerView = 5;
                    var view_atual;
                    var view_max = itemsPerView;
                    var init = 0;
                    view_atual = pts.filter((item, index) => index >= init && index < view_max);
                    this.pts = view_atual
                    setInterval(() => {
                        view_atual = pts.filter((item, index) => index >= init && index < view_max);
                        view_max += itemsPerView;
                        init += itemsPerView;                       
                        if(view_atual.length === 0){
                            if(sessionStorage.getItem('paradas') == 'true'){
                                window.location.href = '/parada'
                            }else if(sessionStorage.getItem('produtividade') == 'true'){
                                window.location.href = '/produtividade'
                            }else{
                                window.location.reload();
                            }
                        }else{
                            this.pts = view_atual
                        }
                    }, 15000);
                    // FIM DO BLOCO
                    this.turno = res
                })
                .catch((error) => this.errorF(error));
            })
            .catch(errorTurnoAtual => this.errorF(errorTurnoAtual))
        }
    },
    mounted () {
        document.title = `Performance Máquinas - ${sessionStorage.getItem('galpaoName')}`
        this.cd = sessionStorage.getItem('galpao')
        this.getMaquinas();
    }
}
</script>