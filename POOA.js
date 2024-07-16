// Observer para notificar mudanças no acervo
class Observable {
    constructor() {
      this.observadores = [];
    }
  
    adicionarObservador(observador) {
      this.observadores.push(observador);
    }
  
    notificarObservadores(mensagem) {
      for (const observador of this.observadores) {
        observador.atualizar(mensagem);
      }
    }
  }

// Singleton para o Acervo
class Acervo extends Observable {
    constructor() {
      super();
      if (Acervo.instance == null) {
        this.tipoLivros = [];
        Acervo.instance = this;
      }
      return Acervo.instance;
    }
  
    static getInstance() {
      if (!Acervo.instance) {
        Acervo.instance = new Acervo();
      }
      return Acervo.instance;
    }
    _isBibliotecario(usuario) {
        return usuario instanceof Bibliotecario;
    }

    // Métodos públicos que exigem autenticação de bibliotecário
    adicionarLivro(usuario, tipoLivro, livro) {
        if (this._isBibliotecario(usuario)) {
            let tipoExistente = this.tipoLivros.find(t =>
                t.titulo === tipoLivro.titulo &&
                t.autor === tipoLivro.autor &&
                t.genero === tipoLivro.genero &&
                t.anoPublicacao === tipoLivro.anoPublicacao
            );

            if (tipoExistente) {
                tipoExistente.adicionar(livro);
            } else {
                this.tipoLivros.push(tipoLivro);
            }

            this.notificarObservadores(`Livro ${livro.id} foi adicionado ao tipo ${tipoLivro.titulo}`);
        } else {
            throw new Error("Operação permitida apenas para bibliotecários.");
        }
    }

    removerLivro(usuario, idLivro) {
        if (this._isBibliotecario(usuario)) {
            let livroRemovido = null;
            for (let tipoLivro of this.tipoLivros) {
                livroRemovido = tipoLivro.removerPorId(idLivro);
                if (livroRemovido) break;
            }

            if (livroRemovido) {
                this.notificarObservadores(`Livro ${idLivro} foi removido`);
            } else {
                console.log(`Livro com ID ${idLivro} não encontrado.`);
            }
        } else {
            throw new Error("Operação permitida apenas para bibliotecários.");
        }
    }

  
    alugarLivro(cliente,id) {
        if(cliente instanceof Cliente){
            let livroAlugado = null;
            for (let tipoLivro of this.tipoLivros) {
                let livro = tipoLivro.livros.find(l => l.id === id && l.disponivel);
                if (livro) {
                    livro.disponivel = false;
                    let emprestimo = new Emprestimo(cliente.cpf, new Date(),'',livro);
                    this.notificarObservadores(`Livro ${livro.id} foi alugado`);
                    livroAlugado = emprestimo;
                    break;
                }
                else{
                    livroAlugado=`Livro ${livro.id} não esta disponivel`
                }
            }
            return livroAlugado;
        }
    }
  
    visualizarLivros() {
      return this.tipoLivros;
    }
  
    devolverLivro(cliente,id) {
        if(cliente instanceof Cliente){
            for (let tipoLivro of this.tipoLivros) {
                let livro = tipoLivro.livros.find(l => l.id === id );
                if (livro) {
                    livro.disponivel = true;
                    let emprestimo=cliente.historicoEmprestimos.find(e=>e.livro.id === id)
                    emprestimo.dataDevolucao=new Date()
                    this.notificarObservadores(`Livro ${livro.id} foi devolvido`);
                    break;
                }
                else{
                    console.log(`Livro com ID ${id} não encontrado.`);
                }
            }
        }
    }
  }
  //strategy pra busca de livro
  class BuscaStrategy {
    buscar(livros, criterio) {
      throw new Error('Este método deve ser sobrescrito');
    }
  }
  
  class BuscaPorTitulo extends BuscaStrategy {
    buscar(livros, titulo) {
      return livros.filter(livro => livro.titulo === titulo);
    }
  }
  
  class BuscaPorAutor extends BuscaStrategy {
    buscar(livros, autor) {
      return livros.filter(livro => livro.autor === autor);
    }
  }
  
  class BuscaPorGenero extends BuscaStrategy {
    buscar(livros, genero) {
      return livros.filter(livro => livro.genero === genero);
    }
  }
  
  class BuscaPorAnoPublicacao extends BuscaStrategy {
    buscar(livros, anoPublicacao) {
      return livros.filter(livro => livro.anoPublicacao === anoPublicacao);
    }
  }
  
  // Classe abstrata Usuario
  class Usuario {
    constructor(cpf, nome, credenciais) {
      if (this.constructor === Usuario) {
        throw new Error('Classe abstrata não pode ser instanciada');
      }
      this.cpf = cpf;
      this.nome = nome;
      this.credenciais = credenciais;
    }
  }
  
  // Subclasse Cliente
  class Cliente extends Usuario {
    constructor(cpf, nome, credenciais) {
      super(cpf, nome, credenciais);
      this.historicoEmprestimos = [];
    }
  
    alugarLivro(livroid) {
      let emprestimo = Acervo.getInstance().alugarLivro(this,livroid);
      if (emprestimo) {
        this.historicoEmprestimos.push(emprestimo);
      }
      console.log(emprestimo)
      return emprestimo;
    }
  
    devolverLivro(id) {
      Acervo.getInstance().devolverLivro(this,id);
    }
  
    encontrarLivroPorCaracteristica(criterio, strategy) {
        let livros = Acervo.getInstance().visualizarLivros();
        return strategy.buscar(livros, criterio);
      }
    
  
    visualizarLivrosAlugados() {
      return this.historicoEmprestimos;
    }
  
    verificarStatus() {
      // Implementar lógica para verificar o status do cliente
    }
  }
  
  // Subclasse Bibliotecario
  class Bibliotecario extends Usuario {
    cadastrarUsuario(cpf, nome, credenciais) {
      return ClienteFactory.criarUsuario(cpf, nome, credenciais)
    }
  }
  // Classe base UserFactory
  class UserFactory {
    static criarUsuario(cpf, nome, credenciais) {
        throw new Error('Método criarUsuario deve ser implementado pelas subclasses');
    }
}
  // Factory específica para Cliente
