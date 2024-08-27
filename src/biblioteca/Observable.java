package biblioteca;

import java.util.ArrayList;
import java.util.List;

public class Observable {
    private List<Observador> observadores = new ArrayList<>();

    public void adicionarObservador(Observador observador) {
        observadores.add(observador);
    }

    public void notificarObservadores(String mensagem) {
        for (Observador observador : observadores) {
            observador.atualizar(mensagem);
        }
    }
}

interface Observador {
    void atualizar(String mensagem);
}
