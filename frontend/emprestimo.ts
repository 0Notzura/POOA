import { Livro } from './livro';

export class Emprestimo {
    cpf: string;
    dataEmprestimo: Date;
    dataDevolucao: Date | null;
    livro: Livro;

    constructor(cpf: string, dataEmprestimo: Date, dataDevolucao: Date | null, livro: Livro) {
        this.cpf = cpf;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.livro = livro;
    }
}
