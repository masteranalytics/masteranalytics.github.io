const separatriz = document.getElementById("separatriz");
const valseparatriz = document.getElementById("valseparatriz");
const resSeparatriz = document.getElementById("resSeparatriz");
const valrange = document.getElementById("valrange");
let indexseparatriz = 0;
let variavel;
let elementos = [];
let elExclusivos = [];
let elContinua = [];
let qtdContinua = [];
let qtd = [];
let cor = [];
let ocorrencias = {};
let div = document.getElementById("divtabela");
let tabela = document.createElement("table");
let cabecalho = document.createElement("thead");
let corpo = document.createElement("tbody");
let fac = 0;
let facp = 0;
let soma = 0;
let qtdmoda = 0;
let moda = "";
let indexmediana = 0;
let mediana = "";
let tipovariavel = "";
let ctx = document.getElementsByClassName("grafico");

separatriz.disabled = true;
valseparatriz.disabled = true;
resSeparatriz.innerHTML = "";


//Função para organizar os vetores
function sortFunction(a, b) {
    return (a - b);
}

//Função para criar as linhas da tabela
function constroiLinhaTabela(...params) {
    let linha = document.createElement("tr")
    for (let valor in params) {
        let celula = document.createElement("td");
        celula.appendChild(document.createTextNode(params[valor]));
        linha.appendChild(celula);
    }
    linha.setAttribute("align", "center");
    corpo.appendChild(linha);
}

