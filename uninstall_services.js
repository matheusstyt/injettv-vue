var Service = require('node-windows').Service;
// Criando um novo objeto do Serviço
var svc = new Service({
//Nome do servico
name:'injettv1',
//Descricao que vai aparecer no Gerenciamento de serviço do Windows
description: 'Serviço de teste Nerds HQ',
//caminho absoluto do seu script
script: 'C:\\Users\\simone\\Documents\\desenvolvimento\\injettv-vue\\>'
});
svc.on('uninstall',function(){
console.log('Uninstall complete.');
});
// Desistalar serviço.
svc.uninstall();