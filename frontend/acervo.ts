import axios from 'axios';
import { Observable } from './observable';
import { Cliente } from './Ccliente';
import { Bibliotecario } from './bibliotecario';
import { TipoLivro } from './tipo-livro';
import { Emprestimo } from './emprestimo';

export class Acervo extends Observable {
    private static instance: Acervo | null = null;
    private tipoLivros: TipoLivro[] = [];

    private constructor() {
        super();
    }

    static getInstance(): Acervo {
        if (!Acervo.instance) {
            Acervo.instance = new Acervo();
        }
        return Acervo.instance;
    }

    private _isBibliotecario(usuario: any): usuario is Bibliotecario {
        return usuario instanceof Bibliotecario;
    }

    async adicionarLivro(usuario: Bibliotecario, tipoLivro: TipoLivro, livro: any) {
        if (this._isBibliotecario(usuario)) {
            try {
                const response = await axios.post('http://localhost:3000/acervo/livro', {
                    usuario,
                    tipoLivro,
                    livro
                });
                this.notificarObservadores(response.data.mensagem);
            } catch (error: any) {
                console.error('Erro ao adicionar livro:', error.message);
            }
        } else {
            throw new Error("Operação permitida apenas para bibliotecários.");
        }
    }

    async removerLivro(usuario: Bibliotecario, idLivro: number) {
        if (this._isBibliotecario(usuario)) {
            try {
                const response = await axios.delete(`http://localhost:3000/acervo/livro/${idLivro}`);
                this.notificarObservadores(response.data.mensagem);
            } catch (error: any) {
                console.error('Erro ao remover livro:', error.message);
            }
        } else {
            throw new Error("Operação permitida apenas para bibliotecários.");
        }
    }

    async alugarLivro(cliente: Cliente, id: number) {
        if (cliente instanceof Cliente) {
            try {
                const response = await axios.post('http://localhost:3000/acervo/emprestimo', {
                    cpf: cliente.cpf,
                    livroId: id
                });
                const emprestimo = response.data.emprestimo;
                if (emprestimo) {
                    cliente.historicoEmprestimos.push(emprestimo);
                    this.notificarObservadores(`Livro ${emprestimo.livro.id} foi alugado`);
                } else {
                    console.log(`Livro ${id} não está disponível.`);
                }
                return emprestimo;
            } catch (error: any) {
                console.error('Erro ao alugar livro:', error.message);
            }
        }
    }

    async devolverLivro(cliente: Cliente, id: number) {
        if (cliente instanceof Cliente) {
            try {
                const response = await axios.post('http://localhost:3000/acervo/devolucao', {
                    cpf: cliente.cpf,
                    livroId: id
                });
                const mensagem = response.data.mensagem;
                if (mensagem.includes('devolvido')) {
                    const emprestimo = cliente.historicoEmprestimos.find(e => e.livro.id === id);
                    if (emprestimo) {
                        emprestimo.dataDevolucao = new Date();
                    }
                    this.notificarObservadores(mensagem);
                } else {
                    console.log(mensagem);
                }
            } catch (error: any) {
                console.error('Erro ao devolver livro:', error.message);
            }
        }
    }

    async visualizarLivros(): Promise<TipoLivro[]> {
        try {
            const response = await axios.get('http://localhost:3000/acervo');
            this.tipoLivros = response.data.tipoLivros || []; 
            return this.tipoLivros;
        } catch (error) {
            console.error('Erro ao carregar o acervo:');
            return [];  
        }
    }
    
}
