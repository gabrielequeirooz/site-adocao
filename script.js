
/* =====================================
   LISTA DE ANIMAIS
===================================== */

let animais = [

    {
        nome: "Bob",
        tipo: "cachorro",
        idade: "2 anos",
        porte: "Médio",
        energia: "alta",
        espaco: "casa",
        tempo: "muito",
        imagem: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600"
    },

    {
        nome: "Luna",
        tipo: "gato",
        idade: "1 ano",
        porte: "Pequeno",
        energia: "baixa",
        espaco: "apartamento",
        tempo: "pouco",
        imagem: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600"
    },

    {
        nome: "Max",
        tipo: "cachorro",
        idade: "3 anos",
        porte: "Grande",
        energia: "alta",
        espaco: "casa",
        tempo: "muito",
        imagem: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600"
    },

    {
        nome: "Mel",
        tipo: "gato",
        idade: "6 meses",
        porte: "Pequeno",
        energia: "media",
        espaco: "apartamento",
        tempo: "medio",
        imagem: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600"
    },

    {
        nome: "Thor",
        tipo: "cachorro",
        idade: "4 anos",
        porte: "Médio",
        energia: "media",
        espaco: "casa",
        tempo: "medio",
        imagem: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600"
    },

    {
        nome: "Simba",
        tipo: "gato",
        idade: "2 anos",
        porte: "Pequeno",
        energia: "baixa",
        espaco: "apartamento",
        tempo: "pouco",
        imagem: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=600"
    }

];


/* =====================================
   FUNÇÃO PARA VERIFICAR LOGIN
===================================== */

function verificarLogin() {

    let usuario = localStorage.getItem("usuarioLogado");

    if (!usuario) {

        alert("Faça login para continuar!");

        window.location.href = "acesso.html";

        return false;
    }

    return true;
}


/* =====================================
   LOGIN E CADASTRO
===================================== */

let mostrarCadastro = document.getElementById("mostrarCadastro");

let mostrarLogin = document.getElementById("mostrarLogin");

let formCadastro = document.getElementById("formCadastro");

let formLogin = document.getElementById("formLogin");


/* ALTERNAR ENTRE OS FORMULÁRIOS */

if (mostrarCadastro && mostrarLogin) {

    mostrarCadastro.addEventListener("click", function() {

        formCadastro.classList.remove("escondido");

        formLogin.classList.add("escondido");

        mostrarCadastro.classList.add("ativa");

        mostrarLogin.classList.remove("ativa");

    });


    mostrarLogin.addEventListener("click", function() {

        formLogin.classList.remove("escondido");

        formCadastro.classList.add("escondido");

        mostrarLogin.classList.add("ativa");

        mostrarCadastro.classList.remove("ativa");

    });

}


/* CADASTRAR USUÁRIO */

