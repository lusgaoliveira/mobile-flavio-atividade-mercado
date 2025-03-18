"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Produto from "../../models/produto";
import Link from "next/link"; // Importe o componente Link

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/produto");
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos!");
        }
        const data = await response.json();
        setProdutos(data.produtos);
      } catch (error) {
        setError("Erro ao carregar produtos!");
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Produtos</h1>
      {/* Botão para cadastrar produto */}
      <Link href="/produto/cadastrarProduto">
        <button className={styles.cadastrarButton}>Cadastrar Produto</button>
      </Link>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Produto</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Quantidade em Estoque</th>
              <th>ID Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id_produto}>
                <td>{produto.id_produto}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>R${produto.preco}</td>
                <td>{produto.quantidade_estoque}</td>
                <td>{produto.id_fornecedor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProdutosPage;