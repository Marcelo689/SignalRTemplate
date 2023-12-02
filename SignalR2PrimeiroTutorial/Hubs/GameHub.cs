using Microsoft.AspNetCore.SignalR;
using SignalR2PrimeiroTutorial.Models;

namespace SignalR2PrimeiroTutorial.Hubs
{
    public class GameHub : Hub
    {
        public async Task MandarMensagemAsync(int id, string nome, string mensagem)
        {
            await Clients.All.SendAsync("ServerSide", id, nome, mensagem);
        }

        public async Task MandarObjeto(ObjetoSimples objeto)
        {
            await Clients.All.SendAsync("ServerSide", objeto.id, objeto.nome, objeto.mensagem);
        }
        public async Task MandarObjetoComplexo(ObjetoComplexo objeto)
        {
            await Clients.All.SendAsync("ServerObjetoComplexo", objeto);
        }

        public async Task MandarObjetoAindaMaisComplexo(ObjetoAindaMaisComplexo objeto)
        {
            await Clients.All.SendAsync("ServerObjetoAindaMaisComplexo", objeto);
        }
    }
}
