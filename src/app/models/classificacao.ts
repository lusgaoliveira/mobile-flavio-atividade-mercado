export default interface Classificacao {
    id_classificacao: number;
    id_produto: number;
    id_cliente: number;
    nota: number;
    comentario: string;
    data_classificacao: Date;
}