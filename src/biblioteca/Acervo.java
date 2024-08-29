package biblioteca;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Acervo {
    private static Acervo instance = null;
    private List<TipoLivro> tipoLivros;
    private List<Separado> separados;

    private Acervo() {
        this.tipoLivros = new ArrayList<>();
    }

    public static Acervo getInstance() {
        if (instance == null) {
            instance = new Acervo();
        }
        return instance;
    }

    private boolean isBibliotecario(Usuario usuario) {
        return usuario instanceof Bibliotecario;
    }

    public void adicionarLivro(Bibliotecario bibliotecario, TipoLivro tipoLivro, Livro livro) {
        if (isBibliotecario(bibliotecario)) {
            tipoLivro.adicionar(livro);
            if (!tipoLivros.contains(tipoLivro)) {
                tipoLivros.add(tipoLivro); // Adiciona o TipoLivro ao acervo se ainda não estiver lá
            }
            System.out.println("Livro adicionado ao acervo.");
        } else {
            throw new IllegalArgumentException("Operação permitida apenas para bibliotecários.");
        }
    }

    public void removerLivro(Bibliotecario bibliotecario, int idLivro) {
        if (isBibliotecario(bibliotecario)) {
            for (TipoLivro tipoLivro : tipoLivros) {
                Livro livroRemovido = tipoLivro.removerPorId(idLivro);
                if (livroRemovido != null) {
                    System.out.println("Livro removido do acervo.");
                    return;
                }
            }
        } else {
            throw new IllegalArgumentException("Operação permitida apenas para bibliotecários.");
        }
    }

    public Emprestimo alugarLivro(Cliente cliente, int idLivro) {
        for (TipoLivro tipoLivro : tipoLivros) {
            for (Livro livro : tipoLivro.visualizar()) {
                if (livro.getId() == idLivro && livro.isDisponivel()) {
                    livro.setDisponivel(false);
                    Emprestimo emprestimo = new Emprestimo(cliente.getCpf(), new Date(), null, livro);
                    cliente.getHistoricoEmprestimos().add(emprestimo);
                    System.out.println("Livro " + idLivro + " foi alugado.");
                    return emprestimo;
                }
            }
        }
        System.out.println("Livro " + idLivro + " não está disponível.");
        return null;
    }

    public void devolverLivro(Cliente cliente, int idLivro) {
        for (Emprestimo emprestimo : cliente.getHistoricoEmprestimos()) {
            if (emprestimo.getLivro().getId() == idLivro) {
                
                emprestimo.setDataDevolucao(new Date());
                System.out.print("Livro " + idLivro + " foi devolvido,");
                for (TipoLivro tipoLivro : tipoLivros) {
                    for (Livro livro : tipoLivro.visualizar()) {
                        if (livro.getId() == idLivro){
                            if(tipoLivro.semreserva()){
                                emprestimo.getLivro().setDisponivel(true);
                                System.out.println("e está disponível.");
                            }else{
                                tipoLivro.notificarDevolucao(livro, instance);
                                System.out.println(" e ficará reservado.");
                                
                                
                            }

                        }

                    }

                }
                
                
                return;
            }
        }
    }

    public void cancelarSeparacao(Separado separacao){
        separados.remove(separacao);     
        System.out.println("o livro"+ separacao.getLivro().getId() +"não está mais separado para" + separacao.getCliente().getNome());  
    }

    public void separarLivro(Separado separacao){
        separados.add(separacao);
        System.out.println("o livro"+ separacao.getLivro().getId() +"não está mais separado para" + separacao.getCliente().getNome());
    }

    public List<TipoLivro> visualizarLivros() {
        return this.tipoLivros;
    }
}
