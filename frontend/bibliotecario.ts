import { Usuario } from './usuario';
import { ClienteFactory } from './user-factory';

export class Bibliotecario extends Usuario {
    cadastrarUsuario(cpf: string, nome: string, credenciais: { usuario: string, senha: string }) {
        return ClienteFactory.criarUsuario(cpf, nome, credenciais);
    }
}
