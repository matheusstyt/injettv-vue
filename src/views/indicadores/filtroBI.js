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
cicloMedio
: 
"5.350"
efiCic
: 
"168.21"
efiCicPonderada
: 
"168.21"
efiRea
: 
"32.31"
efiReaGr
: 
"33.32"
efiReaSeg
: 
"20.97"
eficiencia
: 
"168.05"
hrsBoas
: 
"02:16:25"
hrsBoasDec
: 
"2.2738"
hrsCTA
: 
"00:00:00"
hrsCTADec
: 
"0.0000"
hrsCiclosImprodutivos
: 
"00:00:00"
hrsCiclosImprodutivosDec
: 
"0.0000"
hrsCiclosProdutivos
: 
"02:16:25"
hrsCiclosProdutivosDec
: 
"2.2737"
hrsDisp
: 
"10:50:29"
hrsDispDec
: 
"10.8415"
hrsPCI
: 
"00:00:00"
hrsPCIDec
: 
"0.0000"
hrsParComPeso
: 
"08:34:04"
hrsParComPesoDec
: 
"8.5678"
hrsParSemPeso
: 
"00:00:00"
hrsParSemPesoDec
: 
"0.0000"
hrsProdutivas
: 
"03:49:16"
hrsProdutivasDec
: 
"3.8211"
hrsRefugadas
: 
"00:00:00"
hrsRefugadasDec
: 
"0.0000"
hrsRitmo
: 
"-01:32:51"
hrsRitmoDec
: 
"-1.5474"
hrsTotais
: 
"10:50:29"
hrsTotaisDec
: 
"10.8415"
hrsTrabalhadas
: 
"02:16:25"
hrsTrabalhadasDec
: 
"2.2737"
indCporA
: 
"20.97"
indOEE
: 
"35.25"
indOEECapital
: 
"35.25"
indPCA
: 
"100.00"
indPar
: 
"79.03"
indPerdas
: 
"67.70"
indPerdasGr
: 
"66.68"
indPerdasSeg
: 
"64.75"
indRef
: 
"0.00"
indRefGr
: 
"0.00"
indRefSeg
: 
"0.00"
indUtilizacao
: 
"20.97"
pcsPerdasPCI
: 
"0.00"
pcsPerdasPCIKg
: 
"0.0000"
pcsPerdasPCITon
: 
"0.0000"
pcsPerdasParComPeso
: 
"33928.00"
pcsPerdasParComPesoKg
: 
"13.2845"
pcsPerdasParComPesoTon
: 
"0.0133"
pcsPerdasTotal
: 
"29060.00"
pcsPerdasTotalKg
: 
"11.2080"
pcsPerdasTotalTon
: 
"0.0112"
pcsProdBruta
: 
"13868.00"
pcsProdBrutaKg
: 
"5.6008"
pcsProdBrutaTon
: 
"0.0056"
pcsProdLiquida
: 
"13868.00"
pcsProdLiquidaKg
: 
"5.6008"
pcsProdLiquidaTon
: 
"0.0056"
pcsProdPrev
: 
"42927.00"
pcsProdPrevKg
: 
"16.8088"
pcsProdPrevTon
: 
"0.0168"
pcsProdRefugada
: 
"0.00"
pcsProdRefugadaKg
: 
"0.0000"
pcsProdRefugadaTon
: 
"0.0000"
pcsRitmo
: 
"-4868.00"
pcsRitmoKg
: 
"-2.0766"
pcsRitmoTon
: 
"-0.0021"