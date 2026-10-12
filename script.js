// Configurações dos contatos
const CONFIG = {
    whatsapp: "",
    email: "",
    redes: {
        Instagram: "",
        GitHub: "",
        LinkedIn: ""
    }
};

// Menu do celular
function iniciarMenu() {
    const botao = document.getElementById("menuBotao");
    const menu = document.getElementById("menu");

    if (!botao || !menu) return;

    botao.addEventListener("click", () => {
        const aberto = menu.classList.toggle("aberto");

        botao.setAttribute("aria-expanded", aberto);
        botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("aberto");
            botao.setAttribute("aria-expanded", "false");
        });
    });
}

// Atualiza o ano do rodapé
function atualizarAno() {
    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }
}

// Configura os contatos e as redes sociais
function aplicarContatos() {
    const botao = document.getElementById("botaoWhatsapp");
    const aviso = document.getElementById("avisoWhatsapp");

    if (botao && CONFIG.whatsapp) {
        botao.href = "https://wa.me/" + CONFIG.whatsapp;
        botao.target = "_blank";
        botao.rel = "noopener";
    } else if (botao && aviso) {
        botao.addEventListener("click", (e) => {
            e.preventDefault();
            aviso.hidden = false;
        });
    }

    const email = document.getElementById("rodapeEmail");

    if (email && CONFIG.email) {
        email.hidden = false;
        email.textContent = CONFIG.email;
    }

    const redes = document.getElementById("redesSociais");

    if (!redes) return;

    Object.entries(CONFIG.redes).forEach(([nome, link]) => {
        if (link) {
            const a = document.createElement("a");

            a.href = link;
            a.textContent = nome;
            a.target = "_blank";
            a.rel = "noopener";

            redes.appendChild(a);
        }
    });
}

// Confere os dados do formulário
function iniciarFormulario() {
    const form = document.getElementById("formContato");

    if (!form) return;

    const regras = {
        nome: (v) => v.trim().length < 3
            ? "Informe seu nome completo."
            : "",

        email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            ? ""
            : "Informe um e-mail válido.",

        tipo: (v) => v
            ? ""
            : "Escolha o tipo de projeto.",

        mensagem: (v) => v.trim().length < 10
            ? "Escreva uma mensagem com pelo menos 10 caracteres."
            : ""
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let valido = true;

        Object.keys(regras).forEach((campo) => {
            const mensagem = regras[campo](form.elements[campo].value);
            const erro = form.querySelector('[data-erro="' + campo + '"]');

            if (erro) {
                erro.textContent = mensagem;
            }

            if (mensagem) {
                valido = false;
            }
        });

        const retorno = document.getElementById("retorno");

        if (retorno) {
            retorno.textContent = valido
                ? "Dados válidos! Este formulário é apenas demonstrativo e não envia mensagens."
                : "";
        }

        if (valido) {
            form.reset();
        }
    });
}

// Faz os elementos aparecerem quando a página é rolada
function iniciarEntradaAoRolar() {
    const itens = document.querySelectorAll(
        ".card, .diferenciais li, .valores div, .grupo"
    );

    if (!("IntersectionObserver" in window)) return;

    const observador = new IntersectionObserver((lista) => {
        lista.forEach((item) => {
            if (item.isIntersecting) {
                item.target.classList.add("visivel");
                observador.unobserve(item.target);
            }
        });
    }, {
        threshold: 0.15
    });

    itens.forEach((item, i) => {
        item.classList.add("revelar");
        item.style.transitionDelay = (i % 4) * 70 + "ms";
        observador.observe(item);
    });
}

// Efeito de luz nos cards quando o mouse passa por eles
function iniciarBrilhoDosCards() {
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const posicao = card.getBoundingClientRect();

            card.style.setProperty("--x", (e.clientX - posicao.left) + "px");
            card.style.setProperty("--y", (e.clientY - posicao.top) + "px");
        });
    });
}

// Adiciona sombra no cabeçalho ao rolar a página
function iniciarSombraDoCabecalho() {
    const cabecalho = document.querySelector(".cabecalho");

    if (!cabecalho) return;

    window.addEventListener("scroll", () => {
        cabecalho.classList.toggle("rolou", window.scrollY > 10);
    }, {
        passive: true
    });
}

// Inicia as funções quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    iniciarMenu();
    atualizarAno();
    aplicarContatos();
    iniciarFormulario();

    iniciarEntradaAoRolar();
    iniciarBrilhoDosCards();
    iniciarSombraDoCabecalho();
});



