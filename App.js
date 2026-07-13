// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('meuBotao');

  botao.addEventListener('click', () => {
    alert('Funciona! Lógica disparada do app.js');
  });
});
