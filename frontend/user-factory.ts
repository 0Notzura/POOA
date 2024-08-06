import { Cliente } from './Ccliente';
import { Bibliotecario } from './bibliotecario';

export abstract class UserFactory {
    static criarUsuario(cpf: string, nome: string, credenciais: { usuario: string, senha: string }) {
        throw new Error('Método criarUsuario deve ser implementado pelas subclasses');
    }
}

export class ClienteFactory extends UserFactory {
    static criarUsuario(cpf: string, nome: string, credenciais: { usuario: string, senha: string }) {
        return new Cliente(cpf, nome, credenciais);
    }
}

export class BibliotecarioFactory extends UserFactory {
    static criarUsuario(cpf: string, nome: string, credenciais: { usuario: string, senha: string }) {
        return new Bibliotecario(cpf, nome, credenciais);
    }
}
