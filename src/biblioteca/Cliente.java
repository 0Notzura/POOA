package biblioteca;


import java.util.ArrayList;
import java.util.List;

public class Cliente extends Usuario {
    private List<Emprestimo> historicoEmprestimos = new ArrayList<>();

    public Cliente(String cpf, String nome, Credenciais credenciais) {
        super(cpf, nome, credenciais);
    }

    public List<Emprestimo> getHistoricoEmprestimos() {
        return historicoEmprestimos;
    }

    public void alugarLivro(Livro livro, Acervo acervo) {
        Emprestimo emprestimo = acervo.alugarLivro(this, livro.getId());
        if (emprestimo != null) {
            historicoEmprestimos.add(emprestimo);
            System.out.println("Livro " + livro.getId() + " foi alugado pelo cliente " + this.getNome());
        } else {
            System.out.println("O livro não pôde ser alugado.");
        }
    }

    public void devolverLivro(int idLivro, Acervo acervo) {
        acervo.devolverLivro(this, idLivro);
        System.out.println("Livro " + idLivro + " foi devolvido pelo cliente " + this.getNome());
    }

    public List<Emprestimo> visualizarLivrosAlugados() {
        return historicoEmprestimos;
    }

    public void verificarStatus() {
        // Implementar lógica para verificar o status do cliente
        System.out.println("Status do cliente " + this.getNome() + " verificado.");
    }
}
