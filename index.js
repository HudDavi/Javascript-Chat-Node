const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const sqlite3 = require('sqlite3').verbose();

// Importação Dos Diretórios e Página de Chat
app.use(express.static(path.join(__dirname, '/')));
app.set('views', path.join(__dirname, '/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', (req,res) =>{
    res.render('index.html');
});

// Criação e Conexão do Banco de Dados
var db1 = new sqlite3.Database('./bancoDeDados.sqlite', (erro) => {
  if(erro){
    console.log(erro);
  }
  db1.run('create table if not exists chat (id integer not null primary key, nome varchar(50) not null, mensagem text not null)', (erro) => {
    if(erro){
      console.log(erro);
    }
  });
  db1.close();
});

// Conexão do Sistema de Chat e Recebimento Das Mensagens
io.on('connection', (socket) => {
  socket.on('mensagens', function(dados){
    io.emit('mensagens', dados);
    var db2 = new sqlite3.Database('./bancoDeDados.sqlite', (erro) => {
      if(erro){
        console.log(erro);
      }
      db2.run('insert into chat (nome, mensagem) values (?, ?)', [dados.nome, dados.mensagem], (erro) => {
        if(erro){
          console.log(erro);
        }
      });
      db2.close();
    });
  });
});

// Conexão do Sistema de Chat e Envio Das Mensagens
io.on('connection', (socket) => {
  var db3 = new sqlite3.Database('./bancoDeDados.sqlite', (erro) => {
    if(erro){
      console.log(erro);
    }
    db3.all('select nome, mensagem from chat', (erro, linhas) => {
      if(erro){
        console.log(erro, linhas);
      }
      for(var linha in linhas){
        socket.emit('mensagens', linhas[linha]);
      }
    });
    db3.close();
  });
});

server.listen(3000);