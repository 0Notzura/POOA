package biblioteca;

import java.util.List;

public class AutenticacaoSimples extends AutenticacaoStrategy {
    @Override
    public Usuario autenticar(Credenciais credenciais, List<Usuario> usuarios) {
        for (Usuario usuario : usuarios) {
            if (usuario.getCredenciais().getUsuario().equals(credenciais.getUsuario()) &&
                    usuario.getCredenciais().getSenha().equals(credenciais.getSenha())) {
                return usuario;
            }
        }
        return null;
    }
}
