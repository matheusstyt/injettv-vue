<template>
    <div class="paradas">
      <h1 class=center-align>Paradas | Alertas - {{ galpaoName }}</h1>
        <!-- {{ info }} -->
        <div class="container">
            <table class="flex">
                <tr>
                    <th>MÁQUINA</th>
                    <th>DESCRIÇÃO</th>
                    <th>DURAÇÃO (HH:MM:SS)</th>
                </tr>
                <tr class="teste" id="circle1" v-for="(pt, index) in pts" >
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
  import '../css/paradas.css'
  import axios from 'axios'
  export default {
      name: 'Maquinas',
    components: {
          
    },
    created () {
        //this.carousel()
        // setInterval(() => {
        //     if(sessionStorage.getItem('produtividade') == 'true'){
        //         window.location.href = '/produtividade'
        //     }
        //     if(sessionStorage.getItem('maquinas') == 'true'){
        //         window.location.href = '/maquinas'
        //     }
            
        //     this.getParadas()      
        // }, 15000)
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
            info: null,
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
          async getParadas(){
      
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
                console.log(pts)
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
                        if(sessionStorage.getItem('produtividade') == 'true'){
                            window.location.href = '/produtividade'
                        }
                        else if(sessionStorage.getItem('maquinas') == 'true'){
                            window.location.href = '/maquinas'
                        }
                        else{
                            window.location.reload();
                        }
                    }else{
                        this.pts = view_atual
                    }
                }, 15000);
                // FIM DO BLOCO
     
              }))
              .catch(error => this.errorF(error));
          }
      },
  
    mounted () {
        this.cd = sessionStorage.getItem('galpao')
        document.title = `Paradas - ${sessionStorage.getItem('galpaoName')}`
        this.getParadas()
    }
  }
</script>

