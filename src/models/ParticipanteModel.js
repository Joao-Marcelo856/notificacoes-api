// src/models/ParticipanteModel.js
// Dados iniciais (seed)
let participantes = [
    { id: 1, nome: "Ana Silva", email: "ana@email.com" },
    { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
    { id: 3, nome: "Maria Santos", email: "maria@email.com" },
];
let proximoId = 4;
// 👇 Implemente as funções abaixo seguindo o padrão do EventoModel
function listarTodos() {
    // Retorna a lista completa de participantes
    return participantes;
}

function buscarPorId(id) {
    // Retorna o participante que tiver o ID igual ao informado
    return participantes.find(participante => participante.id === id);
}

function criar(dados) {
    const novoParticipante = {
        id: proximoId,
        // Complete com os atributos necessários
        nome: dados.nome,
        email: dados.email,
    };
    proximoId++;
    participantes.push(novoParticipante);
    return novoParticipante;
}

function atualizar(id, dados) {
    const index = participantes.findIndex((p) => p.id === id);
    // Se não encontrar, retorne null
    // Se encontrar, atualize e retorne o participante atualizado
    // Use o spread operator como fizemos no EventoModel
    if (index === -1) return null;
    participantes[index] = {
        ...participantes[index], // mantém os dados antigos
        ...dados, // sobrescreve com os novos
        id: id, // garante que o ID não muda
    };
    return participantes[index];

}
function deletar(id) {
    // Encontre o index, se não existir retorne false
    // Se existir, remova com splice e retorne true
    const index = participantes.findIndex((p) => p.id === id);
    if (index === -1) return false;
    participantes.splice(index, 1);
    return true;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};