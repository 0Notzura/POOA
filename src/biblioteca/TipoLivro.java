package biblioteca;

import java.util.ArrayList;
import java.util.List;

public class TipoLivro extends Observable {
    private String titulo;
    private String autor;
    private String genero;
    private int anoPublicacao;
    private List<Livro> livros = new ArrayList<>();

    public TipoLivro(String titulo, String autor, String genero, int anoPublicacao) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.anoPublicacao = anoPublicacao;
    }

    public void adicionar(Livro livro) {
        livros.add(livro);
        if (livros.size() == 1) {
            notificarObservadores("O livro '" + this.titulo + "' foi adicionado. Agora há livros disponíveis.");
        }
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
        if (livros.size() == 0) {
            notificarObservadores("O livro '" + this.titulo + "' foi removido. Não há mais livros disponíveis.");
        }
        return livroRemovido;
    }

    public List<Livro> visualizar() {
        return livros;
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
