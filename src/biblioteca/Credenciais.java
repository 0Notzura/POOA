package biblioteca;

public class Credenciais {
    private String usuario;
    private String senha;

    public Credenciais(String usuario, String senha) {
        this.usuario = usuario;
        this.senha = senha;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getSenha() {
        return senha;
    }
}
