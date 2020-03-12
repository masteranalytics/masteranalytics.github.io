function geraTabela(){
    let variavel = document.getElementById("variavel").value;
    let elementos = document.getElementById("elementos").value.split(",");
    let elExclusivos = [...new Set(elementos)];
    let ocorrencias = elementos.reduce(function(obj, item) {
        obj[item] = (obj[item] || 0) + 1;
        return obj;
    }, {});
    for(let elemento in elExclusivos){
        document.write(elExclusivos[elemento] + " - " + ocorrencias[elExclusivos[elemento]] + "<br>")
    }
}