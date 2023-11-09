import { conexao } from '../database/Conexao.js';
import { Cliente } from '../database/Cliente.js';

export const findAll = async () => {
    await conexao.sync();
    return await Cliente.findAll();
};

export const findOneByCpf = async (CPF) => {
    await conexao.sync();
    return await Cliente.findOne({
        where: { CPF: CPF }
    });
};

export const findOneClienteById = async (id) => {
    await conexao.sync();
    return await Cliente.findOne({
        where: { id: id }
    });
};

export const create = async (cliente) => {
    await conexao.sync();
    return await Cliente.create(cliente);
};

export const update = async (id, novosValores) => {
    console.log(novosValores);
    await conexao.sync();
    const cliente = await Cliente.findByPk(id);

    if (!cliente) throw new Error('Cliente não encontrado');

    return await cliente.update(novosValores);
};

export const destroy = async (id) => {
    await conexao.sync();
    const cliente = await Cliente.findByPk(id);

    if (!cliente) throw new Error('Cliente não encontrado');

    return await cliente.destroy();
};