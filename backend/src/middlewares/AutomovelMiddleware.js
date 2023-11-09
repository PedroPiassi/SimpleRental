import AutomovelClasseDados from "../models/AutomovelClasseDados.js";

export const validacaoCadastroAuto = (req, resp, next) => {
    const { nome, marca, ano, kmRodados, placa, valor, precoLocacao } = req.body;

    if (Object.keys(req.body).length === 0) {
        return resp.status(400).json({
            status: 400,
            message: "Requisição vázia!",
            data: req.body,
        });
    }

    if (!nome || nome.trim() === "") {
        return resp.status(400).json({
            status: 400,
            message: "Nome vazio ou nulo!",
            data: req.body,
        });
    }

    if (!marca || marca.trim() === "") {
        return resp.status(400).json({
            status: 400,
            message: "Marca vázia ou nulla!",
            data: req.body,
        });
    }

    if (!ano) {
        return resp.status(400).json({
            status: 400,
            message: "Ano inválido!",
            data: req.body,
        });
    } else if (parseInt(ano) > new Date().getFullYear()) {
        return resp.status(400).json({
            status: 400,
            message: "Ano não pode ser maior que o ano atual!",
            data: req.body,
        });
    } else if (isNaN(ano)) {
        return resp.status(400).json({
            status: 400,
            message: "Ano precisa ser um número inteiro!",
            data: req.body,
        });
    }

    if (!kmRodados) {
        return resp.status(400).json({
            status: 400,
            message: "KM rodados inválido!",
            data: req.body,
        });
    } else if (parseFloat(kmRodados) < 0) {
        return resp.status(400).json({
            status: 400,
            message: "KM rodados não pode ser menor que 0!",
            data: req.body,
        });
    } else if (isNaN(kmRodados)) {
        return resp.status(400).json({
            status: 400,
            message: "KM rodados precisa ser um número inteiro!",
            data: req.body,
        });
    }

    if (!placa) {
        return resp.status(400).json({
            status: 400,
            message: "Placa inválida!",
            data: req.body,
        });
    }

    if (!valor) {
        return resp.status(400).json({
            status: 400,
            message: "Valor inválido!",
            data: req.body,
        });
    } else if (parseFloat(valor) < 0) {
        return resp.status(400).json({
            status: 400,
            message: "Valor não pode ser menor que 0!",
            data: req.body,
        });
    } else if (isNaN(valor)) {
        return resp.status(400).json({
            status: 400,
            message: "Valor precisa ser um número!",
            data: req.body,
        });
    }

    if (!precoLocacao) {
        return resp.status(400).json({
            status: 400,
            message: "Preço de locação inválido!",
            data: req.body,
        });
    } else if (parseFloat(precoLocacao) < 0) {
        return resp.status(400).json({
            status: 400,
            message: "Preço de locação não pode ser menor que 0!",
            data: req.body,
        });
    } else if (isNaN(precoLocacao)) {
        return resp.status(400).json({
            status: 400,
            message: "Preço de locação precisa ser um número!",
            data: req.body,
        });
    }

    req.body = new AutomovelClasseDados(
        nome, marca, ano, kmRodados, placa, valor, precoLocacao, false
    );

    next();
};

export const validacaoEdicaoAuto = (req, resp, next) => {
    const { nome, marca, ano, kmRodados, placa, valor, precoLocacao, alugado } = req.body;

    if (Object.keys(req.body).length === 0) {
        return resp.status(400).json({
            status: 400,
            message: "Requisição vázia!",
            data: req.body,
        });
    }

    if (!nome || nome.trim() === "") {
        return resp.status(400).json({
            status: 400,
            message: "Nome vazio ou nulo!",
            data: req.body,
        });
    }

    if (!marca || marca.trim() === "") {
        return resp.status(400).json({
            status: 400,
            message: "Marca vázia ou nulla!",
            data: req.body,
        });
    }

    if (!ano) {
        return resp.status(400).json({
            status: 400,
            message: "Ano inválido!",
            data: req.body,
        });
    } else if (parseInt(ano) > new Date().getFullYear()) {
        return resp.status(400).json({
            status: 400,
            message: "Ano não pode ser maior que o ano atual!",
            data: req.body,
        });
    } else if (isNaN(ano)) {
        return resp.status(400).json({
            status: 400,
            message: "Ano precisa ser um número inteiro!",
            data: req.body,
        });
    }

    if (!kmRodados) {
        return resp.status(400).json({
            status: 400,
            message: "KM rodados inválido!",
            data: req.body,
        });
    } else if (parseFloat(kmRodados) < 0) {
        return resp.status(400).json({
            status: 400,
            message: "KM rodados não pode ser menor que 0!",
            data: req.body,
        });
    } else if (isNaN(kmRodados)) {
        return resp.status(400).json({
            status: 400,
            message: "KM rodados precisa ser um número inteiro!",
            data: req.body,
        });
    }

    if (!valor) {
        return resp.status(400).json({
            status: 400,
            message: "Valor inválido!",
            data: req.body,
        });
    } else if (parseFloat(valor) < 0) {
        return resp.status(400).json({
            status: 400,
            message: "Valor não pode ser menor que 0!",
            data: req.body,
        });
    } else if (isNaN(valor)) {
        return resp.status(400).json({
            status: 400,
            message: "Valor precisa ser um número!",
            data: req.body,
        });
    }

    if (!precoLocacao) {
        return resp.status(400).json({
            status: 400,
            message: "Preço de locação inválido!",
            data: req.body,
        });
    } else if (parseFloat(precoLocacao) < 0) {
        return resp.status(400).json({
            status: 400,
            message: "Preço de locação não pode ser menor que 0!",
            data: req.body,
        });
    } else if (isNaN(precoLocacao)) {
        return resp.status(400).json({
            status: 400,
            message: "Preço de locação precisa ser um número!",
            data: req.body,
        });
    }

    next();
};

export const validacaoAluguel = (req, resp, next) => {
    const { automovelId, clienteId } = req.body;

    if (Object.keys(req.body).length === 0) {
        return resp.status(400).json({
            status: 400,
            message: "Requisição vázia!",
            data: req.body,
        });
    }

    if (!automovelId) {
        return resp.status(400).json({
            status: 400,
            message: "Automovel inválido!",
            data: req.body,
        });
    } else if (isNaN(automovelId)) {
        return resp.status(400).json({
            status: 400,
            message: "Id do automovel precisa ser um número inteiro!",
            data: req.body,
        });
    }

    if (!clienteId) {
        return resp.status(400).json({
            status: 400,
            message: "Cliente inválido!",
            data: req.body,
        });
    } else if (isNaN(clienteId)) {
        return resp.status(400).json({
            status: 400,
            message: "Id do cliente precisa ser um número inteiro!",
            data: req.body,
        });
    }

    next();
}

export const validacaoDesalugar = (req, resp, next) => {
    const { automovelId } = req.body;

    if (Object.keys(req.body).length === 0) {
        return resp.status(400).json({
            status: 400,
            message: "Requisição vázia!",
            data: req.body,
        });
    }

    if (!automovelId) {
        return resp.status(400).json({
            status: 400,
            message: "Automovel inválido!",
            data: req.body,
        });
    } else if (isNaN(automovelId)) {
        return resp.status(400).json({
            status: 400,
            message: "Id do automovel precisa ser um número inteiro!",
            data: req.body,
        });
    }
    next();
}