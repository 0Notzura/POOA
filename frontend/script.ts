import { Acervo } from './acervo';
import { TipoLivro } from './tipo-livro';

// Função para recuperar e exibir tipos de livros
async function recuperarETiposLivros() {
    const acervo = Acervo.getInstance();

    try {
        // Recuperar tipos de livros do acervo
        const tiposLivros = await acervo.visualizarLivros();
        
        // Exibir tipos de livros
        if (tiposLivros.length > 0) {
            console.log('Tipos de Livros disponíveis:');
            tiposLivros.forEach(tipo => {
                console.log(`Título: ${tipo.titulo}`);
                console.log(`Autor: ${tipo.autor}`);
                console.log(`Gênero: ${tipo.genero}`);
                console.log(`Ano de Publicação: ${tipo.anoPublicacao}`);
                console.log(`Livros Disponíveis:`);
                tipo.livros.forEach(livro => {
                    console.log(`  ID: ${livro.id}, Disponível: ${livro.disponível}`);
                });
                console.log('--------------------');
            });
        } else {
            console.log('Nenhum tipo de livro disponível no acervo.');
        }
    } catch (error) {
        console.error('Erro ao recuperar tipos de livros:', error);
    }
}

// Executar o caso de uso
recuperarETiposLivros().catch(error => {
    console.error('Erro ao executar o caso de uso:', error);
});
