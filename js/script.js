 // Inicializar valores
 let senhaAtual = 0;
 let ultimaSenha = 0;
 let contagemAtendimentos = 0;
 let registrosAtendimentos = [];

 // Mapear senhas para guichês
 const guiches = {
     1: "01",
     2: "02",
     3: "03",
     4: "04",
     5: "05",
     6: "06",
     7: "07",
     8: "08",
     9: "09",
     10: "10",
     11: "11",
     12: "12",
     13: "13",
     14: "14",
     15: "15"
 };

 // Mapear status dos guichês (ocupado ou liberado)
 let guichesStatus = {
     1: "liberado",
     2: "liberado",
     3: "liberado",
     4: "liberado",
     5: "liberado",
     6: "liberado",
     7: "liberado",
     8: "liberado",
     9: "liberado",
     10: "liberado",
     11: "liberado",
     12: "liberado",
     13: "liberado",
     14: "liberado",
     15: "liberado"
 };

 //Função para formatar a data e hora
 function formatarDataHora(dataHora) {
     return {
         data: dataHora.toLocaleDateString('pt-BR'),
         hora: dataHora.toLocaleTimeString('pt-BR')
     };
 }

// Função para atualizar o display da senha, guichê e contagem
 function atualizarDisplay(prefixo = '') {
     document.getElementById('senhaPrefixo').textContent = prefixo;
     document.getElementById('senhaAtualNumero').textContent = senhaAtual.toString().padStart(4, '0');
     document.getElementById('ultimaSenhaNumero').textContent = prefixo + ultimaSenha.toString().padStart(4, '0');
     
     //Implementação de uma div de atendiemnto diário div foi retirada
     //document.getElementById('contagemAtendimentosTexto').textContent = "Atendimentos Hoje: " + contagemAtendimentos;
 }

 // Função para incrementar a senha e direcionar ao guichê apropriado
//  function incrementarSenha(prefixo) {
//      ultimaSenha = senhaAtual;
//      senhaAtual++;
//      contagemAtendimentos++;
 
//      let guicheAtual = prompt("Digite o número do guichê (1-12) para a próxima senha:");
 
//      if (guiches[guicheAtual]) {
//          guichesStatus[guicheAtual] = "ocupado";
//          document.getElementById('guicheNumero').textContent = guiches[guicheAtual];
         
//          // Capturar data e hora do atendimento
//          let dataHoraAtual = new Date();
//          let dataHoraFormatada = formatarDataHora(dataHoraAtual);
//          let registro = {
//              Data: dataHoraFormatada.data,
//              Hora: dataHoraFormatada.hora,
//              Senha: prefixo + senhaAtual.toString().padStart(4, '0'),
//              Guiche: guiches[guicheAtual]
//          };
//          registrosAtendimentos.push(registro);
         
