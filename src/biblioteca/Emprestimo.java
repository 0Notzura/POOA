package biblioteca;

import java.util.Date;

public class Emprestimo {
    private String cpf;
    private Date dataEmprestimo;
    private Date dataDevolucao;
    private Livro livro;

    public Emprestimo(String cpf, Date dataEmprestimo, Date dataDevolucao, Livro livro) {
        this.cpf = cpf;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.livro = livro;
    }

    public String getCpf() {
        return cpf;
    }

    public Date getDataEmprestimo() {
        return dataEmprestimo;
    }

    public Date getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(Date dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public Livro getLivro() {
        return livro;
    }
}
