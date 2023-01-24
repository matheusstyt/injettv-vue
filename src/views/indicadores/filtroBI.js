console.log('uai')
const kTABLE_NAME = 'PDBAIDW'
const kCOLUMN_NAME = 'ijtbtur'

var sqlTurnos = `SELECT * FROM ${kTABLE_NAME}.dbo.${kCOLUMN_NAME}`;
console.log(sqlTurnos)
function Turno1(){
    var idTurno;
    var cdTurno = '000001';
    var dsTurno = 'PRIMEIRO TURNO';
    var dtReferencia;
	
}
function FiltroAgrupamentoBI() {
    var BI_TOTAL_GERAL = 0; 
    var BI_TOTAL_ANO_MES = 1; 
    var BI_TOTAL_DATA = 2; 
    var BI_TOTAL_MAQUINA = 3; 
    var BI_TOTAL_MAQUINA_FERRAMENTA_ESTRUTURA = 4; 
    var BI_TOTAL_TURNO =5;
    
}
var sqlTurno =  'FROM Ijtbtur turno WHERE turno.cdturno = : ${cdturno} ';

function getAgrupamento(agrupamento) {
    var retorno;
    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_GERAL) {
        retorno = FiltroAgrupamentoBI.BI_TOTAL_GERAL;
    }

    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_ANO_MES) {
        retorno = FiltroAgrupamentoBI.BI_TOTAL_ANO_MES;
    }

    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_DATA) {
        retorno = FiltroAgrupamentoBI.BI_TOTAL_DATA;
    }

    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_TURNO) {
        retorno = FiltroAgrupamentoBI.BI_TOTAL_TURNO;
    }

    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_MAQUINA) {
        retorno = FiltroAgrupamentoBI.BI_TOTAL_MAQUINA;
    }
    
    return retorno;
}
let filtroBII = {
    anoIni : '2023',
    mesIni : '01',
    anoFim : '2023',
    mesFim : '01',
    dtIni : '',
    dtFim : '',
    cdTurno : '',
    cdPt : '',
    cdGt : '',
    cdClasseMaquina : '',
    cdRap : '',
    cdGrpRap : '',
    cdProduto : '',
    cdGalpao : '000005',
    agrupamentoBI : 1,
    
    cdEstrutura : '',
    dsTurno : '',
    dsPt : '',
    dsGt : '',
    dsGrpRap : '',
    dsProduto : '',
}


let BiIndicadoresAnoMesDTO = {
    ano : '',
    mes : '',
    filtroBI : filtroBII
}
console.log(BiIndicadoresAnoMesDTO.filtroBI.cdGalpao)
//module.exports = {filtroBI, filtroBII}