package biblioteca;

import java.util.List;

public abstract class BuscaStrategy {
    public abstract List<TipoLivro> buscar(List<TipoLivro> tipoLivros, String criterio);
}