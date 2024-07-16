const {
    BibliotecarioFactory,
    Acervo,
    TipoLivro,
    Livro,
    Credenciais
} = require('./POOA.js');

let bibliotecário1= BibliotecarioFactory.criarUsuario('12345678901', 'Maria Oliveira', new Credenciais('maria.oliveira', 'senha456'))
let cliente1=bibliotecário1.cadastrarUsuario('12345678900', 'João da Silva', new Credenciais('joao.silva', 'senha123'))
// Criando uma instância de acervo (supondo que já existe)
let acervo = Acervo.getInstance();

// Definindo um tipo de livro e adicionando ao acervo
let tipoLivro1 = new TipoLivro('Harry Potter e a Pedra Filosofal', 'J.K. Rowling','Fantasia', 1997);
let livro1 = new Livro();
tipoLivro1.adicionar(livro1);
acervo.adicionarLivro(bibliotecário1, tipoLivro1, livro1);

// Simulação de empréstimo de um livro pelo cliente
console.log('Cliente alugando um livro...');
let emprestimo = cliente1.alugarLivro(livro1.id);
console.log('Livro alugado:', emprestimo);

// Simulação de devolução do livro pelo cliente
console.log('Cliente devolvendo o livro...');
cliente1.devolverLivro(livro1.id);

// Visualizando histórico de empréstimos do cliente após devolução
console.log('Histórico de empréstimos do cliente após devolução:');
console.log(cliente1.visualizarLivrosAlugados());
