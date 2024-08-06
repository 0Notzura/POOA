export abstract class Usuario {
  cpf: string;
  nome: string;
  credenciais: { usuario: string, senha: string };

  constructor(cpf: string, nome: string, credenciais: { usuario: string, senha: string }) {
      if (new.target === Usuario) {
          throw new Error('Classe abstrata não pode ser instanciada');
      }
      this.cpf = cpf;
      this.nome = nome;
      this.credenciais = credenciais;
  }
}
