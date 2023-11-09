import { findAllAutomovel, create, findOneByPlate, findOneAutoById, update, destroy } from "../models/AutomovelModel.js";
import { findOneClienteById } from "../models/ClienteModal.js";

export const findAllAuto = async (_req, resp) => {
    const automoveis = await findAllAutomovel();

    if (Object.keys(automoveis).length === 0) {
        return resp.status(404).json({
            status: 404,
            message: "Nenhum automovel encontrado!",
            data: automoveis,
        });
    } else {
        return resp.status(200).json({
            status: 200,
            message: "Automoveis encontrados!",
            data: automoveis,
        });
    };
};

export const findOneByPlateAuto = async (req, resp) => {
    const { placa } = req.params;
    const automovel = await findOneByPlate(placa);

    if (!automovel) {
        return resp.status(404).json({
            status: 404,
            message: "Automovel não econtrando!",
            data: automovel,
        });
    } else {
        return resp.status(200).json({
            status: 200,
            message: "Automovel encontrado!",
            data: automovel,
        });
    }
};

export const findOneByIdAuto = async (req, resp) => {
    const { id } = req.params;
    const automovel = await findOneAutoById(id);

    if (!automovel) {
        return resp.status(404).json({
            status: 404,
            message: "Automovel não econtrando!",
            data: automovel,
        });
    } else {
        return resp.status(200).json({
            status: 200,
            message: "Automovel encontrado!",
            data: automovel,
        });
    }
};

export const createAuto = async (req, resp) => {
    const automovel = await findOneByPlate(req.body.placa);

    if (automovel) {
        return resp.status(400).json({
            status: 400,
            message: "Automovel já cadastrado!",
            data: automovel,
        });
    };

    const automovelNovo = await create(req.body);
    return resp.status(201).json({
        status: 201,
        message: "Automovel criado com sucesso!",
        data: automovelNovo,
    });
};

export const updateAuto = async (req, resp) => {
    const automovel = await findOneByPlate(req.body.placa);

    if (!automovel) {
        return resp.status(400).json({
            status: 400,
            message: "Placa não econtranda!",
            data: automovel,
        });
    };

    const { id } = req.params;
    delete req.body.placa;
    const automovelEditado = await update(id, req.body);

    if (!automovelEditado) {
        return resp.status(404).json({
            status: 404,
            message: "Automovel não econtrando!",
            data: {},
        });
    }

    return resp.status(200).json({
        status: 200,
        message: "Automovel atualizado com sucesso!",
        data: automovelEditado,
    });
};

export const destroyAuto = async (req, resp) => {
    const { id } = req.params;

    const automovel = await findOneAutoById(id);
    if (!automovel) {
        return resp.status(404).json({
            status: 404,
            message: "Automovel não encontrado!",
            data: {},
        });
    } else {
        if (automovel.alugado == true) {
            return resp.status(404).json({
                status: 404,
                message: "Automovel não pode ser excluido pois está alugado!",
                data: {},
            });
        } else {
            const automovelDeletado = await destroy(id);

            if (!automovelDeletado) {
                return resp.status(404).json({
                    status: 404,
                    message: "Automovel não encontrado!",
                    data: {},
                });
            }

            return resp.status(200).json({
                status: 200,
                message: "Automovel deletado com sucesso!",
                data: automovelDeletado,
            });
        }
    }
};

export const alugar = async (req, resp) => {
    const { automovelId, clienteId } = req.body;
    const automovel = await findOneAutoById(automovelId);
    const cliente = await findOneClienteById(clienteId);

    if (!automovel) {
        return resp.status(404).json({
            status: 404,
            message: "Automóvel não econtrando!",
            data: automovel,
        });
    }

    if (!cliente) {
        return resp.status(404).json({
            status: 404,
            message: "Cliente não econtrando!",
            data: cliente,
        });
    }

    if (automovel.alugado) {
        return resp.status(400).json({
            status: 400,
            message: "Automóvel já está alugado!",
            data: automovel,
        });
    }

    const autoClone = { ...automovel }

    autoClone.alugado = true;
    autoClone.idCliente = clienteId;

    const automovelAtualizado = await update(automovelId, autoClone);

    return resp.status(200).json({
        status: 200,
        message: "Automóvel alugado com sucesso!",
        data: automovelAtualizado,
    });
};

export const desalugar = async (req, resp) => {
    const { automovelId } = req.body;
    const automovel = await findOneAutoById(automovelId);

    if (!automovel) {
        return resp.status(404).json({
            status: 404,
            message: "Automóvel não econtrando!",
            data: automovel,
        });
    }

    if (!automovel.alugado) {
        return resp.status(400).json({
            status: 400,
            message: "Automóvel não está alugado!",
            data: automovel,
        });
    }

    const autoClone = { ...automovel }

    autoClone.alugado = false;
    autoClone.idCliente = null;

    const automovelAtualizado = await update(automovelId, autoClone);

    return resp.status(200).json({
        status: 200,
        message: "Automóvel devolvido com sucesso!",
        data: automovelAtualizado,
    });
};