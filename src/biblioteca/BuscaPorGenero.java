package biblioteca;

import java.util.List;
import java.util.stream.Collectors;

public class BuscaPorGenero extends BuscaStrategy {
    @Override
    public List<TipoLivro> buscar(List<TipoLivro> tipoLivros, String genero) {
        return tipoLivros.stream()
                .filter(tipoLivro -> tipoLivro.getGenero().equalsIgnoreCase(genero))
                .collect(Collectors.toList());
    }
}
