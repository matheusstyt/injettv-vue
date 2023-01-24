class Registro {
    coorelobjy = 0; 
    coorelobjx = 0; 
    cdinjetora = ""; 
    cdinjestendido = ""; 
    stfuncionamento = ""; 
    TpIcone = ""; 
    aguardandomolde = 0; 
    AlertaInspQld = 0; 
    maquinaemalerta = 0; 
    StUltInspQld = 0; 
    StDelayConsol = 0; 
    StManut = 0; 
    StPerdaSinc = 0; 
    StProbQld = 0; 
    QtAleParCIP = 0; 
    QtAlertasExtrInsp = 0; 
    QtAlertasExtrPar = 0; 
    QtAlertasOperador = 0; 
    QtAlertasProbQld = 0; 
    parcompeso = 0; 
    parnaoinf = 0; 
    EfiReaMaq = 0; 
    EfiCicMaq = 0; 
    IndRefMaiorQue = 0; 
    efi_rea = 0; 
    efi_cic = 0; 
    ind_ref = 0; 
    ind_par = 0; 
    ind_cav = 0; 
    ind_qld = 0; 
    ind_disp = 0; 
    oee = 0;
    cdmoldeatual = null;
}

var _coorelobjy = 0;
var _coorelobjx = 1;
var _cdinjetora = 2;
var _cdinjestendido = 3;
var _stfuncionamento = 4;
var _TpIcone = 5;
var _aguardandomolde = 6;
var _AlertaInspQld = 7;
var _maquinaemalerta = 8;
var _StUltInspQld = 9;
var _StDelayConsol = 10;
var _StManut = 11;
var _StPerdaSinc = 12;
var _StProbQld = 13;
var _QtAleParCIP = 14;
var _QtAlertasExtrInsp = 15;
var _QtAlertasExtrPar = 16;
var _QtAlertasOperador = 17;
var _QtAlertasProbQld = 18;
var _parcompeso = 19;
var _parnaoinf = 20;
var _EfiReaMaq = 21;
var _EfiCicMaq = 22;
var _IndRefMaiorQue = 23;
var _efi_rea = 24;
var _efi_cic = 25;
var _ind_ref = 26;
var _ind_par = 27;
var _ind_cav = 28;
var _ind_qld = 29;
var _ind_disp = 30;
var _oee = 31;			
var _cdmoldeatual = 32;	

strSQL = "";
// coordenadas do objeto no galpão do Injet
strSQL = strSQL.concat(" SELECT ");
strSQL = strSQL.concat("        a.coorelobjy, a.coorelobjx, ");
strSQL = strSQL.concat("        a.cdinjetora, a.cdinjestendido, ");
// cod da maq e código estendido (código exibido nas var rfaces)
strSQL = strSQL.concat("        b.stfuncionamento,  "); // '0' - parada , '1' - produzindo , '2' - sem conexão
strSQL = strSQL.concat("        b.TpIcone,  ");
strSQL = strSQL.concat("        b.aguardandomolde, b.AlertaInspQld, b.maquinaemalerta, b.StUltInspQld, ");
strSQL = strSQL.concat("        c.StDelayConsol, c.StManut, c.StPerdaSinc, c.StProbQld, ");
strSQL = strSQL.concat("        d.QtAleParCIP, d.QtAlertasExtrInsp, d.QtAlertasExtrPar, d.QtAlertasOperador, d.QtAlertasProbQld, ");
strSQL = strSQL.concat("        (CASE WHEN par.saidademolde IS NULL THEN NULL ELSE par.saidademolde END) as parcompeso,  "); // NULL - não está parada, 0 - par sem peso, 1 - par com peso
strSQL = strSQL.concat("        (CASE WHEN b.cdparada  IS NULL THEN NULL ELSE (CASE WHEN b.cdparada <> '999999' THEN 0 ELSE 1 END) END) as parnaoinf,  "); //  NULL - não está parada, 0 - par inf, 1 - par nao inf
// metas
strSQL = strSQL.concat("        (CASE WHEN e.EficRealizacao IS NULL THEN cfgmeta.eficrealizacao ELSE e.EficRealizacao END) as EfiReaMaq, ");
strSQL = strSQL.concat("        (CASE WHEN e.EficCiclo IS NULL THEN cfgmeta.eficciclo ELSE e.EficCiclo END) as EfiCicMaq, ");
strSQL = strSQL.concat("        cfg.IndRefMaiorQue , ");
// indicadores
strSQL = strSQL.concat("        (CASE WHEN a.prodprev = 0 THEN 0 ELSE (a.prodliquida / a.prodprev) * 100 END) as efi_rea, ");
strSQL = strSQL.concat("        (CASE WHEN (a.qtdcicnormal = 0 OR a.tmpcicnormal = 0) THEN 0 ELSE  (a.ciclopadrao /  (a.tmpcicnormal / a.qtdcicnormal)) * 100  END) as efi_cic, ");
strSQL = strSQL.concat("        (CASE WHEN a.prodbruta = 0 THEN 0 ELSE (a.prodrefugada / a.prodbruta) * 100 END) as ind_ref,  ");
strSQL = strSQL.concat("        (CASE WHEN a.tmpativo = 0 THEN 0 ELSE (a.tmpparCP / a.tmpativo) * 100 END) as ind_par, ");
strSQL = strSQL.concat("        ( (a.qtcavativas / a.qtcavidades) * 100 ) as ind_cav, ");
strSQL = strSQL.concat("        (100 - (CASE WHEN a.prodbruta = 0 THEN 0 ELSE (a.prodrefugada / a.prodbruta) * 100 END)) as ind_qld,  ");
strSQL = strSQL.concat("        (CASE WHEN a.tmpativo = 0 THEN 0 ELSE (a.tmptrabalhado / a.tmpativo) * 100 END) as ind_disp,  ");
strSQL = strSQL.concat("        (CASE WHEN a.tmpprodutivas < 0 OR a.tmpativo = 0 THEN 0 ELSE (a.tmpprodutivas / a.tmpativo) * 100 END) as oee         ");
strSQL = strSQL.concat("   		, b.CdMoldeAtual ");
strSQL = strSQL.concat("   FROM ( ");
strSQL = strSQL.concat("          SELECT a.cdinjetora, a.cdinjestendido, ft.ciclopadrao, c2.qtcavativas, c2.qtcavidades, d.coorelobjx, d.coorelobjy, ");
strSQL = strSQL.concat("                 SUM(b.tmpativo) as tmpativo, ");
strSQL = strSQL.concat("                 SUM(b.tmpcicnormal - a.tmppcsref - a.tmpcavidades - b.tmpritmo) as tmpprodutivas, ");
strSQL = strSQL.concat("                 SUM(a.prodrefugada) as prodrefugada, ");
strSQL = strSQL.concat("                 SUM(a.prodbruta) as prodbruta, ");
strSQL = strSQL.concat("                 SUM(a.prodbruta - a.prodrefugada) as prodliquida, ");
strSQL = strSQL.concat("                 SUM(a.prodprev) as prodprev, ");
strSQL = strSQL.concat("                 SUM(b.tmpativo - b.tmpparadasCP) as tmptrabalhado , ");
strSQL = strSQL.concat("                 SUM(b.tmpparadasCP) as tmpparCP, ");
strSQL = strSQL.concat("                 SUM(b.tmpcicnormal) as tmpcicnormal, ");
strSQL = strSQL.concat("                 SUM(b.qtdciclosnormais) as qtdcicnormal ");
strSQL = strSQL.concat("            FROM viewBIDtRefQtds a ");
strSQL = strSQL.concat("            JOIN viewBIDtRefTempos b ON (    b.dtturno = a.dtturno ");
strSQL = strSQL.concat("                                         AND b.cdturno = a.cdturno ");
strSQL = strSQL.concat("                                         AND b.cdinjetora = a.cdinjetora ");
strSQL = strSQL.concat("                                         AND b.nrop = a.nrop ");
strSQL = strSQL.concat("                                         AND b.cdmolde = a.cdmolde ");
strSQL = strSQL.concat("                                         AND b.cdestrutura = a.cdestrutura ");
strSQL = strSQL.concat("                                         AND b.dthrivalestru = a.dthrivalestru ");
strSQL = strSQL.concat("                                         AND b.dthrivalcic = a.dthrivalcic ) ");

