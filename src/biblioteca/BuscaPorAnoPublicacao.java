package biblioteca;

import java.util.List;
import java.util.stream.Collectors;

public class BuscaPorAnoPublicacao extends BuscaStrategy {
    @Override
    public List<TipoLivro> buscar(List<TipoLivro> tipoLivros, String anoPublicacao) {
        return tipoLivros.stream()
                .filter(tipoLivro -> Integer.toString(tipoLivro.getAnoPublicacao()).equals(anoPublicacao))
                .collect(Collectors.toList());
    }
}

