import { conexao } from '../database/Conexao.js';
import { Automovel } from '../database/Automovel.js';

export const findAllAutomovel = async () => {
    await conexao.sync();
    return await Automovel.findAll();
};

export const findOneAutoById = async (id) => {
    await conexao.sync();
    return await Automovel.findOne({
        where: { id: id }
    });
};

export const findOneByPlate = async (placa) => {
    await conexao.sync();
    return await Automovel.findOne({
        where: { placa: placa }
    });
};

export const create = async (automovel) => {
    await conexao.sync();
    return await Automovel.create(automovel);
};

export const update = async (id, novosValores) => {
    await conexao.sync();
    const automovel = await Automovel.findByPk(id);

    if (!automovel) throw new Error('Automóvel não encontrado');

    return await automovel.update(novosValores);
};

export const destroy = async (id) => {
    await conexao.sync();
    const automovel = await Automovel.findByPk(id);

    if (!automovel) throw new Error('Automóvel não encontrado');

    return await automovel.destroy();
};