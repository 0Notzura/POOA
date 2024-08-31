package biblioteca;

public class Espera  {

    private Cliente cliente;
    private int lugar;
    

    public Espera(Cliente cliente, int lugar){
        this.cliente = cliente;
        this.lugar = lugar;
    }


    public void diminuir(){
        lugar = this.lugar-1;
    }

    public void separar(Livro livro, Acervo acervo){
        acervo.separarLivro(new Separado(cliente, livro));

    }

    public Cliente getCliente(){
        return this.cliente;
    }

    public int getLugar(){
        return this.lugar;
    }



 
    public void atualizar(Livro livro, Acervo acervo) {

        
        this.diminuir();
        
        
        if(lugar==0){
            this.separar(livro, acervo);
            
        }
    }
}