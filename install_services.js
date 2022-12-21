var Service = require('node-windows').Service;
// Criando um novo objeto do Serviço
var svc = new Service({
//Nome do servico
name:'injettv1',
//Descricao que vai aparecer no Gerenciamento de serviço do Windows
description: 'Serviço de teste novo InjetTV',
//caminho absoluto do seu script
script: 'C:\\Users\\simone\\Documents\\desenvolvimento\\injettv-vue\\server.js>'
});
svc.on('install',function(){
svc.start();
});
// instalando o servico
svc.install();