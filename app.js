document.addEventListener('DOMContentLoaded', () => {
  // Elementos da tela
  const inputCashTotal = document.getElementById('cashTotal');
  const inputMetaDiaria = document.getElementById('metaDiaria');
  const inputGastoHoje = document.getElementById('gastoHoje');
  const btnRegistrar = document.getElementById('btnRegistrar');
  
  const txtSaldoAmanha = document.getElementById('saldoAmanha');
  const txtCashRestante = document.getElementById('cashRestante');
  const txtDiasRestantes = document.getElementById('dias-restantes');

  // --- INTEGRANDO BANCO LOCAL (LOCALSTORAGE) ---
  // Tenta puxar os dados salvos anteriormente, se não existirem, usa o padrão do HTML
  let cashTotal = parseFloat(localStorage.getItem('cashTotal')) || parseFloat(inputCashTotal.value) || 0;
  let metaDiaria = parseFloat(localStorage.getItem('metaDiaria')) || parseFloat(inputMetaDiaria.value) || 0;
  let saldoAcumulado = parseFloat(localStorage.getItem('saldoAcumulado')) || metaDiaria;

  // Atualiza os inputs na tela com os valores que vieram do banco local
  inputCashTotal.value = cashTotal;
  inputMetaDiaria.value = metaDiaria;

  // Executa o cálculo de dias restantes diretamente
  let dias = calcularDiasRestantes();
  let cashTotalRestante = dias * metaDiaria;

  // Função para calcular os dias restantes (Corrigida sem o listener interno)
  function calcularDiasRestantes() {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth(); 
    const ultimoDiaDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const diasRestantes = ultimoDiaDoMes - hoje.getDate();

    if (txtDiasRestantes) {
      txtDiasRestantes.innerText = diasRestantes;
    }
    return diasRestantes; 
  }

  // Função para salvar o estado atual das variáveis no Banco Local
  function salvarNoBancoLocal() {
    localStorage.setItem('cashTotal', cashTotal);
    localStorage.setItem('metaDiaria', metaDiaria);
    localStorage.setItem('saldoAcumulado', saldoAcumulado);
  }

  // Função simples para atualizar os textos na tela
  function atualizarTela() {
    // Recalcula o cash total restante baseado na meta e dias atuais
    cashTotalRestante = dias * metaDiaria;

    txtSaldoAmanha.textContent = `R$ ${saldoAcumulado.toFixed(2)}`;
    txtCashRestante.textContent = `R$ ${cashTotalRestante.toFixed(2)}`;

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

    if (gasto <= 0) {
      alert("Por favor, insira um valor de gasto válido.");
      return;
    }

    // 1. Atualiza o Cash Total (subtrai o que foi gasto de verdade)
    cashTotal = cashTotal - gasto;
    inputCashTotal.value = cashTotal.toFixed(2); // Atualiza o input de configuração na tela

    // 2. Lógica Acumulativa: Calcula a diferença do dia
    const sobraOuDificitdoDia = metaDiaria - gasto;

    // 3. O saldo de amanhã recebe a meta do próximo dia + a sobra/déficit de hoje
    saldoAcumulado = metaDiaria + sobraOuDificitdoDia;

    // Limpa o campo de gasto, salva no banco e atualiza a tela
    inputGastoHoje.value = '';
    salvarNoBancoLocal();
    atualizarTela();
  });

  // Atualiza as variáveis caso você altere os inputs de configuração no topo
  inputCashTotal.addEventListener('input', () => {
    cashTotal = parseFloat(inputCashTotal.value) || 0;
    salvarNoBancoLocal();
    atualizarTela();
  });

  inputMetaDiaria.addEventListener('input', () => {
    metaDiaria = parseFloat(inputMetaDiaria.value) || 0;
    saldoAcumulado = metaDiaria;
    salvarNoBancoLocal();
    atualizarTela();
  });

  // Mostra os valores iniciais assim que o app abre
  atualizarTela();
});

