export abstract class AutenticacaoStrategy {
  abstract autenticar(credenciais: { usuario: string, senha: string }, usuarios: any[]): any;
}

export class AutenticacaoSimples extends AutenticacaoStrategy {
  autenticar(credenciais: { usuario: string, senha: string }, usuarios: any[]) {
      return usuarios.find(usuario =>
          usuario.credenciais.usuario === credenciais.usuario &&
          usuario.credenciais.senha === credenciais.senha
      );
  }
}
