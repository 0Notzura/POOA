package biblioteca;

import java.util.List;
import java.util.stream.Collectors;

public class BuscaPorTitulo extends BuscaStrategy {
    @Override
    public List<TipoLivro> buscar(List<TipoLivro> tipoLivros, String titulo) {
        return tipoLivros.stream()
                .filter(tipoLivro -> tipoLivro.getTitulo().equalsIgnoreCase(titulo))
                .collect(Collectors.toList());
    }
}
