// Importando as classes necessárias do seu módulo POOA.js
const {
    ClienteFactory,
    Acervo,
    BuscaPorTitulo,
    BuscaPorAutor,
    BuscaPorGenero,
    BuscaPorAnoPublicacao,
    Credenciais,
    TipoLivro,
    Livro,
    BibliotecarioFactory
} = require('./POOA.js');

let acervo = Acervo.getInstance();

bibliotecario1 = BibliotecarioFactory.criarUsuario('12345678901', 'Maria Oliveira', new Credenciais('maria.oliveira', 'senha456'))

let tipoLivro1 = new TipoLivro('Harry Potter e a Pedra Filosofal', 'J.K. Rowling','Fantasia', 1997);
let livro1 = new Livro();
tipoLivro1.adicionar(livro1);
acervo.adicionarLivro(bibliotecario1, tipoLivro1, livro1);

let tipoLivro2 = new TipoLivro('O hobbit', 'J. R. R. Tolkien','Fantasia', 1937);
let livro2 = new Livro();
tipoLivro2.adicionar(livro2);
acervo.adicionarLivro(bibliotecario1, tipoLivro2, livro2);

// Criando uma instância de cliente utilizando a factory
let cliente1 = ClienteFactory.criarUsuario('12345678900', 'João da Silva', new Credenciais('joao.silva', 'senha123'));

// Criando uma instância de acervo (supondo que já existe)

// Realizando buscas por diferentes critérios
console.log('Buscando por título "Harry Potter e a Pedra Filosofal":');
let livrosPorTitulo = cliente1.encontrarLivroPorCaracteristica('Harry Potter e a Pedra Filosofal', new BuscaPorTitulo());
console.log(livrosPorTitulo);

console.log('Buscando por autor "J.K. Rowling":');
let livrosPorAutor = cliente1.encontrarLivroPorCaracteristica('J.K. Rowling', new BuscaPorAutor());
console.log(livrosPorAutor);

console.log('Buscando por gênero "Fantasia":');
let livrosPorGenero = cliente1.encontrarLivroPorCaracteristica('Fantasia', new BuscaPorGenero());
console.log(livrosPorGenero);

console.log('Buscando por ano de publicação "1997":');
let livrosPorAno = cliente1.encontrarLivroPorCaracteristica(1997, new BuscaPorAnoPublicacao());
console.log(livrosPorAno);
