import { findAll, create, findOneByCpf, findOneClienteById, update, destroy } from "../models/ClienteModal.js";
import { findAllAutomovel } from "../models/AutomovelModel.js";

export const findAllCliente = async (_req, resp) => {
    const clientes = await findAll();

    if (Object.keys(clientes).length === 0) {
        return resp.status(404).json({
            status: 404,
            message: "Nenhum cliente encontrado!",
            data: clientes,
        });
    } else {
        return resp.status(200).json({
            status: 200,
            message: "Clientes encontrados!",
            data: clientes,
        });
    };
};

export const findOneByCpfCliente = async (req, resp) => {
    const { CPF } = req.params;
    const cliente = await findOneByCpf(CPF);

    if (!cliente) {
        return resp.status(404).json({
            status: 404,
            message: "Cliente não existe!",
            data: cliente,
        });
    } else {
        return resp.status(200).json({
            status: 200,
            message: "Cliente encontrado!",
            data: cliente,
        });
    }
};

export const findOneByIdCliente = async (req, resp) => {
    const { id } = req.params;
    const cliente = await findOneClienteById(id);

    if (!cliente) {
        return resp.status(404).json({
            status: 404,
            message: "Cliente não existe!",
            data: cliente,
        });
    } else {
        return resp.status(200).json({
            status: 200,
            message: "Cliente encontrado!",
            data: cliente,
        });
    }
};

export const createCliente = async (req, resp) => {
    const cliente = await findOneByCpf(req.body.CPF);

    if (cliente) {
        return resp.status(400).json({
            status: 400,
            message: "Cliente já existe!",
            data: cliente,
        });
    };

    const clienteNovo = await create(req.body);
    return resp.status(201).json({
        status: 201,
        message: "Cliente criado com sucesso!",
        data: clienteNovo,
    });
};

export const updateCliente = async (req, resp) => {
    const cliente = await findOneByCpf(req.body.CPF);

    if (!cliente) {
        return resp.status(400).json({
            status: 400,
            message: "Cliente não cadastrado!",
            data: cliente,
        });
    };

    const { id } = req.params;
    delete req.body.CPF;
    const clienteEditado = await update(id, req.body);

    if (!clienteEditado) {
        return resp.status(404).json({
            status: 404,
            message: "Cliente não cadastrado!",
            data: {},
        });
    }

    return resp.status(200).json({
        status: 200,
        message: "Cliente atualizado com sucesso!",
        data: clienteEditado,
    });
};

export const destroyCliente = async (req, resp) => {
    const { id } = req.params;

    const automoveis = await findAllAutomovel();

    const respAuto = automoveis.filter((auto) => {
        return auto.idCliente == id;
    });

    if (respAuto.length > 0) {
        return resp.status(400).json({
            status: 400,
            message: "Cliente não pode ser deletado pois tem automóveis alugados!",
            data: {},
        });
    }

    const clienteDeletado = await destroy(id);

    if (!clienteDeletado) {
        return resp.status(404).json({
            status: 404,
            message: "Cliente não encontrado!",
            data: {},
        });
    }

    return resp.status(200).json({
        status: 200,
        message: "Cliente deletado com sucesso!",
        data: clienteDeletado,
    });
};