//          atualizarDisplay(prefixo);
//          document.getElementById('audioChamada').play();
//      } else {
//          alert("Guichê inválido.");
//          senhaAtual--;
//          contagemAtendimentos--;
//      }
//  }

    function determinarPrefixo(guicheNumero) {
    if (guicheNumero >= 1 && guicheNumero <= 6) {
      return "CAD";
    } else if (guicheNumero >= 7 && guicheNumero <= 12) {
      return "BRB";
    } else if (guicheNumero >= 13 && guicheNumero <= 15){
        return "DEF";
    }
    else {
      return "";
    }
    }

    // Função para incrementar a senha e direcionar ao guichê apropriado
    function incrementarSenha() {
    ultimaSenha = senhaAtual;
    senhaAtual++;
    contagemAtendimentos++;
  
    let guicheAtual = parseInt(prompt("Digite o número do guichê (1-12) para a próxima senha:"));
  
    if (guiches[guicheAtual]) {
      let prefixo = determinarPrefixo(guicheAtual);  // Determina o prefixo com base no guichê
  
      guichesStatus[guicheAtual] = "ocupado";
      document.getElementById("guicheNumero").textContent = guiches[guicheAtual];
  
      // Capturar data e hora do atendimento
      let dataHoraAtual = new Date();
      let dataHoraFormatada = formatarDataHora(dataHoraAtual);
      let registro = {
        Data: dataHoraFormatada.data,
        Hora: dataHoraFormatada.hora,
        Senha: prefixo + senhaAtual.toString().padStart(4, "0"),
        Guiche: guiches[guicheAtual],
      };
      registrosAtendimentos.push(registro);
  
      atualizarDisplay(prefixo);
      document.getElementById("audioChamada").play();
    } else {
      alert("Guichê inválido.");
      senhaAtual--;
      contagemAtendimentos--;
    }   
    }


 // Função para resetar senhas e contagem de atendimentos
 function resetarSenhas() {
     senhaAtual = 0;
     ultimaSenha = 0;
     atualizarDisplay();
 }

 // Função para resetar guichê
 function resetarGuiche() {
     // Reseta o status de todos os guichês para "liberado"
     for (let guiche in guichesStatus) {
         guichesStatus[guiche] = "liberado";

          // Atualiza o display do guichê para "0"
         document.getElementById('guicheNumero').textContent = "0";
         console.log("Guichê resetado para 0"); // Depuração
     }
 }

 // Função para resetar senhas e guichê
 function resetarSenhasEGuiche() {
     resetarSenhas();
     resetarGuiche();  // Chama a função que zera o guichê
     // Atualiza o display geral, incluindo o prefixo da senha
     atualizarDisplay('');
     console.log("Senhas e guichê resetados"); // Depuração
 }

 // Função para exportar os dados para Excel
 function exportarParaExcel() {
     const estiloCabecalho = {
         font: { bold: true, caps: true },
         fill: { fgColor: { rgb: "FFFF00" } },
         alignment: { horizontal: "center" }
     };

     const estiloResumo = {
         font: { bold: true },
         alignment: { horizontal: "center" }
     };

     let wsAtendimentos = XLSX.utils.json_to_sheet(registrosAtendimentos);
     let wsAtendimentosRange = XLSX.utils.decode_range(wsAtendimentos['!ref']);
     
     for (let col = wsAtendimentosRange.s.c; col <= wsAtendimentosRange.e.c; col++) {
         const cellAddress = { c: col, r: wsAtendimentosRange.s.r };
         const cellRef = XLSX.utils.encode_cell(cellAddress);
         if (wsAtendimentos[cellRef]) {
             wsAtendimentos[cellRef].s = estiloCabecalho;
         }
     }

     let wsResumo = XLSX.utils.aoa_to_sheet([
         ["Total de Atendimentos", contagemAtendimentos],
         ["Total de Senhas Geradas", senhaAtual]
     ]);

     const cellAddresses = [
         { c: 0, r: 0 },
         { c: 1, r: 0 },
         { c: 0, r: 1 },
         { c: 1, r: 1 }
     ];

     cellAddresses.forEach(({ c, r }) => {
         const cellAddress = { c, r };
         const cellRef = XLSX.utils.encode_cell(cellAddress);
         if (wsResumo[cellRef]) {
             wsResumo[cellRef].s = estiloResumo;
         }
     });

     let wb = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, wsAtendimentos, "Atendimentos");
     XLSX.utils.book_append_sheet(wb, wsResumo, "Resumo");

     let nomeArquivo = `atendimentos_${new Date().toISOString().split('T')[0]}.xlsx`;
     XLSX.writeFile(wb, nomeArquivo);
 }

 document.addEventListener("keydown", function (event) {
  
    if (event.key === "ArrowRight" || event.key === "ArrowUp")  {
      incrementarSenha();
    } else if (event.key === "r" || event.key === "R") {
      resetarSenhasEGuiche(); // Resetar senha e guichê ao pressionar "r"
    } else if (event.key === "s" || event.key === "S") {
      exportarParaExcel();
    }
  });

    // Adicionar evento para as teclas de atalho
    // document.addEventListener('keydown', function(event) {
    // let prefixo = '';

    // if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    //     // Determina o prefixo baseado no guichê selecionado
    //     let guicheAtual = parseInt(prompt("Digite o número do guichê (1-12) para a próxima senha:"));
        
    //     if (guicheAtual >= 1 && guicheAtual <= 6) {
    //         prefixo = 'CAD';
    //     } else if (guicheAtual >= 7 && guicheAtual <= 12) {
    //         prefixo = 'BRB';
    //     } else {
    //         alert("Guichê inválido.");
    //         return;  // Sai da função se o guichê for inválido
    //     }

    //     incrementarSenha(prefixo);
    //      } else if (event.key === 'r' || event.key === 'R') {
    //          resetarSenhasEGuiche();  // Resetar senha e guichê ao pressionar "r"
    //      } else if (event.key === 's' || event.key === 'S') {
    //          exportarParaExcel();
    //      }
    //  });
