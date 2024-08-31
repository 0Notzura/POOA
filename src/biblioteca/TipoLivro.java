package biblioteca;

import java.util.ArrayList;
import java.util.List;

public class TipoLivro  {
    private String titulo;
    private String autor;
    private String genero;
    private int anoPublicacao;
    private List<Livro> livros = new ArrayList<>();
    private List<Espera> reservas = new ArrayList<>();

    public TipoLivro(String titulo, String autor, String genero, int anoPublicacao) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.anoPublicacao = anoPublicacao;
    }

    public void adicionar(Livro livro) {
        livros.add(livro);
        
    }

    public Livro removerPorId(int idLivro) {
        Livro livroRemovido = null;
        for (Livro livro : livros) {
            if (livro.getId() == idLivro) {
                livros.remove(livro);
                livroRemovido = livro;
                break;
            }
        }
       
        return livroRemovido;
    }

    public void adicionarReserva(Espera reserva){
        reservas.add(reserva);
    }


    public void removerReserva(Espera reserva){
        reservas.remove(reserva);
    }

    public Espera removerProximo(){
        return reservas.remove(0);
    }

    public void notificarDevolucao(Livro livro, Acervo acervo){
        for (Espera espera: reservas){
            espera.atualizar(livro, acervo);
        }
        Espera saida =this.removerProximo();

    }

    public List<Livro> visualizar() {
        return livros;
    }

    public Espera fazerReserva(Cliente cliente){
        Espera espera = null;
        if(this.esgotado()){
            espera = new Espera(cliente, this.tamanhofila()+1);
            
            adicionarReserva(espera);
        }else{
            System.out.println("existem versões disponiveis para emprestimo, reserva não efetuada");
        }
        return espera;
    }

    public boolean esgotado(){
        for(Livro livro : livros){
            if(livro.isDisponivel()){
                return false;
            }
        }
        return true;
    }

    public boolean semreserva(){
        return reservas == null || reservas.size() == 0;
    }

    public List<Espera> reservas(){
        return reservas;
    }

    public int tamanhofila(){
        if (this.semreserva()){
            return 0;
        }else{
            return this.reservas().size();
        }
    }



    public Espera getProximo(){
        return reservas.get(0);
    }


    public String getTitulo() {
        return titulo;
    }

    public String getAutor() {
        return autor;
    }

    public String getGenero() {
        return genero;
    }

    public int getAnoPublicacao() {
        return anoPublicacao;
    }


}
