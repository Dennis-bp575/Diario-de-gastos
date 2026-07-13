document.addEventListener('DOMContentLoaded', () => {
  // Elementos da tela
  const inputCashTotal = document.getElementById('cashTotal');
  const inputMetaDiaria = document.getElementById('metaDiaria');
  const inputGastoHoje = document.getElementById('gastoHoje');
  const btnRegistrar = document.getElementById('btnRegistrar');
  
  const txtSaldoAmanha = document.getElementById('saldoAmanha');
  const txtCashRestante = document.getElementById('cashRestante');

  // Variáveis para controlar os valores na memória do app
  let cashTotal = parseFloat(inputCashTotal.value) || 0;
  let metaDiaria = parseFloat(inputMetaDiaria.value) || 0;
  let saldoAcumulado = metaDiaria; // Começa valendo a meta do primeiro dia

  // Função simples para atualizar os textos na tela
  function atualizarTela() {
    txtSaldoAmanha.textContent = `R$ ${saldoAcumulado.toFixed(2)}`;
    txtCashRestante.textContent = `R$ ${cashTotal.toFixed(2)}`;

    // Muda a cor do saldo para vermelho se ficar negativo
    if (saldoAcumulado < 0) {
      txtSaldoAmanha.className = "text-xl font-bold text-red-400";
    } else {
      txtSaldoAmanha.className = "text-xl font-bold text-emerald-400";
    }
  }

  // Escuta o clique do botão para calcular o gasto
  btnRegistrar.addEventListener('click', () => {
    const gasto = parseFloat(inputGastoHoje.value) || 0;

    // 1. Atualiza o Cash Total (subtrai o que foi gasto de verdade)
    cashTotal = cashTotal - gasto;

    // 2. Lógica Acumulativa: Calcula a diferença do dia
    const sobraOuDificit doDia = metaDiaria - gasto;

    // 3. O saldo de amanhã recebe a meta do próximo dia + a sobra/déficit de hoje
    saldoAcumulado = metaDiaria + sobraOuDificit doDia;

    // Limpa o campo de gasto e atualiza a tela
    inputGastoHoje.value = '';
    atualizarTela();
  });

  // Atualiza as variáveis caso você altere os inputs de configuração no topo
  inputCashTotal.addEventListener('input', () => {
    cashTotal = parseFloat(inputCashTotal.value) || 0;
    atualizarTela();
  });

  inputMetaDiaria.addEventListener('input', () => {
    metaDiaria = parseFloat(inputMetaDiaria.value) || 0;
    saldoAcumulado = metaDiaria;
    atualizarTela();
  });

  // Mostra os valores iniciais assim que o app abre
  atualizarTela();
});
