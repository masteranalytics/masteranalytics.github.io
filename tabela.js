function geraTabela(){
    let variavel = document.getElementById("variavel").value;
    let elementos = document.getElementById("elementos").value.split(";");
    let elExclusivos = [...new Set(elementos)];
    let ocorrencias = elementos.reduce(function(obj, item) {
        obj[item] = (obj[item] || 0) + 1;
        return obj;
    }, {});
    let div = document.getElementById("divtabela");
    let tabela = document.createElement("table");
    let cabecalho = document.createElement("thead");
    let corpo = document.createElement("tbody");
    let linha = document.createElement("tr")
    let celula1 = document.createElement("td");
    let celula2 = document.createElement("td");
    let celula3 = document.createElement("td");
    let celula4 = document.createElement("td");
    let celula5 = document.createElement("td");
    let fac = 0;
    let facp = 0;

    div.innerHTML = "";
    celula1.appendChild(document.createTextNode(variavel));
    linha.appendChild(celula1);
    celula2.appendChild(document.createTextNode("Frequência simples"));
    linha.appendChild(celula2);
    celula3.appendChild(document.createTextNode("Frequência simples percentual"));
    linha.appendChild(celula3);
    celula4.appendChild(document.createTextNode("Frequência acumulada"));
    linha.appendChild(celula4);
    celula5.appendChild(document.createTextNode("Frequência acumulada percentual"));
    linha.appendChild(celula5);
    linha.setAttribute("align","center");
    corpo.appendChild(linha);
    elExclusivos.sort();

    for(let elemento in elExclusivos){
        let linha = document.createElement("tr")    
        let celula1 = document.createElement("td");
        let celula2 = document.createElement("td");
        let celula3 = document.createElement("td");
        let celula4 = document.createElement("td");
        let celula5 = document.createElement("td");
        let fsp = parseFloat((ocorrencias[elExclusivos[elemento]] / elementos.length) * 100).toFixed(0);

        fac = parseInt(fac) + parseInt(ocorrencias[elExclusivos[elemento]]);
        facp = parseInt(facp) + parseInt(fsp);
        celula1.appendChild(document.createTextNode(elExclusivos[elemento]));
        linha.appendChild(celula1);
        celula2.appendChild(document.createTextNode(ocorrencias[elExclusivos[elemento]]));
        linha.appendChild(celula2);
        celula3.appendChild(document.createTextNode(fsp + "%"));
        linha.appendChild(celula3);
        celula4.appendChild(document.createTextNode(fac));
        linha.appendChild(celula4);
        celula5.appendChild(document.createTextNode(facp + "%"));
        linha.appendChild(celula5);
        linha.setAttribute("align","center");
        corpo.appendChild(linha);
    }
    cabecalho.appendChild(document.createTextNode("Tabela de " + variavel));
    cabecalho.setAttribute("align", "center");
    tabela.appendChild(cabecalho);
    tabela.appendChild(corpo);
    div.appendChild(tabela);
    tabela.setAttribute("border", "2");
    tabela.setAttribute("align", "center");
}