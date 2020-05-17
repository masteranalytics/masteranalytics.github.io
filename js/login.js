function login(){
    let usuario = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if(usuario != "admin@admin" || senha != "1234"){
        alert("Usuário ou senha incorreto!");
    }else{
        window.location.href = "/html/index.html";
    }
}
