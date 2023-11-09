import { Router } from 'express';
import { findAllAuto, createAuto, findOneByPlateAuto, updateAuto, destroyAuto, findOneByIdAuto, alugar, desalugar } from './controllers/AutomovelController.js';
import { findAllCliente, createCliente, findOneByCpfCliente, findOneByIdCliente, updateCliente, destroyCliente } from './controllers/ClienteController.js';
import { validacaoCadastroAuto, validacaoEdicaoAuto, validacaoAluguel, validacaoDesalugar } from './middlewares/AutomovelMiddleware.js';
import { validacaoCadastroCliente, validacaoEdicaoCliente } from './middlewares/ClienteMiddleware.js';

const router = Router();

router.get('/automovel', findAllAuto);
router.get('/automovel/:placa', findOneByPlateAuto);
router.get('/automovel/findById/:id', findOneByIdAuto);
router.post('/automovel/cadastrar', validacaoCadastroAuto, createAuto);
router.put('/automovel/:id', validacaoEdicaoAuto, updateAuto);
router.delete('/automovel/:id', destroyAuto);

router.post('/automovel/aluguel', validacaoAluguel, alugar);
router.post('/automovel/desalugar', validacaoDesalugar, desalugar);

router.get('/cliente', findAllCliente);
router.get('/cliente/:CPF', findOneByCpfCliente);
router.get('/cliente/findById/:id', findOneByIdCliente);
router.post('/cliente/cadastrar', validacaoCadastroCliente, createCliente);
router.put('/cliente/:id', validacaoEdicaoCliente, updateCliente);
router.delete('/cliente/:id', destroyCliente);

export { router };