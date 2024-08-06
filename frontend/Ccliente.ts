import { Usuario } from './usuario';
import { Acervo } from './acervo';
import { Emprestimo } from './emprestimo';
import { BuscaStrategy } from './busca-strategy';

export class Cliente extends Usuario {
    historicoEmprestimos: Emprestimo[] = [];

    async alugarLivro(livroid: number): Promise<Emprestimo | null> {
        try {
            const emprestimo = await Acervo.getInstance().alugarLivro(this, livroid);
            if (emprestimo) {
                this.historicoEmprestimos.push(emprestimo);
            }
            console.log(emprestimo);
            return emprestimo;
        } catch (error) {
            console.error('Erro ao alugar livro:', error);
            return null;
        }
    }

    async devolverLivro(id: number): Promise<void> {
        try {
            await Acervo.getInstance().devolverLivro(this, id);
        } catch (error) {
            console.error('Erro ao devolver livro:', error);
        }
    }

    async encontrarLivroPorCaracteristica(criterio: any, strategy: BuscaStrategy): Promise<any[]> {
      try {
          const livros = await Acervo.getInstance().visualizarLivros();
          return strategy.buscar(livros, criterio);
      } catch (error) {
          console.error('Erro ao encontrar livro por característica:', error);
          return [];
      }
  }
  

    visualizarLivrosAlugados(): Emprestimo[] {
        return this.historicoEmprestimos;
    }

    verificarStatus() {
        // Implementar lógica para verificar o status do cliente
    }
}
