// Lista para armazenar os números já sorteados, evitando repetições
let listaDeNumerosSorteados = [];

// Define o limite superior para o número secreto (neste caso, 1000)
let numeroLimite = 1000;

// Gera o número secreto aleatoriamente
let numeroSecreto = gerarNumeroAleatorio();

// Contador de tentativas do jogador
let tentativas = 1;

// Função para exibir texto em um elemento HTML e usar a biblioteca ResponsiveVoice para leitura em voz alta
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o elemento HTML pela tag
    campo.innerHTML = texto; // Insere o texto no elemento selecionado
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Usa a biblioteca ResponsiveVoice para ler o texto
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    // let titulo = document.querySelector('h1');
    // titulo.innerHTML = 'Jogo do número secreto';
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título do jogo

    // let paragrafo = document.querySelector('p');
    // paragrafo.innerHTML = 'Escolha um número entre 1 e 10';  
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`); // Exibe as instruções iniciais
}

// Exibe a mensagem inicial ao carregar o jogo
exibirMensagemInicial();

// Função para verificar se o chute do jogador está correto
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor do campo de entrada
     // Se o chute estiver correto, exibe mensagem de acerto e o número de tentativas
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Ajusta o texto para singular ou plural
        let mensagemTentativas = `Você descobriu o número secreto com 
        ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        
        // Habilita o botão de reiniciar o jogo
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        // Se o chute estiver errado, dá uma dica se o número secreto é maior ou menor
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
         // Incrementa o contador de tentativas e limpa o campo de entrada
        tentativas++;
        limparCampo();
    }
}

// Função para gerar um número aleatório único
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número entre 1 e 1000
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Obtém o tamanho da lista de números sorteados

    // Se todos os números já foram sorteados, reinicia a lista
    if (quantidadeDeElementosNaLista == 10) {
        listaDeNumerosSorteados = [];
    }

    // Verifica se o número já foi sorteado anteriormente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Se já foi sorteado, gera outro número
    } else {
        // Push = adiciona item ao final da lista
        // Adiciona o número à lista de sorteados e retorna o número
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados); // Exibe a lista de números sorteados no console para debug
        return numeroEscolhido;
    }
}
// Função para limpar o campo de entrada após cada tentativa
function limparCampo() {
    chute = document.querySelector('input'); // Seleciona o campo de entrada
    chute.value = ''; // Limpa o valor do campo
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de entrada
    tentativas = 1; // Reseta o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar

}

