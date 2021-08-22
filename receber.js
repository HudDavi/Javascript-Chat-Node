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

socket.on('mensagens', function(dados){
    postarMensagem(dados);
});