package biblioteca;


public class Main {
    public static void main(String[] args) {
        // Criação dos objetos necessários
        Acervo acervo = Acervo.getInstance();
        Bibliotecario bibliotecario = new Bibliotecario("123456789", "João", new Credenciais("joao", "senha123"));
        Cliente cliente = new Cliente("987654321", "Maria", new Credenciais("maria", "senha456"));
        Cliente cliente2 = new Cliente("35225361854", "guilherme", new Credenciais("user", "senha"));

        // Criação e adição de livros ao acervo
        TipoLivro tipoLivro = new TipoLivro("Título Exemplo", "Autor Exemplo", "Gênero Exemplo", 2024);
        Livro livro = new Livro();
        acervo.adicionarLivro(bibliotecario, tipoLivro, livro);

        cliente2.fazerReserva(tipoLivro);
        // Cliente tenta alugar um livro
        acervo.alugarLivro(cliente, livro.getId());

        // Visualiza os livros alugados pelo cliente
        System.out.println("Livros alugados pelo cliente:");
        for (Emprestimo emprestimo : cliente.visualizarLivrosAlugados()) {
            System.out.println("Livro ID: " + emprestimo.getLivro().getId() + ", Data do Empréstimo: " + emprestimo.getDataEmprestimo());
        }
        cliente2.fazerReserva(tipoLivro);

        // Cliente tenta devolver livro
        acervo.devolverLivro(cliente, livro.getId());
        acervo.visualizarSeparacoes().get(0).efetivar(acervo);
        System.out.println("Livros alugados pelo cliente2:");
        for (Emprestimo emprestimo : cliente2.visualizarLivrosAlugados()) {
            System.out.println("Livro ID: " + emprestimo.getLivro().getId() + ", Data do Empréstimo: " + emprestimo.getDataEmprestimo());
        }
    }
}
