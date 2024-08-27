package biblioteca;

public abstract class UserFactory {
    public static Usuario criarUsuario(String cpf, String nome, Credenciais credenciais) {
        throw new UnsupportedOperationException("Método criarUsuario deve ser implementado pelas subclasses");
    }
}
