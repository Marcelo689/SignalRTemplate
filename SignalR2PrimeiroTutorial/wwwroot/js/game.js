"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/gamehub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ServerSide", function (id, nome, mensagem) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${id} - ${nome} says ${mensagem}`;
});

connection.on("ServerObjetoComplexo", function (objeto) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${objeto.Id} - ${objeto.Nome} com o heroi  ${objeto.Heroi.Id}${objeto.Heroi}`;
})

connection.on("ServerObjetoAindaMaisComplexo", function (objeto) {

    var id = objeto.id;
    var herois = objeto.Herois;
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${id} -  Herois `;
    
    for (var heroi in herois) {
        var li = document.createElement("li");
        document.getElementById("messagesList").appendChild(li);
        li.textContent = ` id =${heroi.Id} ${heroi.Poder}`;
    }

})

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var userId = Number(document.getElementById("userId").value);
    var nome = document.getElementById("userInput").value;
    var mensagem = document.getElementById("messageInput").value;
    connection.invoke("MandarMensagemAsync", userId, nome, mensagem ).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendObjetoSimples").addEventListener("click", function () {
    var userId = Number(document.getElementById("userId").value);
    var nome = document.getElementById("userInput").value;
    var mensagem = document.getElementById("messageInput").value;


    connection.invoke("MandarObjeto", {
        Id: userId,
        nome: nome,
        mensagem: mensagem
    }).catch(function (err) {
        return console.error(err);
    });
    event.preventDefault();
});

document.getElementById("sendObjetoComplexo").addEventListener("click", function () {
    var userId = Number(document.getElementById("userId").value);
    var nome = document.getElementById("userInput").value;
    var mensagem = document.getElementById("messageInput").value;

    var objeto = {
        Id: userId,
        Nome: nome,
        Heroi: {
            Id: userId,
            Poder : "SuperMan",
        }
    }
    connection.invoke("MandarObjetoComplexo", objeto).catch(function (err) {
        return console.error(err);
    });
    event.preventDefault();
});

document.getElementById("sendObjetoAindaMaisComplexo").addEventListener("click", function () {
    var userId = Number(document.getElementById("userId").value);
    var nome = document.getElementById("userInput").value;
    var mensagem = document.getElementById("messageInput").value;

    var objeto = {
        Id: userId,
        Nome: nome,
        Herois: [{
            Id: userId,
            Poder: "SuperMan",
        }]
    }
    connection.invoke("MandarObjetoAindaMaisComplexo", objeto).catch(function (err) {
        return console.error(err);
    });
    event.preventDefault();
});

