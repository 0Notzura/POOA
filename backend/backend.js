const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const DATA_FILE = './acervo.json';

app.use(express.json());

function lerAcervo() {
    if (fs.existsSync(DATA_FILE)) {
        const dados = fs.readFileSync(DATA_FILE);
        return JSON.parse(dados);
    }
    return { tipoLivros: [] };
}

function salvarAcervo(acervo) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(acervo, null, 2));
}

app.get('/acervo', (req, res) => {
    const acervo = lerAcervo();
    res.json(acervo);
});

app.post('/acervo/livro', (req, res) => {
    const { usuario, tipoLivro, livro } = req.body;
    const acervo = lerAcervo();

    let tipoExistente = acervo.tipoLivros.find(t =>
        t.titulo === tipoLivro.titulo &&
        t.autor === tipoLivro.autor &&
        t.genero === tipoLivro.genero &&
        t.anoPublicacao === tipoLivro.anoPublicacao
    );

    if (tipoExistente) {
        tipoExistente.livros.push(livro);
    } else {
        tipoLivro.livros = [livro];
        acervo.tipoLivros.push(tipoLivro);
    }

    salvarAcervo(acervo);
    res.json({ mensagem: `Livro ${livro.id} foi adicionado ao tipo ${tipoLivro.titulo}` });
});

app.delete('/acervo/livro/:id', (req, res) => {
    const { id } = req.params;
    const acervo = lerAcervo();

    let livroRemovido = null;
    for (let tipoLivro of acervo.tipoLivros) {
        const index = tipoLivro.livros.findIndex(l => l.id === parseInt(id));
        if (index !== -1) {
            livroRemovido = tipoLivro.livros.splice(index, 1)[0];
            break;
        }
    }

    if (livroRemovido) {
        salvarAcervo(acervo);
        res.json({ mensagem: `Livro ${id} foi removido` });
    } else {
        res.status(404).json({ mensagem: `Livro com ID ${id} não encontrado.` });
    }
    app.post('/acervo/emprestimo', (req, res) => {
        const { cpf, livroId } = req.body;
        const acervo = lerAcervo();
    
        let livroAlugado = null;
        for (let tipoLivro of acervo.tipoLivros) {
            let livro = tipoLivro.livros.find(l => l.id === livroId && l.disponivel);
            if (livro) {
                livro.disponivel = false;
                livroAlugado = {
                    cpf: cpf,
                    dataEmprestimo: new Date(),
                    dataDevolucao: '',
                    livro: livro
                };
                break;
            }
        }
    
        if (livroAlugado) {
            salvarAcervo(acervo);
            res.json({ emprestimo: livroAlugado });
        } else {
            res.status(404).json({ mensagem: `Livro ${livroId} não está disponível.` });
        }
    });
    
    app.post('/acervo/devolucao', (req, res) => {
        const { cpf, livroId } = req.body;
        const acervo = lerAcervo();
    
        let livroDevolvido = null;
        for (let tipoLivro of acervo.tipoLivros) {
            let livro = tipoLivro.livros.find(l => l.id === livroId);
            if (livro) {
                livro.disponivel = true;
                livroDevolvido = livro;
                break;
            }
        }
    
        if (livroDevolvido) {
            salvarAcervo(acervo);
            res.json({ mensagem: `Livro ${livroId} foi devolvido` });
        } else {
            res.status(404).json({ mensagem: `Livro com ID ${livroId} não encontrado.` });
        }
    });
    
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
