package biblioteca;

public class ClienteFactory extends UserFactory {
    public static Cliente criarUsuario(String cpf, String nome, Credenciais credenciais) {
        return new Cliente(cpf,nome, credenciais);
    }
}
