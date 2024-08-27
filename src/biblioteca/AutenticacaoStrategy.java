package biblioteca;

import java.util.List;

public abstract class AutenticacaoStrategy {
    public abstract Usuario autenticar(Credenciais credenciais, List<Usuario> usuarios);
}
