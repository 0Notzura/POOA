export class Livro {
    static contadorId = 0;
    id: number;
    disponível: boolean = true;

    constructor() {
        this.id = ++Livro.contadorId;
    }
}
