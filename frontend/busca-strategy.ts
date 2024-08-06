export abstract class BuscaStrategy {
  abstract buscar(livros: any[], criterio: any): any[];
}

export class BuscaPorTitulo extends BuscaStrategy {
  buscar(livros: any[], titulo: string) {
      return livros.filter(livro => livro.titulo === titulo);
  }
}

export class BuscaPorAutor extends BuscaStrategy {
  buscar(livros: any[], autor: string) {
      return livros.filter(livro => livro.autor === autor);
  }
}

export class BuscaPorGenero extends BuscaStrategy {
  buscar(livros: any[], genero: string) {
      return livros.filter(livro => livro.genero === genero);
  }
}

export class BuscaPorAnoPublicacao extends BuscaStrategy {
  buscar(livros: any[], anoPublicacao: number) {
      return livros.filter(livro => livro.anoPublicacao === anoPublicacao);
  }
}
