package biblioteca;

public abstract class Usuario {
    protected String cpf;
    protected String nome;
    protected Credenciais credenciais;

    public Usuario(String cpf, String nome, Credenciais credenciais) {
        this.cpf = cpf;
        this.nome = nome;
        this.credenciais = credenciais;
    }

    public String getCpf() {
        return cpf;
    }

    public String getNome() {
        return nome;
    }

    public Credenciais getCredenciais() {
        return credenciais;
    }

}

    
