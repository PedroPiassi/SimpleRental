export default class AutomovelClasseDados {
    nome;
    marca;
    ano;
    kmRodados;
    placa;
    valor;
    precoLocacao;
    alugado;

    constructor(nome, marca, ano, kmRodados, placa, valor, precoLocacao, alugado) {
        this.nome = nome;
        this.marca = marca;
        this.ano = ano;
        this.kmRodados = kmRodados;
        this.placa = placa;
        this.valor = valor;
        this.precoLocacao = precoLocacao;
        this.alugado = alugado;
    }
}