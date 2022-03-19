var socket = io();

function postarMensagem(dados){
    var nome = dados.nome;
    var texto = dados.mensagem;
    if(nome.length && texto.length){
        var usuario = document.createTextNode(nome + ': ');
        var mensagem = document.createTextNode(texto);
        var postagem = document.createElement("span");
        var paragrafo = document.createElement("p");
        postagem.appendChild(mensagem);
        paragrafo.appendChild(usuario);
        paragrafo.appendChild(postagem);
        document.getElementById("chat-mensagens").appendChild(paragrafo);
        document.getElementById("mensagem").value = "";
    }
}

function enviarMensagem(){
    var socket = io();
    var nome = document.getElementById("nome").value;
    var mensagem = document.getElementById("mensagem").value;
    var dados = {
        nome: nome,
        mensagem: mensagem,
    };
    socket.emit('mensagens', dados);
    return false;
}
