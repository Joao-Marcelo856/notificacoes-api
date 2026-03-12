// src/controllers/EventoController.js
const EventoModel = require("../models/EventoModel");

function index(req, res) {
    const eventos = EventoModel.listarTodos();
    res.json(eventos);
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const evento = EventoModel.buscarPorId(id);
    if (!evento) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }
    res.json(evento);
}

function store(req, res) {
    const { nome, descricao, data, local, capacidade } = req.body;

    // 1. Nome não pode ser vazio (só espaços)
    if (!nome || nome.trim() === "") {
        // Correção: Retornar o status 400 usando o 'res' do Express
        return res.status(400).json({ erro: "O campo nome é obrigatório e não pode estar vazio." });
    }
    
    // Validação de data
    if (!data) {
        return res.status(400).json({ erro: "O campo data é obrigatório." });
    }

    // 2. Capacidade deve ser um número positivo (se informada)
    // Correção: Verifica se foi informada e se é menor ou igual a zero
    if (capacidade !== undefined && capacidade <= 0) {
        return res.status(400).json({ erro: "A capacidade deve ser um número positivo maior que zero." });
    }

    const novoEvento = EventoModel.criar({
        nome,
        descricao,
        data,
        local,
        capacidade,
    });
    res.status(201).json(novoEvento);
}

function update(req, res) {
    const id = parseInt(req.params.id);
    const eventoAtualizado = EventoModel.atualizar(id, req.body);
    if (!eventoAtualizado) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }
    res.json(eventoAtualizado);
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const deletado = EventoModel.deletar(id);
    if (!deletado) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }
    res.status(204).send();
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};