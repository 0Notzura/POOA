package biblioteca;

import java.util.ArrayList;
import java.util.List;

public class Observable {
    private List<Observador> observadores = new ArrayList<>();

    public void adicionarObservador(Observador observador) {
        observadores.add(observador);
    }

    public void removerObservador(Observador observador){

    }

    public void notificarObservadores(Livro livro, Acervo acervo) {
        for (Observador observador : observadores) {
            observador.atualizar(livro, acervo);
        }
    }

    public Observador getPrimeirodaFila(){
        return this.observadores.get(0);
    }
}

interface Observador {
    void atualizar(Livro livro, Acervo acervo);
}
