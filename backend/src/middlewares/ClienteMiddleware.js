import validator from 'email-validator';

export const validacaoCadastroCliente = (req, resp, next) => {
  const { nome, email, telefone, CPF } = req.body;

  if (Object.keys(req.body).length === 0) {
    return resp.status(400).json({
      status: 400,
      message: 'Requisição vázia!',
      data: req.body,
    });
  }

  if (!nome || nome.trim() === '') {
    return resp.status(400).json({
      status: 400,
      message: 'Nome vazio ou nulo!',
      data: req.body,
    });
  }

  if (!email || email.trim() === '') {
    return resp.status(400).json({
      status: 400,
      message: 'E-mail vazio ou nulo!',
      data: req.body,
    });
  } else if (!validator.validate(email)) {
    return resp.status(400).json({
      status: 400,
      message: 'E-mail inválido!',
      data: req.body,
    });
  }

  if (!telefone || telefone.trim() === '') {
    return resp.status(400).json({
      status: 400,
      message: 'Telefone vazio ou nulo!',
      data: req.body,
    });
  } else if (!/^\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}$/.test(telefone)) {
    return resp.status(400).json({
      status: 400,
      message: 'Telefone inválido, formato esperado: +55 (00) 00000-0000!',
      data: req.body,
    });
  }

  if (!CPF || CPF.trim() === '') {
    return resp.status(400).json({
      status: 400,
      message: 'CPF vazio ou nulo!',
      data: req.body,
    });
  } else if (CPF.length !== 14) {
    return resp.status(400).json({
      status: 400,
      message: 'CPF inválido, precisa ter 14 caracteres!',
      data: req.body,
    });
  }

  next();
};

export const validacaoEdicaoCliente = (req, resp, next) => {
  const { nome, email, telefone } = req.body;

  if (Object.keys(req.body).length === 0) {
    return resp.status(400).json({
      status: 400,
      message: 'Requisição vázia!',
      data: req.body,
    });
  }

  if (!nome || nome.trim() === '') {
    return resp.status(400).json({
      status: 400,
      message: 'Nome vazio ou nulo!',
      data: req.body,
    });
  }

  if (!email || email.trim() === '') {
    return resp.status(400).json({
      status: 400,
      message: 'E-mail vazio ou nulo!',
      data: req.body,
    });
  } else if (!validator.validate(email)) {
    return resp.status(400).json({
      status: 400,
      message: 'E-mail inválido!',
      data: req.body,
    });
  }

  if (!telefone || telefone.trim() === '') {
    return resp.status(400).json({
      status: 400,
      message: 'Telefone vazio ou nulo!',
      data: req.body,
    });
  } else if (!/^\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}$/.test(telefone)) {
    return resp.status(400).json({
      status: 400,
      message: 'Telefone inválido, formato esperado: +55 (00) 00000-0000!',
      data: req.body,
    });
  }
  next();
};