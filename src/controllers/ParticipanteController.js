// src/controllers/ParticipanteController.js
const ParticipanteModel = require("../models/ParticipanteModel");

function index(req, res) {
    const participantes = ParticipanteModel.listarTodos(); // Corrigido para plural
    res.json(participantes);
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const participante = ParticipanteModel.buscarPorId(id);
    if (!participante) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }
    res.json(participante);
}

function store(req, res) {
    const { nome, email } = req.body;

    // 1. Nome não pode ser vazio
    if (!nome || nome.trim() === "") {
        // Correção: Usar o 'res' do Express
        return res.status(400).json({ erro: "O campo nome é obrigatório e não pode estar vazio." });
    }

    // 2. Validação de e-mail (verificar se está ausente OU se é inválido)
    if (!email || !email.includes("@")) {
        // Correção: Lógica invertida. Se não tem '@', retorna erro.
        return res.status(400).json({ erro: "E-mail inválido. É obrigatório conter o símbolo '@'." });
    }

    // Cria o participante se passou por todas as validações
    const novoParticipante = ParticipanteModel.criar({
        nome,
        email,
    });
    res.status(201).json(novoParticipante);
}

function update(req, res) {
    const id = parseInt(req.params.id);
    const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);
    
    if (!participanteAtualizado) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }
    res.json(participanteAtualizado);
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const participanteDeletado = ParticipanteModel.deletar(id);
    
    if (!participanteDeletado) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }
    res.status(204).send();
}

module.exports = { index, show, store, update, destroy };