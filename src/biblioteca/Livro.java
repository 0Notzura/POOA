package biblioteca;

public class Livro {
    private static int contadorId = 0;
    private int id;
    private boolean disponivel = true;

    public Livro() {
        this.id = ++contadorId;
    }

    public int getId() {
        return id;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }
}