if (formCadastro) {

    formCadastro.addEventListener("submit", function(event) {

        event.preventDefault();

        let nome = document.getElementById("nome").value;

        let email = document.getElementById("emailCadastro").value.toLowerCase().trim();

        let senha = document.getElementById("senhaCadastro").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let existe = usuarios.find(function(usuario) {

            return usuario.email === email;

        });


        if (existe) {

            alert("Este e-mail já está cadastrado!");

            return;
        }


        let novoUsuario = {

            nome: nome,

            email: email,

            senha: senha

        };


        usuarios.push(novoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        localStorage.setItem("usuarioLogado", email);

        alert("Cadastro realizado com sucesso!");

        window.location.href = "perfil.html";

    });

}


/* REALIZAR LOGIN */

if (formLogin) {

    formLogin.addEventListener("submit", function(event) {

        event.preventDefault();

        let email = document.getElementById("emailLogin").value.toLowerCase().trim();

        let senha = document.getElementById("senhaLogin").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


        let usuarioEncontrado = usuarios.find(function(usuario) {

            return usuario.email === email &&
                   usuario.senha === senha;

        });


        if (usuarioEncontrado) {

            localStorage.setItem("usuarioLogado", email);

            let perfis = JSON.parse(localStorage.getItem("perfis")) || [];

            let perfilExiste = perfis.find(function(perfil) {

                return perfil.email === email;

            });


            alert("Login realizado com sucesso!");


            if (perfilExiste) {

                window.location.href = "recomendacoes.html";

            } else {

                window.location.href = "perfil.html";

            }

        } else {

            alert("E-mail ou senha incorretos!");

        }

    });

}


/* =====================================
   SALVAR PERFIL DO ADOTANTE
===================================== */

let formPerfil = document.getElementById("formPerfil");


if (formPerfil) {

    if (!verificarLogin()) {

        formPerfil.style.display = "none";

    } else {

        formPerfil.addEventListener("submit", function(event) {

            event.preventDefault();

            let perfil = {

                email: localStorage.getItem("usuarioLogado"),

                renda: document.getElementById("renda").value,

                rotina: document.getElementById("rotina").value,

                moradia: document.getElementById("moradia").value,

                tempo: document.getElementById("tempo").value,

                experiencia: document.getElementById("experiencia").value,

                preferencia: document.getElementById("preferencia").value

            };


            let perfis = JSON.parse(localStorage.getItem("perfis")) || [];


            let indice = perfis.findIndex(function(item) {

                return item.email === perfil.email;

            });


            if (indice >= 0) {

                perfis[indice] = perfil;

            } else {

                perfis.push(perfil);

            }


            localStorage.setItem("perfis", JSON.stringify(perfis));

            alert("Seu perfil foi salvo com sucesso!");

            window.location.href = "recomendacoes.html";

        });

    }

}


/* =====================================
   ESCOLHER ANIMAL
===================================== */

function escolherAnimal(nome) {

    if (!verificarLogin()) {

        return;

    }


    let animalEscolhido = animais.find(function(animal) {

        return animal.nome === nome;

    });


    if (animalEscolhido) {

        localStorage.setItem(
            "animalEscolhido",
            JSON.stringify(animalEscolhido)
        );

        window.location.href = "adocao.html";

    }

}


/* =====================================
   MOSTRAR TODOS OS ANIMAIS
===================================== */

let listaAnimais = document.getElementById("listaAnimais");


function mostrarAnimais(lista, elemento) {

    if (!elemento) {

        return;

    }


    elemento.innerHTML = "";


    lista.forEach(function(animal) {

        let card = document.createElement("article");

        card.classList.add("animal");


        card.innerHTML = `

            <img src="${animal.imagem}" alt="${animal.nome}">

            <h3>${animal.nome}</h3>

            <p>Tipo: ${animal.tipo}</p>

            <p>Idade: ${animal.idade}</p>

            <p>Porte: ${animal.porte}</p>

            <p>Energia: ${animal.energia}</p>

            <button class="botao" type="button"
                onclick="escolherAnimal('${animal.nome}')">

                Tenho interesse em adotar

            </button>

        `;


        elemento.appendChild(card);

    });

}


if (listaAnimais) {

    mostrarAnimais(animais, listaAnimais);

}


/* =====================================
   RECOMENDAÇÕES PERSONALIZADAS
===================================== */

let resultado = document.getElementById("resultadoRecomendacoes");


if (resultado) {

    if (!verificarLogin()) {

        resultado.style.display = "none";

    } else {

        let email = localStorage.getItem("usuarioLogado");

        let perfis = JSON.parse(localStorage.getItem("perfis")) || [];


        let perfil = perfis.find(function(item) {

            return item.email === email;

        });


        if (!perfil) {

            alert("Preencha seu perfil primeiro!");

            window.location.href = "perfil.html";

        } else {


            let recomendados = animais.map(function(animal) {

                let pontos = 0;


                /* PREFERÊNCIA DO ANIMAL */

                if (perfil.preferencia === "qualquer" ||
                    perfil.preferencia === animal.tipo) {

                    pontos += 3;

                }


                /* ESPAÇO DISPONÍVEL */

                if (perfil.moradia === "apartamento" &&
                    animal.espaco === "apartamento") {

                    pontos += 3;

                }

                if (perfil.moradia !== "apartamento" &&
                    animal.espaco === "casa") {

                    pontos += 3;

                }


                /* TEMPO DISPONÍVEL */

                if (perfil.tempo === animal.tempo) {

                    pontos += 2;

                }


                /* ROTINA E ENERGIA */

                if (perfil.rotina === "agitada" &&
                    animal.energia === "alta") {

                    pontos += 2;

                }

                if (perfil.rotina === "tranquila" &&
                    animal.energia === "baixa") {

                    pontos += 2;

                }

                if (perfil.rotina === "moderada" &&
                    animal.energia === "media") {

                    pontos += 2;

                }


                return {

                    nome: animal.nome,

                    tipo: animal.tipo,

                    idade: animal.idade,

                    porte: animal.porte,

                    energia: animal.energia,

                    espaco: animal.espaco,

                    tempo: animal.tempo,

                    imagem: animal.imagem,

                    pontos: pontos

                };

            });


            /* ORGANIZAR POR COMPATIBILIDADE */

            recomendados.sort(function(a, b) {

                return b.pontos - a.pontos;

            });


            /* MOSTRAR RESULTADOS */

            mostrarRecomendacoes(recomendados);

        }

    }

}


/* FUNÇÃO PARA MOSTRAR RECOMENDAÇÕES */

function mostrarRecomendacoes(lista) {

    if (!resultado) {

        return;

    }


    resultado.innerHTML = "";


    lista.forEach(function(animal) {

        let card = document.createElement("article");

        card.classList.add("animal");


        card.innerHTML = `

            <img src="${animal.imagem}" alt="${animal.nome}">

            <h3>${animal.nome}</h3>

            <p>Tipo: ${animal.tipo}</p>

            <p>Idade: ${animal.idade}</p>

            <p>Porte: ${animal.porte}</p>

            <p>Energia: ${animal.energia}</p>

            <p class="compatibilidade">

                Compatibilidade: ${animal.pontos} pontos

            </p>

            <button class="botao" type="button"
                onclick="escolherAnimal('${animal.nome}')">

                Tenho interesse em adotar

            </button>

        `;


        resultado.appendChild(card);

    });

}


/* =====================================
   PÁGINA DE ADOÇÃO
===================================== */

let dadosAnimal = document.getElementById("dadosAnimal");

let botaoConfirmar = document.getElementById("botaoConfirmar");

let mensagemAdocao = document.getElementById("mensagemAdocao");


if (dadosAnimal) {

    if (!verificarLogin()) {

        dadosAnimal.style.display = "none";

        if (botaoConfirmar) {

            botaoConfirmar.style.display = "none";

        }

    } else {

        let animal = JSON.parse(
            localStorage.getItem("animalEscolhido")
        );


        if (animal) {

            dadosAnimal.innerHTML = `

                <img src="${animal.imagem}" alt="${animal.nome}">

                <h3>${animal.nome}</h3>

                <p>Tipo: ${animal.tipo}</p>

                <p>Idade: ${animal.idade}</p>

                <p>Porte: ${animal.porte}</p>

                <p>Energia: ${animal.energia}</p>

            `;

        } else {

            dadosAnimal.innerHTML = `
                <p>Nenhum animal foi selecionado.</p>
                <a href="animais.html" class="botao">
                    Escolher animal
                </a>
            `;

            if (botaoConfirmar) {

                botaoConfirmar.style.display = "none";

            }

        }

    }

}


/* =====================================
   CONFIRMAR INTERESSE
===================================== */

if (botaoConfirmar) {

    botaoConfirmar.addEventListener("click", function() {

        if (!verificarLogin()) {

            return;

        }


        let animal = JSON.parse(
            localStorage.getItem("animalEscolhido")
        );


        let email = localStorage.getItem("usuarioLogado");


        if (!animal) {

            alert("Nenhum animal foi selecionado!");

            window.location.href = "animais.html";

            return;

        }


        let interesses = JSON.parse(
            localStorage.getItem("interesses")
        ) || [];


        let jaExiste = interesses.find(function(item) {

            return item.email === email &&
                   item.animal === animal.nome;

        });


        if (jaExiste) {

            mensagemAdocao.textContent =
                "Você já demonstrou interesse neste animal!";

            return;

        }


        let novoInteresse = {

            email: email,

            animal: animal.nome,

            data: new Date().toLocaleDateString("pt-BR")

        };


        interesses.push(novoInteresse);


        localStorage.setItem(
            "interesses",
            JSON.stringify(interesses)
        );


        mensagemAdocao.textContent =
            "Interesse registrado com sucesso! Obrigado por considerar a adoção de " +
            animal.nome + "!";


        botaoConfirmar.disabled = true;

        botaoConfirmar.textContent = "Interesse confirmado";

    });

}


/* =====================================
   SAIR DA CONTA
===================================== */

function sair() {

    localStorage.removeItem("usuarioLogado");

    alert("Você saiu da sua conta!");

    window.location.href = "index.html";

}
