package biblioteca;

import java.util.List;
import java.util.stream.Collectors;

public class BuscaPorAutor extends BuscaStrategy {
    @Override
    public List<TipoLivro> buscar(List<TipoLivro> tipoLivros, String autor) {
        return tipoLivros.stream()
                .filter(tipoLivro -> tipoLivro.getAutor().equalsIgnoreCase(autor))
                .collect(Collectors.toList());
    }
}
