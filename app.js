// Importando as configurações do servidor
var app = require('./config/server.js');

var server = app.listen(80, function() {
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

app.set('io', io);

// Criando a conexão por websocket
io.on('connection', function(socket) {
    console.log('Usuário conectou');

    socket.on('disconnect', function() {
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function(data) {

        // Mensagens
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            // Participantes
            socket.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );

            socket.broadcast.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
        }
        
    });
});