//Função para gerar a tabela
function geraTabela() {
    //Limpa os conteúdos das divs
    div.innerHTML = "";
    ctx.innerHTML = "";

    //Libera o uso das medidas separatrizes
    separatriz.disabled = false;

    //Pega o nome da variável
    variavel = document.getElementById("variavel").value;

    // Adiciona os elementos ao vetor
    for (let elemento of document.getElementById("elementos").value.split(";")) {
        elementos.push(elemento.trim());
        if (!isNaN(elemento)) {
            soma = soma + Number(elemento)
        }
    }

    indexmediana = elementos.length / 2;

    //Adiciona a um novo vetor somente os valores exclusivos
    elExclusivos = [...new Set(elementos)];

    //Faz a contagem das ocorrências de cada elemento
    ocorrencias = elementos.reduce(function (obj, item) {
        obj[item] = (obj[item] || 0) + 1;
        if (obj[item] > qtdmoda) {
            qtdmoda = obj[item];
            moda = item;
        }
        return obj;
    }, {});

    //Verifica qual o tipo da variável que está sendo analisada
    if (isNaN(elementos[1])) {
        tipovariavel = "Qualitativa"
    } else {
        if (elementos.length > 6 && ((elementos.length * 0.3) < elExclusivos.length)) {
            tipovariavel = "Quantitativa Continua"
        } else {
            tipovariavel = "Quantitativa Discreta"
        }
    }

    constroiLinhaTabela(variavel, "Frequência simples", "Frequência simples percentual", "Frequência acumulada", "Frequência acumulada percentual")

    //Organiza o vertor em orderm crescrente/alfabética
    elExclusivos.sort(sortFunction);

    if (tipovariavel == "Quantitativa Discreta" || tipovariavel == "Qualitativa") {
        for (let elemento in elExclusivos) {
            let fsp = parseFloat((ocorrencias[elExclusivos[elemento]] / elementos.length) * 100).toFixed(0);

            fac = parseInt(fac) + parseInt(ocorrencias[elExclusivos[elemento]]);
            facp = ((fac / elementos.length) * 100).toFixed(1);

            constroiLinhaTabela(elExclusivos[elemento], ocorrencias[elExclusivos[elemento]], fsp + "%", fac, facp + "%")
        }
    } else {
        elementos.sort(sortFunction);
        let at = elementos[elementos.length - 1] - elementos[0];
        let k = Math.sqrt(elementos.length).toFixed(0);
        let divisivel = false;
        let classes = 0;
        let intervalo = 0;
        let elInicial = 0;
        let elFinal = 0;

        while (divisivel == false) {
            at = at + 1;
            if (at % (k - 1) == 0) {
                classes = k - 1;
                divisivel = true;
            } else if (at % k == 0) {
                classes = k;
                divisivel = true;
            } else if (at % (k + 1) == 0) {
                classes = k + 1;
                divisivel = true;
            }
        }

        intervalo = at / classes;
        elInicial = Number(elementos[0]);

        qtdContinua.push(0)

        for (let i = 1; i <= classes; i++) {
            elFinal = Number(elInicial) + Number(intervalo);
            let qtdElementos = 0;

            for (let elemento in elementos) {
                if (elementos[elemento] >= elInicial && elementos[elemento] < elFinal) {
                    qtdElementos = qtdElementos + 1;
                }
            }

            let fsp = parseFloat((qtdElementos / elementos.length) * 100).toFixed(0);

            fac = parseInt(fac) + parseInt(qtdElementos);
            facp = ((fac / elementos.length) * 100).toFixed(1);

            constroiLinhaTabela(elInicial + " |---- " + elFinal, qtdElementos, fsp + "%", fac, facp + "%")

            elContinua.push(elInicial);
            qtdContinua.push(qtdElementos);
            elInicial = elFinal;
        }
        elContinua.push(elFinal);
    }

    cabecalho.appendChild(document.createTextNode("Tabela de " + variavel));
    cabecalho.setAttribute("align", "center");
    tabela.appendChild(cabecalho);
    tabela.appendChild(corpo);
    div.appendChild(tabela);
    tabela.setAttribute("border", "2");
    tabela.setAttribute("align", "center");

    if (elementos.length % 2 == 0 && tipovariavel == "Quantitativa Continua") {
        mediana = (Number(elementos[indexmediana - 1]) + Number(elementos[indexmediana])) / 2
    } else {
        mediana = elementos[indexmediana - 1]
    }

    div = document.getElementById("divmtc");
    tabela = document.createElement("table");
    corpo = document.createElement("tbody");
    linha = document.createElement("tr");
    celula1 = document.createElement("td");
    celula2 = document.createElement("td");
    celula3 = document.createElement("td");

    div.innerHTML = "";

    if (tipovariavel == "Qualitativa") {
        celula1.appendChild(document.createTextNode("Média: Não existe"));
        linha.appendChild(celula1);
    } else {
        celula1.appendChild(document.createTextNode("Média: " + (soma / elementos.length).toFixed(2)));
        linha.appendChild(celula1);
    }
    celula2.appendChild(document.createTextNode("Moda: " + moda));
    linha.appendChild(celula2);
    celula3.appendChild(document.createTextNode("Mediana: " + mediana));
    linha.appendChild(celula3);
    corpo.appendChild(linha);
    tabela.appendChild(corpo);
    div.appendChild(tabela);
    tabela.setAttribute("border", "2");
    tabela.setAttribute("align", "center");

    function corAleatoria() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    };

    if (tipovariavel == "Qualitativa") {
        for (let elemento in elExclusivos) {
            qtd.push(ocorrencias[elExclusivos[elemento]]);
            cor.push(corAleatoria());
        }

        let chartGraph = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: elExclusivos,
                datasets: [{
                    data: qtd,
                    backgroundColor: cor,
                    borderColor: 'rgba(200, 200, 200, 0.75)',
                    hoverBorderColor: 'rgba(200, 200, 200, 1)',
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                title: {
                    display: true,
                    text: variavel
                }
            }
        });
    } else if (tipovariavel == "Quantitativa Discreta") {
        for (let elemento in elExclusivos) {
            qtd.push(ocorrencias[elExclusivos[elemento]]);
            cor.push(corAleatoria());
        }

        let chartGraph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: elExclusivos,
                datasets: [{
                    data: qtd,
                    backgroundColor: cor,
                    borderColor: 'rgba(200, 200, 200, 0.75)',
                    hoverBorderColor: 'rgba(200, 200, 200, 1)',
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                title: {
                    display: true,
                    text: variavel
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    } else {
        for (let i = 0; i < elContinua.length - 1; i++) {
            cor.push(corAleatoria());
        }
        let desvio = (320 / elContinua.length);
        let chartGraph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: elContinua,
                datasets: [{
                    data: qtdContinua,
                    backgroundColor: cor,
                    borderColor: 'rgba(200, 200, 200, 0.75)',
                    hoverBorderColor: 'rgba(200, 200, 200, 1)',
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                title: {
                    display: true,
                    text: variavel
                },
                scales: {
                    xAxes: [{
                        barPercentage: 1.3,
                        ticks: {
                            labelOffset: desvio
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }


}

function alteraValorSeparatriz() {
    let selecionado = separatriz.selectedIndex;
    valseparatriz.value = 0;
    switch (selecionado) {
        case 0:
            valseparatriz.disabled = true;
            resSeparatriz.innerHTML = "";
            break;
        case 1:
            valseparatriz.disabled = false;
            valseparatriz.setAttribute("max", "4");
            indexseparatriz = elementos.length / 4;
            break;
        case 2:
            valseparatriz.disabled = false;
            valseparatriz.setAttribute("max", "5");
            indexseparatriz = elementos.length / 5;
            break;
        case 3:
            valseparatriz.disabled = false;
            valseparatriz.setAttribute("max", "10");
            indexseparatriz = elementos.length / 10;
            break;
        case 4:
            valseparatriz.disabled = false;
            valseparatriz.setAttribute("max", "100");
            indexseparatriz = elementos.length / 100;
            break;
        default:
            valseparatriz.disabled = true;
            alert('Selecione uma operação válida!');
            separatriz.focus();
    }
}

function alteraIndexSeparatriz() {
    if (valseparatriz.value != 0) {
        let indice = parseInt(indexseparatriz * valseparatriz.value) - 1;
        if(indice < 0){indice = 0};
        valrange.innerHTML = separatriz.options.item(separatriz.selectedIndex).text + " " + valseparatriz.value;
        resSeparatriz.innerHTML = elementos[indice];
    } else {
        valrange.innerHTML = separatriz.options.item(separatriz.selectedIndex).text + " " + valseparatriz.value;
        resSeparatriz.innerHTML = "";
    }
}