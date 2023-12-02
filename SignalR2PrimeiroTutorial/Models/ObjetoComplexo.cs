namespace SignalR2PrimeiroTutorial.Models
{
    public class ObjetoComplexo
    {
        public int Id { get; set; } 
        public string Nome { get; set; }    

        public Hero? Heroi { get; set; }

        public class Hero
        {
            public int Id { get; set; } 
            public string Poder { get; set; }   
        }
    }
}