class ClienteFactory extends UserFactory {
    static criarUsuario(cpf, nome, credenciais) {
        return new Cliente(cpf, nome, credenciais);
    }
}

// Factory específica para Bibliotecario
class BibliotecarioFactory extends UserFactory {
    static criarUsuario(cpf, nome, credenciais) {
        return new Bibliotecario(cpf, nome, credenciais);
    }
}

  
  // Strategy para diferentes métodos de autenticação
  class AutenticacaoStrategy {
    autenticar(credenciais, usuarios) {
      throw new Error('Este método deve ser sobrescrito');
    }
  }
  
  class AutenticacaoSimples extends AutenticacaoStrategy {
    autenticar(credenciais, usuarios) {
      return usuarios.find(usuario => 
        usuario.credenciais.usuario === credenciais.usuario && 
        usuario.credenciais.senha === credenciais.senha
      );
    }
  }
  
  
  // Classes para representar os livros e tipos de livros
  class TipoLivro {
    constructor(titulo, autor, genero, anoPublicacao) {
      this.titulo = titulo;
      this.autor = autor;
      this.genero = genero;
      this.anoPublicacao = anoPublicacao;
      this.livros = [];
    }
  
    adicionar(livro) {
      this.livros.push(livro);
    }
  
    removerPorId(idLivro) {
      let livroRemovido = null;
      this.livros = this.livros.filter(livro => {
        if (livro.id === idLivro) {
          livroRemovido = livro;
          return false;
        }
        return true;
      });
      return livroRemovido;
    }
  
    visualizar() {
      return this.livros;
    }
  }
  
  class Livro {
    static contadorId = 0;
  
    constructor() {
      this.id = ++Livro.contadorId;
      this.disponivel = true;
    }
  }
  
  class Credenciais {
    constructor(usuario, senha) {
      this.usuario = usuario;
      this.senha = senha;
    }
  }
  
  class Emprestimo {
    constructor(cpf, dataEmprestimo, dataDevolucao, livro) {
      this.cpf = cpf;
      this.dataEmprestimo = dataEmprestimo;
      this.dataDevolucao = dataDevolucao;
      this.livro = livro;
    }
  }
  module.exports = {
    Observable: Observable,
    Acervo: Acervo,
    BuscaStrategy: BuscaStrategy,
    BuscaPorTitulo: BuscaPorTitulo,
    BuscaPorAutor: BuscaPorAutor,
    BuscaPorGenero: BuscaPorGenero,
    BuscaPorAnoPublicacao: BuscaPorAnoPublicacao,
    Usuario: Usuario,
    Cliente: Cliente,
    Bibliotecario: Bibliotecario,
    ClienteFactory: ClienteFactory,
    BibliotecarioFactory: BibliotecarioFactory,
    AutenticacaoStrategy: AutenticacaoStrategy,
    AutenticacaoSimples: AutenticacaoSimples,
    TipoLivro: TipoLivro,
    Livro: Livro,
    Credenciais: Credenciais,
    Emprestimo: Emprestimo
};

  