////20200615 //M20615b c->a TODO FAZER PARA DATAANTERIOR :
strSQL = strSQL.concat("           JOIN ijtbinj c ON (c.cdinjetora = a.cdinjetora AND c.opatual = a.nrop) ");


strSQL = strSQL.concat("           JOIN ijfictec ft ON (    ft.cdinjetora = c.cdinjetora "); ////20200615 //M20615b c->a
strSQL = strSQL.concat("                                AND ft.cdmolde = c.CdMoldeAtual "); ////20200615 //M20615b (CdMoldeAtual) c->a
strSQL = strSQL.concat("                                AND ft.cdestrutura = c.CdEstruturaAtual "); ////20200615 //M20615b (CdEstruturaAtual) c->a


strSQL = strSQL.concat("                                AND ft.dthrfvalcic IS NULL) ");
strSQL = strSQL.concat("           JOIN cavidades2 c2 ON (    c2.cdmolde = ft.cdmolde ");
strSQL = strSQL.concat("                                  AND c2.cdestrutura = ft.cdestrutura ");
strSQL = strSQL.concat("                                  AND c2.dthrival = ft.dthrivalestru)   ");

strSQL = strSQL.concat("           JOIN ijgalobj d ON (d.cdinjetora = c.cdinjetora) ");


strSQL = strSQL.concat("          WHERE a.dtturno = :data  "); // filtro de data
strSQL = strSQL.concat("            AND a.cdturno = :cdturno  "); // filtro de turno
strSQL = strSQL.concat("            AND d.cdgalpao = :cdgalpao  "); // filtro de galpao (GT no caso do VF)
strSQL = strSQL.concat("          GROUP BY a.cdinjetora, a.cdinjestendido, ft.ciclopadrao, c2.qtcavativas, c2.qtcavidades, d.coorelobjx, d.coorelobjy ");
strSQL = strSQL.concat("     ) a ");
strSQL = strSQL.concat("    JOIN ijtbinj b ON (b.cdinjetora = a.cdinjetora) ");
strSQL = strSQL.concat("     JOIN IJTbInjStatus c ON (c.cdinjetora = b.cdinjetora) ");
strSQL = strSQL.concat("     JOIN IJtbINJALERTA d ON (d.cdinjetora = b.cdinjetora) ");
strSQL = strSQL.concat("     JOIN IJIndicesELabels cfgmeta ON (cfgmeta.cdlingua = :cdlingua) ");
strSQL = strSQL.concat("     JOIN ijconger cfg ON (1=1) ");
strSQL = strSQL.concat("     LEFT JOIN ijInjCfgMetaMonit e ON (e.cdinjetora = b.cdinjetora) ");
strSQL = strSQL.concat("     LEFT JOIN ijtbpar par ON (par.cdparada = b.cdparada) ");
strSQL = strSQL.concat("   ORDER BY a.coorelobjy, a.coorelobjx ");

console.log(strSQL);