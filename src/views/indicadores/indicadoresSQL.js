let filtroBI = require('./filtroBI');
let agrupamento = require('./filtroAgrupamentoBI');

getConsultaIndicadoresTempoBI (filtroBI, agrupamento){
    const strSQL = "";
    const strSQLGroup = "";		
    const strSQLGroupBySubQuery = "";
    const strSQLIndicadores = "";
    const strSQLTotaisSubQuery = "";
    const strSQLTabelasSubQuery = "";
    const strSQLWhereSubQuery = "";
    
    
    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_GERAL) {
        strSQLGroup = "";
        strSQLGroupBySubQuery = "";
    } 
    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_ANO_MES) {
        strSQLGroup = "t.anomes ";
        strSQLGroupBySubQuery = "a.anomes ";
    } 
    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_DATA) {
        strSQLGroup = "t.dtturno ";
        strSQLGroupBySubQuery = "a.dtturno ";
    }
    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_MAQUINA) {
        strSQLGroup = "t.cdinjestendido ";
        strSQLGroupBySubQuery = "a.cdinjestendido ";
    }
    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_MAQUINA_FERRAMENTA_ESTRUTURA) {
        strSQLGroup = "t.cdinjestendido, t.cdmolestendido, t.cdestrutura ";
        strSQLGroupBySubQuery = "a.cdinjestendido, a.cdmolestendido, a.cdestrutura ";
    } 				
    if (agrupamento == FiltroAgrupamentoBI.BI_TOTAL_TURNO) {
        strSQLGroup = "t.cdturno, t.dsturno ";
        strSQLGroupBySubQuery = "a.cdturno, tur.dsturno ";
    } 

    
    // indicadores
    
    // tempos que NAO dependem dos produtos
    strSQLIndicadores = strSQLIndicadores.concat(" t.tmpcicnormal, t.tmpcicfinparada, t.tmpparadasCP, t.tmpparadasSP,  ");
    strSQLIndicadores = strSQLIndicadores.concat(" t.tmpritmo, t.tmpativo, t.tmpCTT, t.tmpCTA, ");
    
    strSQLIndicadores = strSQLIndicadores.concat(" (t.tmpativo + tmpparadasSP) as tmpTotal, ");

    // indicadores - ind par
    strSQLIndicadores = strSQLIndicadores.concat(" (CASE WHEN t.tmpativo = 0 THEN 0 ELSE (t.tmpparadasCP / t.tmpativo) * 100 END) as indpar, ");
    // indicadores - utilizacao
    strSQLIndicadores = strSQLIndicadores.concat(" (CASE WHEN t.tmpativo = 0 THEN 0 ELSE ( (t.tmpativo - t.tmpparadasSP) / t.tmpativo) * 100 END) as utilizacao ");		
    
    
    // tempos que NAO dependem dos produtos	
    strSQLTotaisSubQuery = strSQLTotaisSubQuery.concat(" SUM(a.tmpcicnormal) as tmpcicnormal, ");
    strSQLTotaisSubQuery = strSQLTotaisSubQuery.concat(" SUM(a.tmpcicfinparada) as tmpcicfinparada, ");
    strSQLTotaisSubQuery = strSQLTotaisSubQuery.concat(" SUM(a.tmpparadasCP) as tmpparadasCP, ");
    strSQLTotaisSubQuery = strSQLTotaisSubQuery.concat(" SUM(a.tmpparadasSP) as tmpparadasSP, ");
    strSQLTotaisSubQuery = strSQLTotaisSubQuery.concat(" SUM(a.tmpritmo) as tmpritmo, ");
    strSQLTotaisSubQuery = strSQLTotaisSubQuery.concat(" SUM(a.tmpativo) as tmpativo, ");
    strSQLTotaisSubQuery = strSQLTotaisSubQuery.concat(" SUM(a.tmpCTT) as tmpCTT, ");
    strSQLTotaisSubQuery = strSQLTotaisSubQuery.concat(" SUM(a.tmpCTA) as tmpCTA ");		
    
    
    if (!filtroBI.getAnoIni().equals("")) {
        strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("  FROM viewBIAnoMesTempos a ");
    } else {
        strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("  FROM viewBIDtRefTempos a ");
    }
    
    strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat(" JOIN ijtbtur tur ON (tur.cdturno = a.cdturno) ");
    strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat(" JOIN ijfictec d ON (    d.cdinjetora = a.cdinjetora ");
    strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("                     AND d.cdmolde = a.cdmolde ");
    strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("                     AND d.cdestrutura = a.cdestrutura ");
    strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("                     AND d.dthrivalcic = a.dthrivalcic) ");
    
    // tabelas relacionadas a grupo de maquina
    if (!filtroBI.getCdGt().equals("")) {
        strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("  JOIN ijgrpdetinj gm ON (gm.cdinjetora = a.cdinjetora) ");		
    } else {
        if (!filtroBI.getCdClasseMaquina().equals("")) {
            strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("  LEFT JOIN ijtbinjclassABC h ON (h.cdinjetora = a.cdinjetora) ");
        } else {
            if (!filtroBI.getCdGalpao().equals("")) {
                strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("  JOIN ijgalobj gal ON (gal.cdinjetora = a.cdinjetora) ");
            } 
        }
    }
    
    // tabela relacionado a grupo de ferramenta
    if (!filtroBI.getCdGrpRap().equals("")) {
        strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("  JOIN ijgrpdetmol gf ON (gf.cdmolde = a.cdmolde) ");	
    }

    
    if (!filtroBI.getCdProduto().equals("")) {
        strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("  JOIN ijmolpro mp ON (    mp.cdmolde = d.cdmolde ");
        strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("                       AND mp.cdestrutura = d.cdestrutura ");
        strSQLTabelasSubQuery = strSQLTabelasSubQuery.concat("                       AND mp.dthrival = d.dthrivalestru) ");
    }
    
    // filtros	
    if (!filtroBI.getAnoIni().equals("")) {
        strSQLWhereSubQuery = strSQLWhereSubQuery.concat(" WHERE a.anomes BETWEEN :anomesini AND :anomesfim ");
    } else {
        strSQLWhereSubQuery = strSQLWhereSubQuery.concat(" WHERE a.dtturno BETWEEN :dthrini AND :dthrfim ");	
    }
    

    if (!filtroBI.getCdTurno().equals("")) {
        strSQLWhereSubQuery = strSQLWhereSubQuery.concat(" AND a.cdturno = :cdturno ");
    }
    
    if (!filtroBI.getCdPt().equals("")) {
        strSQLWhereSubQuery = strSQLWhereSubQuery.concat("  AND a.cdinjestendido = :cdpt ");	
    } else {
        if (!filtroBI.getCdGt().equals("")) {
            strSQLWhereSubQuery = strSQLWhereSubQuery.concat("  AND gm.cdgrpinj = :cdgt ");		
        } else {			
            if (!filtroBI.getCdClasseMaquina().equals("")) {
                strSQLWhereSubQuery = strSQLWhereSubQuery.concat("  AND h.classe = :cdclasse ");	
            } else {
                if (!filtroBI.getCdGalpao().equals("")) {
                    strSQLWhereSubQuery = strSQLWhereSubQuery.concat("  AND gal.cdgalpao = :cdgalpao ");
                }
            }
            
        }
    }

    // tabela relacionados a ferramenta
    if (!filtroBI.getCdRap().equals("")) {
        strSQLWhereSubQuery = strSQLWhereSubQuery.concat("  AND a.cdmolestendido = :cdrap ");	
    }
    
    // tabela relacionado a grupo de ferramenta
    if (!filtroBI.getCdGrpRap().equals("")) {
        strSQLWhereSubQuery = strSQLWhereSubQuery.concat("  AND gf.cdgrpmol = :cdgrprap ");	
    }
    
    if (!filtroBI.getCdProduto().equals("")) {
        strSQLWhereSubQuery = strSQLWhereSubQuery.concat("  AND mp.cdproduto = :cdproduto ");	
    }
    
    
    strSQL = "SELECT ";
    
    if (!strSQLGroup.equals("")) {
        strSQL = strSQL.concat(strSQLGroup + ", ");
    }
    
    strSQL = strSQL.concat(strSQLIndicadores);
    
    strSQL = strSQL.concat(" FROM (SELECT ");
    
    if (!strSQLGroupBySubQuery.equals("")) {
        strSQL = strSQL.concat(strSQLGroupBySubQuery + ", ");
    }
    
    strSQL = strSQL.concat(strSQLTotaisSubQuery);
    strSQL = strSQL.concat(strSQLTabelasSubQuery);
    strSQL = strSQL.concat(strSQLWhereSubQuery);	
    
    if (!strSQLGroupBySubQuery.equals("")) {
        strSQL = strSQL.concat(" GROUP BY " + strSQLGroupBySubQuery);
    }
    strSQL = strSQL.concat(" ) t ");

    
    return strSQL;
};