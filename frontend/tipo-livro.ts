import { Livro } from './livro';

export class TipoLivro {
    titulo: string;
    autor: string;
    genero: string;
    anoPublicacao: number;
    livros: Livro[] = [];

    constructor(titulo: string, autor: string, genero: string, anoPublicacao: number) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.anoPublicacao = anoPublicacao;
    }

    adicionar(livro: Livro) {
        this.livros.push(livro);
    }

    removerPorId(idLivro: number): Livro | null {
        let livroRemovido: Livro | null = null;
        this.livros = this.livros.filter(livro => {
            if (livro.id === idLivro) {
                livroRemovido = livro;
                return false;
            }
            return true;
        });
        return livroRemovido;
    }

    visualizar(): Livro[] {
        return this.livros;
    }
}
