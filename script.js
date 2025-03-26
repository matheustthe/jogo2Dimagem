const canvas = document.getElementById('JogoCanvas');
const ctx = canvas.getContext('2d');
let gravidade = 0.5;
let gameOver = false;
let pontuacao = 0;
let pontuacaoMaxima = 0; // Adicionando a variável de pontuação máxima
let tempo = 0;
let tempoUltimoFrame = Date.now();

// Definição do personagem
let personagem = {
    x: 100,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    pulando: false
};

// Definição do obstáculo
let obstaculo = {
    x: canvas.width - 100,
    y: canvas.height - 100,
    largura: 30,
    altura: 100,
    velocidade_x: 10 // Velocidade inicial do obstáculo
};

// Função para desenhar o personagem
function desenharPersonagem() {
    ctx.fillStyle = 'red';
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura
    );
}

// Função para atualizar a posição do personagem
function atualizaPersonagem() {
    if (personagem.pulando) {
        personagem.y -= personagem.velocidade_y;
        personagem.velocidade_y -= gravidade;
        if (personagem.y >= canvas.height - personagem.altura) {
            personagem.y = canvas.height - personagem.altura;
            personagem.pulando = false;
            personagem.velocidade_y = 0;
        }
    }
}

// Função para desenhar o obstáculo
function desenharObstaculo() {
    ctx.fillStyle = 'black';
    ctx.fillRect(
        obstaculo.x,
        obstaculo.y,
        obstaculo.largura,
        obstaculo.altura
    );
}

// Função para atualizar a posição do obstáculo
function atualizarObstaculo() {
    // Aumentar a velocidade do obstáculo conforme o tempo
    const tempoDecorrido = Math.floor(tempo / 1000); // Tempo em segundos
    obstaculo.velocidade_x = 10 + tempoDecorrido * 0.2; // Aumenta a velocidade conforme o tempo

    obstaculo.x -= obstaculo.velocidade_x;

    // Quando o obstáculo sai da tela, ele reaparece no lado direito e aumenta a pontuação
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width;
        pontuacao++;  // Aumenta a pontuação conforme o obstáculo passa
    }
}

// Função para verificar a colisão entre o personagem e o obstáculo
function verificaColisao() {
    if (obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.largura + obstaculo.x > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y) {
        obstaculo.velocidade_x = 0;
        personagem.velocidade_y = 0;
        ctx.fillStyle = 'black';
        ctx.font = '50px Arial';
        ctx.fillText('PERDEDOR 😭🫵🏽', 50, 100);
        gameOver = true;

        // Verifica se a pontuação atual é maior que a pontuação máxima
        if (pontuacao > pontuacaoMaxima) {
            pontuacaoMaxima = pontuacao;
        }
    }
}

// Função para desenhar a pontuação e o tempo na tela
function desenharPontuacaoETempo() {
    document.getElementById('pontuacao').textContent = 'Pontuação: ' + pontuacao;
    
    let tempoDecorrido = Math.floor(tempo / 1000);
    document.getElementById('tempo').textContent = 'Tempo: ' + tempoDecorrido + 's';
    
    document.getElementById('pontuacaoMaxima').textContent = 'Pontuação Máxima: ' + pontuacaoMaxima;
}

// Função principal de loop do jogo
function loop() {
    if (!gameOver) {
        let tempoAtual = Date.now();
        tempo += tempoAtual - tempoUltimoFrame;
        tempoUltimoFrame = tempoAtual;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        desenharPersonagem();
        atualizaPersonagem();
        desenharObstaculo();
        atualizarObstaculo();
        verificaColisao();
        desenharPontuacaoETempo();

        requestAnimationFrame(loop);
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    gameOver = false;
    pontuacao = 0;
    tempo = 0;
    tempoUltimoFrame = Date.now();

    personagem = {
        x: 100,
        y: canvas.height - 50,
        largura: 50,
        altura: 50,
        velocidade_y: 0,
        pulando: false
        imagem: new image()
    };
personagem.imagem.src='./personagem.png'

function desenharPersonagem(){
    ctx.drawImage(
        personagem.imagem,
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura,)
}
    obstaculo = {
        x: canvas.width - 100,
        y: canvas.height - 100,
        largura: 30,
        altura: 100,
        velocidade_x: 10 // Velocidade inicial
    };

    loop();  // Reinicia o loop de animação
}

// Adiciona o evento de clique no botão para reiniciar o jogo
document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJogo);

// Evento de pular com a tecla de espaço
document.addEventListener('keypress', (evento) => {
    if (evento.code === 'Space' && !personagem.pulando && !gameOver) {
        personagem.velocidade_y = 15;
        personagem.pulando = true;
    }
});

// Inicia o loop do jogo
loop();
