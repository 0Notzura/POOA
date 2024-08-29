package biblioteca;

import java.util.Date;

public class Separado {

    private Cliente cliente;
    private Livro livro;
    private Date dataSeparacao;
    private static long prazo = 7;//indica quandos dias o livro fica separado esperando o reservista

    public Separado(Cliente cliente, Livro livro){
        this.cliente = cliente;
        this.livro = livro;
        this.dataSeparacao = new Date();


    }

    public void efetivar(Acervo acervo){
        cliente.alugarLivro(livro, acervo);
        this.cancelar(acervo);
    }

    public void verificar(Acervo acervo){
        long comparacao = new Date().getTime();
        if(comparacao - dataSeparacao.getTime()> prazo*8640000){
            livro.setDisponivel(true);
            this.cancelar(acervo);
        }

    }

    public void cancelar(Acervo acervo){
        acervo.cancelarSeparacao(this);

    }

    public Cliente getCliente(){
        return this.cliente;
    }

    public Livro getLivro(){
        return this.livro;
    }

    public Date getDateSeparacao(){
        return this.dataSeparacao;
    }






   
}
