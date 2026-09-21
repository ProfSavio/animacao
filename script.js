const canvas = document.querySelector("#canvas");
const contexto = canvas.getContext("2d");

// Botões
const botaoReproduzir = document.querySelector("#botaoReproduzir");
const botaoProximo = document.querySelector("#botaoProximo");
const botaoAnterior = document.querySelector("#botaoAnterior");

// ==============================
// CONFIGURAÇÕES DO SPRITESHEET
// ==============================

const imagem = new Image();

// Aqui definimos a imagem do spritesheet
imagem.src = "animacao_bola.png";

// Quantidade de colunas e linhas
const colunas = 3;
const linhas = 4;

const totalQuadros = colunas * linhas;

// Quadro atual
let quadroAtual = 0;

// Velocidade da animação
const duracaoQuadro = 100; // milissegundos

// Guarda o momento em que o último quadro foi exibido
let ultimoMomentoQuadro = 0;

// Estado da animação
let estaReproduzindo = false;

// ==============================
// QUANDO A IMAGEM CARREGAR
// ==============================

imagem.onload = () => {
    // Tamanho de cada quadro
    const larguraQuadro = imagem.width / colunas;
    const alturaQuadro = imagem.height / linhas;

    // O Canvas terá o tamanho de UM quadro
    canvas.width = larguraQuadro;
    canvas.height = alturaQuadro;

    // Mostra o primeiro quadro
    desenharQuadro();

    // Inicia o loop da animação
    requestAnimationFrame(animar);
};

// ==============================
// DESENHA O QUADRO ATUAL
// ==============================

function desenharQuadro() {
    const larguraQuadro = imagem.width / colunas;
    const alturaQuadro = imagem.height / linhas;

    // Descobre a coluna e a linha do quadro atual
    const coluna = quadroAtual % colunas;
    const linha = Math.floor(quadroAtual / colunas);

    // Coordenadas dentro do spritesheet
    const origemX = coluna * larguraQuadro;
    const origemY = linha * alturaQuadro;

    // Limpa o Canvas
    contexto.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Desenha apenas o quadro atual
    contexto.drawImage(
        imagem,

        origemX,
        origemY,
        larguraQuadro,
        alturaQuadro,

        0,
        0,
        canvas.width,
        canvas.height
    );

    // Atualiza as informações mostradas na página
    document.getElementById("numeroQuadro").textContent = quadroAtual + 1;
    document.getElementById("totalQuadros").textContent = totalQuadros;
    document.getElementById("numeroColuna").textContent = coluna + 1;
    document.getElementById("numeroLinha").textContent = linha + 1;
}

// ==============================
// PRÓXIMO QUADRO
// ==============================

function proximoQuadro() {
    quadroAtual++;
    // Se chegarmos ao final dos quadros,
    // voltamos para o primeiro
    if (quadroAtual >= totalQuadros) {
        quadroAtual = 0;
    }
    desenharQuadro();
}

// ==============================
// QUADRO ANTERIOR
// ==============================

function quadroAnterior() {
    quadroAtual--;
    // Se estivermos antes do primeiro quadro,
    // vamos para o último quadro
    if (quadroAtual < 0) {
        quadroAtual = totalQuadros - 1;
    }
    desenharQuadro();
}

// ==============================
// REPRODUZIR / PARAR
// ==============================
function alternarReproducao() {
    // Inverte o estado da animação
    estaReproduzindo = !estaReproduzindo;
    if (estaReproduzindo) {
        botaoReproduzir.textContent = "Parar";
        // Evita que a animação avance imediatamente
        ultimoMomentoQuadro = performance.now();
    } else {
        botaoReproduzir.textContent = "Reproduzir";
    }
}

// ==============================
// LOOP DA ANIMAÇÃO
// ==============================
function animar(momento) {
    if (
        estaReproduzindo &&
        momento - ultimoMomentoQuadro >= duracaoQuadro
    ) {
        proximoQuadro();
        ultimoMomentoQuadro = momento;
    }
    // Solicita ao navegador que execute
    // a próxima atualização da animação
    requestAnimationFrame(animar);
}

// ==============================
// EVENTOS DOS BOTÕES
// ==============================
// Botão Reproduzir / Parar
botaoReproduzir.addEventListener(
    "click",
    alternarReproducao
);

// Botão Próximo
botaoProximo.addEventListener("click", () => {
    // Ao navegar manualmente,
    // pausamos a animação
    estaReproduzindo = false;
    botaoReproduzir.textContent = "Reproduzir";
    proximoQuadro();
});

// Botão Anterior
botaoAnterior.addEventListener("click", () => {
    // Ao navegar manualmente,
    // pausamos a animação
    estaReproduzindo = false;
    botaoReproduzir.textContent = "Reproduzir";
    quadroAnterior();
});
