class PtDTO {
	
	EVENTO_BEM_SUCEDIDO = 0;
	ERRO_PT_JA_EXISTE = 1;
	ERRO_TIPOPOSTO_DESCONHECIDO = 2;	
	ERRO_CC_DESCONHECIDO = 3;
	ERRO_USUARIO_REVISAO_DESCONHECIDO = 4;
	ERRO_USUARIO_STATUS_DESCONHECIDO = 5;
	ERRO_DESCONHECIDO = 6;
	ERRO_CDPT_INVALIDO = 7;
	ERRO_REATIVACAO_INDISPONIVEL = 8;
	ERRO_GRUPOTRABALHO_DESCONHECIDO = 9;
	ERRO_TP_IMPPROG = 10;
	ERRO_PERC_VARITMO_VAZIO = 11;
	ERRO_QTD_VARITMO_VAZIO = 12;

	OmPt Pt;
	PAsDTO pas;
	OmPtcncsDTO ptsCncs;
	
    PAsDTO pasParaExclusao;
    OmPtcncsDTO cncsParaExclusao;
    HomologacoesDTO homologacoes;
    resultadoEvento;
    OmCfgurl omcfgurl;

    Boolean isMostrarGtDoPt = false;


    setResultadoEvento(resultadoEvento) {
        this.resultadoEvento = resultadoEvento;
    }

	getEVENTO_BEM_SUCEDIDO() {
		return EVENTO_BEM_SUCEDIDO;
	}

	getERRO_CC_DESCONHECIDO() {
		return ERRO_CC_DESCONHECIDO;
	}

	getERRO_USUARIO_REVISAO_DESCONHECIDO() {
		return ERRO_USUARIO_REVISAO_DESCONHECIDO;
	}

	getERRO_USUARIO_STATUS_DESCONHECIDO() {
		return ERRO_USUARIO_STATUS_DESCONHECIDO;
	}

	getERRO_DESCONHECIDO() {
		return ERRO_DESCONHECIDO;
	}

	setEVENTO_BEM_SUCEDIDO(evento_bem_sucedido) {
		EVENTO_BEM_SUCEDIDO = evento_bem_sucedido;
	}

	setERRO_CC_DESCONHECIDO(erro_cc_desconhecido) {
		ERRO_CC_DESCONHECIDO = erro_cc_desconhecido;
	}

	setERRO_USUARIO_REVISAO_DESCONHECIDO(
			erro_usuario_revisao_desconhecido) {
		ERRO_USUARIO_REVISAO_DESCONHECIDO = erro_usuario_revisao_desconhecido;
	}

	setERRO_USUARIO_STATUS_DESCONHECIDO(
			erro_usuario_status_desconhecido) {
		ERRO_USUARIO_STATUS_DESCONHECIDO = erro_usuario_status_desconhecido;
	}

	setERRO_DESCONHECIDO(erro_desconhecido) {
		ERRO_DESCONHECIDO = erro_desconhecido;
	}

	getERRO_REATIVACAO_INDISPONIVEL() {
		return ERRO_REATIVACAO_INDISPONIVEL;
	}

	setERRO_REATIVACAO_INDISPONIVEL(erro_reativacao_indisponivel) {
		ERRO_REATIVACAO_INDISPONIVEL = erro_reativacao_indisponivel;
	}

	getERRO_PT_JA_EXISTE() {
		return ERRO_PT_JA_EXISTE;
	}

	setERRO_PT_JA_EXISTE(erro_pt_ja_existe) {
		ERRO_PT_JA_EXISTE = erro_pt_ja_existe;
	}

	getERRO_TIPOPOSTO_DESCONHECIDO() {
		return ERRO_TIPOPOSTO_DESCONHECIDO;
	}

	setERRO_TIPOPOSTO_DESCONHECIDO(erro_tipoposto_desconhecido) {
		ERRO_TIPOPOSTO_DESCONHECIDO = erro_tipoposto_desconhecido;
	}

	getERRO_CDPT_INVALIDO() {
		return ERRO_CDPT_INVALIDO;
	}

	setERRO_CDPT_INVALIDO(erro_cdpt_invalido) {
		ERRO_CDPT_INVALIDO = erro_cdpt_invalido;
	}

	getERRO_GRUPOTRABALHO_DESCONHECIDO() {
		return ERRO_GRUPOTRABALHO_DESCONHECIDO;
	}

	setERRO_GRUPOTRABALHO_DESCONHECIDO(
			erro_grupotrabalho_desconhecido) {
		ERRO_GRUPOTRABALHO_DESCONHECIDO = erro_grupotrabalho_desconhecido;
	}

	PAsDTO getPas() {
		return pas;
	}

	setPas(PAsDTO pas) {
		this.pas = pas;
	}
	
	OmPtcncsDTO getPtsCncs() {
		return ptsCncs;
	}

	setPtsCncs(OmPtcncsDTO ptsCncs) {
		this.ptsCncs = ptsCncs;
	}

	PAsDTO getPasParaExclusao() {
		return pasParaExclusao;
	}

	setPasParaExclusao(PAsDTO pasParaExclusao) {
		this.pasParaExclusao = pasParaExclusao;
	}
	
	OmPtcncsDTO getCncsParaExclusao() {
		return cncsParaExclusao;
	}

	setCncsParaExclusao(OmPtcncsDTO cncsParaExclusao) {
		this.cncsParaExclusao = cncsParaExclusao;
	}

	HomologacoesDTO getHomologacoes() {
		return homologacoes;
	}

	setHomologacoes(HomologacoesDTO homologacoes) {
		this.homologacoes = homologacoes;
	}

	getERRO_TP_IMPPROG() {
		return ERRO_TP_IMPPROG;
	}

	setERRO_TP_IMPPROG(eRRO_TP_IMPPROG) {
		ERRO_TP_IMPPROG = eRRO_TP_IMPPROG;
	}

	OmCfgurl getOmcfgurl() {
		return omcfgurl;
	}

	setOmcfgurl(OmCfgurl omcfgurl) {
		this.omcfgurl = omcfgurl;
	}

	getERRO_PERC_VARITMO_VAZIO() {
		return ERRO_PERC_VARITMO_VAZIO;
	}

	setERRO_PERC_VARITMO_VAZIO(eRRO_PERC_VARITMO_VAZIO) {
		ERRO_PERC_VARITMO_VAZIO = eRRO_PERC_VARITMO_VAZIO;
	}

	getERRO_QTD_VARITMO_VAZIO() {
		return ERRO_QTD_VARITMO_VAZIO;
	}

	setERRO_QTD_VARITMO_VAZIO(eRRO_QTD_VARITMO_VAZIO) {
		ERRO_QTD_VARITMO_VAZIO = eRRO_QTD_VARITMO_VAZIO;
	}

	Boolean getIsMostrarGtDoPt() {
		return isMostrarGtDoPt;
	}

	setIsMostrarGtDoPt(Boolean isMostrarGtDoPt) {
		this.isMostrarGtDoPt = isMostrarGtDoPt;
	}
