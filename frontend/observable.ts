export class Observable {
    private observadores: Array<{ atualizar: (mensagem: string) => void }> = [];

    adicionarObservador(observador: { atualizar: (mensagem: string) => void }) {
        this.observadores.push(observador);
    }

    notificarObservadores(mensagem: string) {
        for (const observador of this.observadores) {
            observador.atualizar(mensagem);
        }
    }
}
