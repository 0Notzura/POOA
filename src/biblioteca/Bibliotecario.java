package biblioteca;

public class Bibliotecario extends Usuario {
    public Bibliotecario(String cpf, String nome, Credenciais credenciais) {
        super(cpf, nome, credenciais);
    }

    public Cliente cadastrarUsuario(String cpf, String nome, Credenciais credenciais) {
        return ClienteFactory.criarUsuario(cpf, nome, credenciais);
    }
}
