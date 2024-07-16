// Importando as classes necessárias do seu módulo POOA.js
const {
    Acervo,
    Credenciais,
    TipoLivro,
    Livro,
    BibliotecarioFactory,
} = require('./POOA.js');


// Criando uma instância de cliente utilizando a factory
let bibliotecario1 =BibliotecarioFactory.criarUsuario('12345678901', 'Maria Oliveira', new Credenciais('maria.oliveira', 'senha456'))

// Criando uma instância de acervo (supondo que já existe)
let acervo = Acervo.getInstance();
let tipoLivro1 = new TipoLivro('Harry Potter e a Pedra Filosofal', 'J.K. Rowling','Fantasia', 1997);
let livro1 = new Livro();
tipoLivro1.adicionar(livro1);
acervo.adicionarLivro(bibliotecario1, tipoLivro1, livro1);

let tipoLivro2 = new TipoLivro('O hobbit', 'J. R. R. Tolkien','Fantasia', 1937);
let livro2 = new Livro();
tipoLivro2.adicionar(livro2);
acervo.adicionarLivro(bibliotecario1, tipoLivro2, livro2);

// Definindo o ID do livro a ser excluído
let idLivroParaExcluir = 1; // Supondo que o ID do livro a ser excluído seja 1

// Exibindo livros antes da exclusão
console.log('Livros antes da exclusão:');
console.log(acervo.visualizarLivros());

// Buscando o livro a ser excluído pelo ID
let livroParaExcluir = null;
for (let tipoLivro of acervo.tipoLivros) {
    livroParaExcluir = tipoLivro.livros.find(livro => livro.id === idLivroParaExcluir);
    if (livroParaExcluir) break;
}

// Verificando se o livro foi encontrado
if (livroParaExcluir) {
    // Excluindo o livro
    acervo.removerLivro(BibliotecarioFactory.criarUsuario('12345678901', 'Maria Oliveira'), idLivroParaExcluir);
    console.log(`Livro com ID ${idLivroParaExcluir} excluído com sucesso.`);
} else {
    console.log(`Livro com ID ${idLivroParaExcluir} não encontrado.`);
}

// Exibindo livros após a exclusão
console.log('Livros após a exclusão:');
console.log(acervo.visualizarLivros());
