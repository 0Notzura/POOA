package biblioteca;

public class BibliotecarioFactory extends UserFactory {
    public static Bibliotecario criarUsuario(String cpf, String nome, Credenciais credenciais) {
        return new Bibliotecario(cpf, nome, credenciais);
    }
}
